import React, { useState } from "react";
import Api from "@/utils/api";
import styles from "@/styles/LoginForm.module.css";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type LoginFormProps = { onLoginSuccess: (token: string) => void }

const LoginForm: React.FC<LoginFormProps> = ({ onLoginSuccess }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await Api.post("/auth/login/", { username, password });
            const { token } = response.data;

            localStorage.setItem("authToken", token);
            onLoginSuccess(token);
        } catch(error) {
            setError("Login failed. Please check your credentials.");
        }
    }
    
    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit} className={styles.form}>
                <Input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" required className={styles.input}/>
                <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required className={styles.input}/>
                <Button type="submit" className={styles.button}>Login</Button>
                {error && <p className={styles.error}>{error}</p>}
            </form>
        </div>
    );
}

export default LoginForm;