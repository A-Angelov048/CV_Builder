import styles from "./ProfileCard.module.css";
import { forwardRef } from "react";
import { useForm, type FieldErrors, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import useHandleForm from "../../hooks/useHandleForm";
import { useFormErrorSnackbar } from "../../hooks/useFormErrorSnackbar";
import {
  profileCardSchema,
  type ProfileCardValues,
} from "../../validation/formSchema";
import { ErrorSnackbar } from "../errorModal/ErrorSnackbar";

export default forwardRef<HTMLDivElement>(function ProfileCard(_, ref) {
  const { flagForm, changeState } = useHandleForm(true);

  const { open, messages, close, handleErrors } = useFormErrorSnackbar();

  const { register, handleSubmit } = useForm<ProfileCardValues>({
    resolver: zodResolver(profileCardSchema),
  });

  const onSubmit: SubmitHandler<ProfileCardValues> = (data) => {
    console.log("Form submitted:", data);
    changeState(true);
  };

  const onError = (formErrors: FieldErrors<ProfileCardValues>) => {
    handleErrors(formErrors);
  };

  return (
    <section ref={ref} className={styles.hero}>
      <div className={styles["profile-card"]}>
        {flagForm ? (
          <>
            <div className={styles["profile-left"]}>
              <img
                src="https://static.wixstatic.com/media/23e8ad88ae744df0bd7f5221f3d67b0e.jpg/v1/crop/x_90,y_275,w_2349,h_2350/fill/w_470,h_470,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/23e8ad88ae744df0bd7f5221f3d67b0e.jpg"
                alt="Profile Picture"
              />
            </div>

            <div className={styles["profile-right"]}>
              <h2>Rachel Smith</h2>
              <p className={styles.career}>Lawyer & Consultant</p>

              <div className={styles["profile-info"]}>
                <strong>Phone:</strong>
                <p>123-456-7890</p>
              </div>
              <div className={styles["profile-info"]}>
                <strong>Email:</strong>
                <p>info@mysite.com</p>
              </div>
              <div className={styles["profile-info"]}>
                <strong>Address:</strong>
                <p>500 Terry Francine Street San Francisco, CA 94158</p>
              </div>
              <div className={styles["profile-info"]}>
                <strong>Date of Birth:</strong>
                <p>March 14th, 1984</p>
              </div>

              <button
                onClick={() => changeState(false)}
                className={`${"main-button"} ${styles["edit-button"]}`}
              >
                Edit
              </button>
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
                  id="image-profile"
                  {...register("imageProfile")}
                />
              </div>
              <div className="form-group">
                <label htmlFor="image-background">Background Image *</label>
                <input
                  type="file"
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
    </section>
  );
});
