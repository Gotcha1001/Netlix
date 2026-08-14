"use client";
import { TooltipProvider } from "@/components/ui/tooltip";
import { GlobalContextProvider } from "@/context/globalContext";
import { ProfileContextProvider } from "@/context/profileContext";

interface Props {
  children: React.ReactNode;
}

function ContextProvider({ children }: Props) {
  return (
    <GlobalContextProvider>
      <ProfileContextProvider>
        <TooltipProvider>{children}</TooltipProvider>
      </ProfileContextProvider>
    </GlobalContextProvider>
  );
}
export default ContextProvider;
