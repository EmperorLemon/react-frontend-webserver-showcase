import { useState } from "react";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import axios from "axios";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

import styles from "@/styles/LoginForm.module.css";

const formSchema = z.object({
    username: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    password: z.string().min(4, {
        message: "Password must be at least 4 characters.",
    }),
});

type LoginFormProps = { onLoginSuccess: (token: string) => void };

function LoginForm({ onLoginSuccess }: LoginFormProps) {
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            password: "",
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true);
        setError("");

        try {
            const response = await axios.post("http://localhost:8000/api/auth/login/", values);
            const { accessToken, refreshToken } = response.data;

            localStorage.setItem("accessToken", accessToken);
            localStorage.setItem("refreshToken", refreshToken);

            onLoginSuccess(accessToken);
        } catch (error: any) {
            console.error("Login error: ", error.response?.data || error.message);
            setError(error.response?.data?.detail || "Login failed. Please check your credentials.");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className={styles.container}>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className={styles.form}>
                    {error && <p className={styles.error}>{error}</p>}
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Username</FormLabel><br/>
                                <FormControl>
                                    <Input {...field} type="text" placeholder="Username" required className={styles.input} disabled={isLoading}/>
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel><br/>
                                <FormControl>
                                    <Input {...field} type="password" placeholder="Password" required className={styles.input} disabled={isLoading}/>
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className={styles.button} disabled={isLoading}>
                        {isLoading ? "Logging in..." : "Login"}
                    </Button>
                </form>
            </Form>
        </div>
    );
}

export default LoginForm;