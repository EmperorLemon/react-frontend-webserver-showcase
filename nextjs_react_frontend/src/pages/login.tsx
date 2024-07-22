// pages/login.tsx
import React from "react";
import Layout from "@/components/layout";
import LoginForm from "@/components/login-form";

const Login: React.FC = () => {
    const handleLoginSuccess = (token: string) => {
        console.log("Login Successful, token: ", token);
        // Handle successful login (e.g., store token, redirect user)
    }

    return (
        <Layout title="Login Page">
            <LoginForm onLoginSuccess={handleLoginSuccess}/>
        </Layout>
    );
}

export default Login