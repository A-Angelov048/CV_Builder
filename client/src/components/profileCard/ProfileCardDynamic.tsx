import styles from "./ProfileCard.module.css";

import { useForm, type FieldErrors, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  profileCardSchema,
  type ProfileCardValues,
} from "../../validation/formSchema";

import useHandleForm from "../../hooks/useHandleForm";
import { useFormErrorSnackbar } from "../../hooks/useFormErrorSnackbar";
import { useCreatePortfolio } from "../../hooks/usePortfolioResponse";

import { ErrorSnackbar } from "../errorModal/ErrorSnackbar";

import type { Portfolio } from "../../context/portfolioContext";

export default function ProfileCardDynamic({
  portfolio,
  viewType,
}: {
  portfolio: Portfolio;
  viewType: {
    isUser: boolean;
    isOwner: boolean;
    canView: boolean;
  };
}) {
  const { createPortfolio } = useCreatePortfolio();

  const { open, messages, close, handleErrors, handleCustomError } =
    useFormErrorSnackbar();

  const { flagForm, changeState } = useHandleForm(true);
  const { register, handleSubmit } = useForm<ProfileCardValues>({
    resolver: zodResolver(profileCardSchema),
  });

  const onSubmit: SubmitHandler<ProfileCardValues> = async (data) => {
    if (!flagForm) {
      changeState(true);
    }

    try {
      await createPortfolio(data);
    } catch (error: any) {
      changeState(false);
      if (error.message === "Failed to fetch") {
        handleCustomError("Image upload failed, try again later");
      } else if (error.response.status !== 200) {
        handleErrors({ err: { message: error.response.data.message } });
      } else {
        handleErrors({ err: { message: error.message } });
      }
    }
  };

  const onError = (formErrors: FieldErrors<ProfileCardValues>) => {
    handleErrors(formErrors);
  };

  return (
    <div className={styles["profile-card"]}>
      {flagForm && portfolio.owner !== "" ? (
        <>
          <div className={styles["profile-left"]}>
            <img
              src={
                portfolio.about.imageProfile.image &&
                portfolio.about.imageProfile.image !== ""
                  ? portfolio.about.imageProfile.image
                  : "image_600_600.jpg"
              }
              alt="Profile Picture"
            />
          </div>

          <div className={styles["profile-right"]}>
            <h2>{portfolio.about.name}</h2>
            <p className={styles.career}>{portfolio.about.career}</p>

            <div className={styles["profile-info"]}>
              <strong>Phone:</strong>
              <p>{portfolio.about.phone}</p>
            </div>
            <div className={styles["profile-info"]}>
              <strong>Email:</strong>
              <p>{portfolio.about.email}</p>
            </div>
            <div className={styles["profile-info"]}>
              <strong>Address:</strong>
              <p>{portfolio.about.address}</p>
            </div>
            <div className={styles["profile-info"]}>
              <strong>Date of Birth:</strong>
              <p>{portfolio.about.date}</p>
            </div>

            {viewType.isOwner && (
              <button
                onClick={() => changeState(false)}
                className={`${"main-button"} ${styles["edit-button"]}`}
              >
                Edit
              </button>
            )}
          </div>
        </>
      ) : (
        <>
          <form
            onSubmit={handleSubmit(onSubmit, onError)}
            className="grid-form"
          >
            <div className="form-group">
              <label htmlFor="name">Name *</label>
              <input type="text" id="name" {...register("name")} />
            </div>
            <div className="form-group">
              <label htmlFor="career">Career *</label>
              <input type="text" id="career" {...register("career")} />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone *</label>
              <input type="text" id="phone" {...register("phone")} />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email *</label>
              <input type="text" id="email" {...register("email")} />
            </div>
            <div className="form-group">
              <label htmlFor="address">Address *</label>
              <input type="text" id="address" {...register("address")} />
            </div>
            <div className="form-group">
              <label htmlFor="date">Date of Birth *</label>
              <input type="text" id="date" {...register("date")} />
            </div>
            <div className="form-group">
              <label htmlFor="image-profile">Profile Image *</label>
              <input
                type="file"
                accept="image/*"
                id="image-profile"
                {...register("imageProfile")}
              />
            </div>
            <div className="form-group">
              <label htmlFor="image-background">Background Image *</label>
              <input
                type="file"
                accept="image/*"
                id="image-background"
                {...register("imageBackground")}
              />
            </div>
            <button className="main-button" type="submit">
              Submit
            </button>
          </form>
          <ErrorSnackbar open={open} messages={messages} onClose={close} />
        </>
      )}
    </div>
  );
}
