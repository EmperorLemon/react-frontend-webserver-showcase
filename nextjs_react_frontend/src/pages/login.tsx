// pages/login.tsx
import { NextPage } from "next";

import LoginForm from "@/components/LoginForm";
import Layout from "@/components/Layout";

const LoginPage: NextPage = () => {
    return (
        <Layout>
            <div>
                <h1 style={{display: "flex", justifyContent: "center"}}>Login</h1>
                <LoginForm/>
            </div>
        </Layout>
    );
};

export default LoginPage;