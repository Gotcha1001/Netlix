"use client";
import { GlobalContextProvider } from "@/context/globalContext";
import { ProfileContextProvider } from "@/context/profileContext";

interface Props {
  children: React.ReactNode;
}

function ContextProvider({ children }: Props) {
  return (
    <GlobalContextProvider>
      <ProfileContextProvider>{children}</ProfileContextProvider>
    </GlobalContextProvider>
  );
}
export default ContextProvider;
