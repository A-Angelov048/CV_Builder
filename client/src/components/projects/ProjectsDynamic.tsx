import styles from "./Projects.module.css";
import { Link } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type FieldErrors, type SubmitHandler } from "react-hook-form";

import { useFormErrorSnackbar } from "../../hooks/useFormErrorSnackbar";
import { projectsSchema, type ProjectsValues } from "../../validation/formSchema";
import { ErrorSnackbar } from "../errorModal/ErrorSnackbar";
import type { Portfolio } from "../../context/portfolioContext";
import { useDeletePortfolioInfo, useUpdatePortfolio } from "../../hooks/usePortfolioResponse";

type ProjectsDynamicProps = {
  portfolio: Portfolio;
  flagForm: boolean;
  viewType: {
    isOwner: boolean;
    canView: boolean;
  };
  changeStatus: (value: boolean) => void;
};

export default function ProjectsDynamic({
  portfolio,
  flagForm,
  viewType,
  changeStatus,
}: ProjectsDynamicProps) {
  const checkPortfolioProjects = portfolio.projects && portfolio.projects.length > 0;

  const { updatePortfolio } = useUpdatePortfolio("projects");
  const { deletePortfolioInfo } = useDeletePortfolioInfo();

  const { open, messages, close, handleErrors } = useFormErrorSnackbar();

  const { register, handleSubmit } = useForm<ProjectsValues>({
    resolver: zodResolver(projectsSchema),
  });

  const onSubmit: SubmitHandler<ProjectsValues> = async (data) => {
    if (!flagForm) {
      changeStatus(true);
    }

    try {
      await updatePortfolio(data);
    } catch (error: any) {
      changeStatus(false);
      handleErrors({ err: { message: error.response.data.message } });
    }
  };

  const onError = (formErrors: FieldErrors<ProjectsValues>) => {
    handleErrors(formErrors);
  };

  return (
    <>
      {flagForm && checkPortfolioProjects ? (
        <div className={styles["project-container"]}>
          <div className={styles["projects-grid"]}>
            {portfolio.projects?.map((curProject) => (
              <div key={curProject._id} className={styles["project-card"]}>
                <Link
                  to={curProject.urlProject}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles["project-link"]}
                >
                  <div className={styles["preview-wrapper"]}>
                    <img src={curProject.screenshotProject} alt={curProject.nameProject} />
                  </div>
                  <p className={styles["project-name"]}>{curProject.nameProject}</p>
                </Link>
                <Link
                  to={curProject.brief}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${styles["project-name"]} ${styles.brief}`}
                >
                  Brief documentation of the project
                </Link>
                {viewType.isOwner && (
                  <p
                    onClick={() => deletePortfolioInfo(curProject._id, "projects")}
                    className={`${styles["project-name"]} ${styles.remove}`}
                  >
                    Remove Project
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <>
          <form onSubmit={handleSubmit(onSubmit, onError)} className="grid-form max-width">
            <div className="form-group m-t">
              <label htmlFor="nameProject">Name of the project *</label>
              <input type="text" id="nameProject" {...register("nameProject")} />
            </div>
            <div className="form-group m-t">
              <label htmlFor="urlProject">URL of the project *</label>
              <input type="text" id="urlProject" {...register("urlProject")} />
            </div>
            <div className="form-group m-t">
              <label htmlFor="screenshotProject">Screenshot (by URL) of the project *</label>
              <input type="text" id="screenshotProject" {...register("screenshotProject")} />
            </div>
            <div className="form-group m-t">
              <label htmlFor="brief">URL of brief project documentation</label>
              <input type="text" id="brief" {...register("brief")} />
            </div>
            <button className="main-button m-t" type="submit">
              Submit
            </button>
          </form>
          <ErrorSnackbar open={open} messages={messages} onClose={close} />
        </>
      )}
    </>
  );
}
