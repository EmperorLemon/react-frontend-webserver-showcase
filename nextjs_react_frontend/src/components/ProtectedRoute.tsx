// components/ProtectedRoute.tsx
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import axios from "axios";

function ProtectedRoute(WrappedComponent: React.ComponentType) 
{
  return (props: any) => 
  {
    const router = useRouter();

    useEffect(() => 
    {
      const verifyToken = async () => 
      {
        const accessToken = localStorage.getItem("accessToken");

        if (!accessToken) {
          router.replace("/login");
        } 
        else 
        {
          try 
          {
            // Use the verify-token API endpoint
            const response = await axios.post("http://localhost:8000/api/auth/verify-token/", { token: accessToken });
          } 
          catch (error) 
          {
            console.error("Token verification failed:", error);
            localStorage.removeItem("accessToken");
            router.replace("/login");
          }
        }
      };
  
      verifyToken();
    }, []);

    return <WrappedComponent {...props} />
  };
};

export default ProtectedRoute;