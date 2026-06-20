import style from "../Profile.module.css";

import { useAxiosPrivate } from "../../../hooks/useAxiosPrivate";
import { useFormErrorSnackbar } from "../../../hooks/useFormErrorSnackbar";
import { useFormSuccessSnackbar } from "../../../hooks/useFormSuccessSnackbar";
import { usePortfolio } from "../../../hooks/usePortfolio";
import { useProfileToggle } from "../../../hooks/useProfileToggle";
import isPortfolioComplete from "../../../utils/validatePortfolioPublish";

import ErrorSnackbar from "../../errorModal/ErrorSnackbar";
import SuccessSnackbar from "../../successModal/SuccessSnackbar";

export default function PublishPortfolio() {
  const api = useAxiosPrivate();
  const { changePRFToggleState } = useProfileToggle();
  const { portfolio, changePortfolioState, changeLoadingState } = usePortfolio();
  const isComplete = isPortfolioComplete(portfolio);

  const { open, messages, close, handleCustomError } = useFormErrorSnackbar();

  const { openSuccess, messagesSuccess, closeSuccess, handleSuccess } = useFormSuccessSnackbar();

  const handlePublish = async (method: string) => {
    if (method === "publish" && !isComplete) {
      handleCustomError(
        "Your portfolio is incomplete. Please complete all sections before publishing."
      );
      return;
    }

    changeLoadingState(true);

    try {
      const response = await api.patch(`/portfolio/${method}`);
      changePortfolioState(response.data);

      handleSuccess(`The portfolio is successfully ${method}ed!`);
    } catch (error: any) {
      if (error.response.status === 403) {
        changePRFToggleState();
        console.error(`Error occurred while ${method}ing the portfolio try again later.`);
      } else {
        handleCustomError(`Error occurred while ${method}ing the portfolio try again later.`);
      }
    } finally {
      changeLoadingState(false);
    }
  };

  return (
    <section className={style["mono-section"]}>
      <div className={style["mono-section-header"]}>
        <h2 className={style["mono-section-title"]}>Publish Portfolio</h2>
      </div>

      {portfolio.isPublished ? (
        <div>
          <p className={style["mono-section-paragraph"]}>
            By clicking the unpublish button, your portfolio will be made invisible to other users.
          </p>
          <button
            className={style["mono-button-primary"]}
            onClick={() => handlePublish("unpublish")}
          >
            Unpublish Portfolio
          </button>
        </div>
      ) : (
        <div>
          <p className={style["mono-section-paragraph"]}>
            By clicking the publish button, your portfolio will be made visible to other users.
          </p>
          <button className={style["mono-button-primary"]} onClick={() => handlePublish("publish")}>
            Publish Portfolio
          </button>
        </div>
      )}

      <ErrorSnackbar open={open} messages={messages} onClose={close} />
      <SuccessSnackbar open={openSuccess} messages={messagesSuccess} onClose={closeSuccess} />
    </section>
  );
}
