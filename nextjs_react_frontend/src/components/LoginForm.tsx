// components/LoginForm.tsx
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

import { useRouter } from "next/router";
import Link from "next/link";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import axios from "axios";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";

import styles from "@/styles/components/Form.module.css";
import login_styles from "@/styles/components/LoginForm.module.css";

const formSchema = z.object({
    email: z.string().min(4, { message: "Email must be at least 4 characters." }),
    password: z.string().min(4, { message: "Password must be at least 8 characters." }),
});

function LoginForm() {
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();

    useEffect(() => {
        // Disable scrolling
        document.body.classList.add(styles.noScroll);

        // Re-enable scrolling when component unmounts
        return () => {
            document.body.classList.remove(styles.noScroll);
        };
    }, []);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) 
    {
        setIsLoading(true);
        setError("");

        try {
            const response = await axios.post("http://localhost:8000/api/auth/login/", values);
            const { accessToken, refreshToken } = response.data;

            localStorage.setItem("accessToken", accessToken);
            localStorage.setItem("refreshToken", refreshToken);

            console.log("Token: " + accessToken);
            router.push("/dashboard");
        } catch (error: any) {
            console.error("Login error: ", error.response?.data || error.message);
            
            if (error.response) {
                switch (error.response.status) {
                    case 400:
                        setError("Invalid username or password.");
                        break;
                    case 401:
                        setError("Invalid username or password.");
                        break;
                    case 429:
                        setError("Too many login attempts. Please try again later.");
                        break;
                    default:
                        setError("An unexpected error occurred. Please try again later.");
                }
            } else if (error.request) {
                setError("No response received from the server. Please check your internet connection.");
            } else {
                setError("An unexpected error occurred. Please try again.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className={styles.form}>
                    {error && <p className={styles.error}>{error}</p>}

                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input {...field} type="email" placeholder="Email" required className={`${styles.input} ${form.formState.errors.email ? styles.inputError : ''}`} disabled={isLoading}/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input {...field} type="password" placeholder="Password" required className={`${styles.input} ${form.formState.errors.password ? styles.inputError : ''}`} disabled={isLoading}/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />

                    <Button type="submit" className={styles.button} disabled={isLoading} style={{marginTop: "12px"}}>
                        {isLoading ? "Logging in..." : "Login"}
                    </Button>

                    <div className={login_styles.signupContainer}>
                        <p>Don't have an account?</p>
                        <Link href="/sign-up" className={login_styles.loginLink}>Sign Up</Link>
                    </div>
                </form>
            </Form>
        </div>
    );
};

export default LoginForm;