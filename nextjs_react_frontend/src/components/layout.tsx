import NavigationHeader from  "@/components/NavigationHeader";
import styles from "@/styles/Layout.module.css";

import Head from "next/head";

interface LayoutProps {
    children: React.ReactNode;
    title?: string;
};

function Layout({ children, title }: LayoutProps) {
    return (
        <div>
            <Head>
                <title>{title || "Default Title"}</title>
                <meta name="viewport" content="width=device-width, intial-scale=1"/>
                <meta name="keywords" content="nextjs, react"/>
            </Head>
            <header className={styles.header}><NavigationHeader/></header>
            <main>{children}</main>
            <footer className={styles.footer}>© 2024 Caleb Goss</footer>
        </div>
    );
};

export default Layout;