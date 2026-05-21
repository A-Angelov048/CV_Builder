import style from "../Profile.module.css";

import ChangeCredentials from "./ChangeCredentials";
import ChangeIdentity from "./ChangeIdentity";
import PublishPortfolio from "./PublishPortfolio";

export default function ProfileSettings() {
  return (
    <div className={style["mono-main-content"]}>
      <header>
        <h1 className={style["mono-title"]}>Profile Settings</h1>
      </header>
      <div>
        <PublishPortfolio />
        <ChangeIdentity />
        <ChangeCredentials />
      </div>
    </div>
  );
}
