import React, { ReactNode } from "react";
import Link from "next/link";
import Head from "next/head";

interface LayoutProps 
{
    children: ReactNode;
    title?: string;
}

export default function Layout({ children, title }: LayoutProps)
{
    return (
        <>
            <Head>
                <title>{title || 'Default Title'}</title>
            </Head>
            <nav>
                <Link href="/">Home</Link>
                <Link href="/login">Login</Link>
            </nav>
            <main>{children}</main>
        </>
    );
}