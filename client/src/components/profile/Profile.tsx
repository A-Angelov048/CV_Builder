import style from "./Profile.module.css";

import { useEffect } from "react";

import { useProfileToggle } from "../../hooks/useProfileToggle";
import ProfileSettings from "./profileSettings/ProfileSettings";

export default function Profile({ logoutUser }: { logoutUser: () => void }) {
  const { changePRFToggleState } = useProfileToggle();

  useEffect(() => {
    const handleInteraction = (e: Event) => {
      const target = e.target as HTMLElement;

      if (
        !target.closest(`.${style["mono-modal-container"]}`) &&
        !target.closest(`.${style["mono-modal-overlay"]}`)
      ) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    document.addEventListener("pointerdown", handleInteraction, true);
    document.addEventListener("click", handleInteraction, true);
    document.addEventListener("touchstart", handleInteraction, true);

    return () => {
      document.removeEventListener("pointerdown", handleInteraction, true);
      document.removeEventListener("click", handleInteraction, true);
      document.removeEventListener("touchstart", handleInteraction, true);
    };
  }, []);

  return (
    <div onClick={() => changePRFToggleState()} className={style["mono-modal-overlay"]}>
      <div onClick={(e) => e.stopPropagation()} className={style["mono-modal-container"]}>
        <aside className={style["mono-sidebar"]}>
          <div className={style["mono-sidebar-menu"]}>
            <div className={style["mono-icon-btn-position"]}>
              <button
                className={style["mono-icon-btn"]}
                style={{ marginLeft: "-0.5rem" }}
                onClick={() => changePRFToggleState()}
              >
                <i className="bx bx-x icon"></i>
              </button>
            </div>

            <div className={style["mono-nav"]}>
              <div className={`${style["mono-nav-item"]}`}>
                <i className="bx bxs-user icon"></i>
                <span>Profile</span>
              </div>
            </div>
          </div>

          <div className={style["mono-logout-btn-position"]}>
            <button
              onClick={() => {
                logoutUser();
                changePRFToggleState();
              }}
              className={style["mono-logout-btn"]}
            >
              <i className="bx bx-log-out icon"></i>
              <span>Logout</span>
            </button>
          </div>
        </aside>

        <ProfileSettings />
      </div>
    </div>
  );
}
