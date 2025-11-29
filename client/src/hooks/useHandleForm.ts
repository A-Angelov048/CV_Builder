import { useState } from "react";

export default function useHandleForm(initialFlag: boolean) {
  const [flagForm, setFlagForm] = useState(initialFlag);

  const changeState = (value: boolean) => {
    setFlagForm(value);
  };

  return { flagForm, changeState };
}
