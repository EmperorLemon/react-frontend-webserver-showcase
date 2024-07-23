import { NextPage } from "next";
import { useState } from "react";
import axios from "axios";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import styles from "@/styles/LoginForm.module.css";

type LoginFormProps = { onLoginSuccess: (token: string) => void }

const LoginForm: NextPage<LoginFormProps> = ({ onLoginSuccess }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            const response = await axios.post("http://localhost:8000/api/auth/login/", { username, password });
            const { accessToken, refreshToken } = response.data;

            localStorage.setItem("accessToken", accessToken);
            localStorage.setItem("refreshToken", refreshToken);
        } catch (error: any) {
            console.error("Login error: ", error.response?.data || error.message);
            setError(error.response?.data?.detail || "Login failed. Please check your credentials.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit} className={styles.form}>
                {error && <p className={styles.error}>{error}</p>}
                
                <Input type="text" value={username} onChange={(e) => setUsername(e.target.value)} 
                    placeholder="Username" required className={styles.input} disabled={isLoading}/>
                    
                <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} 
                    placeholder="Password" required className={styles.input} disabled={isLoading}/>

                <Button type="submit" className={styles.button} disabled={isLoading}>
                    {isLoading ? "Logging in..." : "Login"}
                </Button>
            </form>
        </div>
    );
};

export default LoginForm