import { createContext, ReactNode, useContext, useState } from "react";

export type AuthContextType = {
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  isAuthenticated: boolean;
};

const AuthContext: any = createContext<AuthContextType>({} as AuthContextType);
export type AuthProviderProps = {
  children?: ReactNode;
};

export const useAuthContext = () => {
  return useContext<AuthContextType>(AuthContext);
};

export const AuthProvider = (props: AuthProviderProps) => {
  const { children } = props;

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const defaultContext: AuthContextType = {
    ...props,
    isAuthenticated: isAuthenticated,

    setIsAuthenticated,
  };

  return (
    <AuthContext.Provider value={defaultContext}>
      {children}
    </AuthContext.Provider>
  );
};
