import React, { ReactNode } from "react";
import Link from "next/link";
import Head from "next/head";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink } from "@/components/ui/navigation-menu";
import styles from '@/styles/Layout.module.css';

interface LayoutProps {
    children: ReactNode;
    title?: string;
}

export default function Layout({ children, title }: LayoutProps) {
    return (
        <>
            <Head>
                <title>{title || 'Default Title'}</title>
            </Head>
            <header className={styles.header}>
                <NavigationMenu className={styles.nav}>
                    <NavigationMenuItem className={styles.navItem}>
                        <Link href="/" passHref legacyBehavior>
                            <NavigationMenuLink className={styles.navLink}>
                                Home
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                    <NavigationMenuItem className={styles.navItem}>
                        <Link href="/login" passHref legacyBehavior>
                            <NavigationMenuLink className={styles.navLink}>
                                Login
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                </NavigationMenu>
            </header>
            <main>{children}</main>
        </>
    );
}