import style from "./Profile.module.css";

import ProfileSettings from "./profileSettings/ProfileSettings";

import { useAuth } from "../../hooks/useAuth";

export default function Profile({ toggleProfile }: { toggleProfile: () => void }) {
  const { logoutUser } = useAuth();

  return (
    <div onClick={() => toggleProfile()} className={style["mono-modal-overlay"]}>
      <div onClick={(e) => e.stopPropagation()} className={style["mono-modal-container"]}>
        <aside className={style["mono-sidebar"]}>
          <div className={style["mono-sidebar-menu"]}>
            <div className={style["mono-icon-btn-position"]}>
              <button
                className={style["mono-icon-btn"]}
                style={{ marginLeft: "-0.5rem" }}
                onClick={() => toggleProfile()}
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
                logoutUser("/");
                toggleProfile();
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
