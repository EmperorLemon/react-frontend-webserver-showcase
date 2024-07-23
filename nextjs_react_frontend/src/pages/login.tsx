import { NextPage } from "next";
import LoginForm from "@/components/LoginForm";

function onLoginSuccess(token : string) {
    console.log("Success!");
}

const Login: NextPage = () => {
    return (
        <div>
            <h1 style={{display: "flex", justifyContent: "center"}}>Login</h1>
            <LoginForm onLoginSuccess={onLoginSuccess}/>
        </div>
    );
};

export default Login;