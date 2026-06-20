import { createContext, useCallback, useState, type ReactNode } from "react";

interface ContextType {
  profileToggle: boolean;
  changePRFToggleState: () => void;
}

interface ProfileToggleProviderProps {
  children: ReactNode;
}

export const ProfileToggleContext = createContext<ContextType | null>(null);

export function ProfileToggleProvider({ children }: ProfileToggleProviderProps) {
  const [profileToggle, setProfileToggle] = useState(false);

  const changePRFToggleState = useCallback(() => {
    setProfileToggle((prev) => !prev);
  }, []);

  const data: ContextType = {
    profileToggle,
    changePRFToggleState,
  };

  return <ProfileToggleContext.Provider value={data}>{children}</ProfileToggleContext.Provider>;
}
