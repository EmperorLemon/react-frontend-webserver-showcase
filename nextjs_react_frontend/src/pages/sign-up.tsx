// pages/signup.tsx
import { NextPage } from "next";

import SignupForm from "@/components/SignupForm";
import Layout from "@/components/Layout";

const SignupPage: NextPage = () => {
    return (
        <Layout title="Sign Up" useHeader={true}>
            <div>
                <h1 style={{display: "flex", justifyContent: "center"}}>Sign Up</h1>
                <SignupForm/>
            </div>
        </Layout>
    );
};

export default SignupPage;