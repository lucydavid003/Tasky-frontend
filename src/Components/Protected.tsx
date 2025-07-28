import { Navigate } from "react-router-dom";
import useUser from "../Store/userStore";
import type { ReactNode } from "react";

interface ProtectedProps {
  children: ReactNode;
}

function Protected({ children }: ProtectedProps) {
  const { user } = useUser();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

export default Protected;
