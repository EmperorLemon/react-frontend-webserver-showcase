// components/LoginForm.tsx
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import axios from "axios";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";

import styles from "@/styles/components/Form.module.css";
import sign_up_styles from "@/styles/components/SignupForm.module.css";

const formSchema = z.object({
    first_name: z.string().min(3, { message: "First name must be at least 3 characters." }),
    last_name: z.string().min(3, { message: "Last name must be at least 3 characters." }),
    username: z.string().min(4, { message: "Username must be at least 4 characters." }),
    password: z.string().min(4, { message: "Password must be at least 8 characters." }),
});

function SignupForm() {
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
            first_name: "",
            last_name: "",
            username: "",
            password: "",
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) 
    {
        setIsLoading(true);
        setError("");

        try {
            const response = await axios.post("http://localhost:8000/api/auth/sign-up/", values);
            router.push("/login");
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
                    
                    <div className={styles.nameFieldsContainer}>
                        <FormField
                            control={form.control}
                            name="first_name"
                            render={({ field }) => (
                                <FormItem className={styles.nameField}>
                                    <FormControl>
                                        <Input {...field} type="text" placeholder="First Name" required className={`${styles.input} ${form.formState.errors.first_name ? styles.inputError : ''}`} disabled={isLoading}/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="last_name"
                            render={({ field }) => (
                                <FormItem className={styles.nameField}>
                                    <FormControl>
                                        <Input {...field} type="text" placeholder="Last Name" required className={`${styles.input} ${form.formState.errors.last_name ? styles.inputError : ''}`} disabled={isLoading}/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                    </div>

                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input {...field} type="text" placeholder="Username" required className={`${styles.input} ${form.formState.errors.username ? styles.inputError : ''}`} disabled={isLoading}/>
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
                        {isLoading ? "Signing up..." : "Sign Up"}
                    </Button>
                </form>
            </Form>
        </div>
    );
};

export default SignupForm;