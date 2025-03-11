// src/contexts/AuthContext.tsx
import  { createContext, useContext, useState, ReactNode, useEffect } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  login: (token: string, user: User) => void;
  logout: () => void;
  getUser: () => User;
  setProduct: (id: string) => void;
  getProductId: () => string
}
interface User {
  _id?: string
  username?: string,
  email?: string,
  role?: string,
  profile?: {
    avatar: string,
    fullName: string,
    address: string,
    phone: string,
  },
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User>({})
  const [productId, setProductId] = useState<string>('')
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userLocal = localStorage.getItem("user");
    if (token) {
      setIsAuthenticated(true);
    }
    if(userLocal) {
      setUser(JSON.parse(userLocal))
    }
  }, []);

  const login = (token: string, user: User) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user",JSON.stringify(user))
    setIsAuthenticated(true);
    setUser(user)
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser({})
    setIsAuthenticated(false);
  };
  const getUser=() => {
    return user
  }
  const setProduct = (id:string) => {
    setProductId(id)
  }
  const getProductId = () => {
    return productId
  }
  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout,getUser,setProduct,getProductId }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};