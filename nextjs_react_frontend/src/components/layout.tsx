import NavigationHeader from  "@/components/NavigationHeader";
import Head from "next/head";
import styles from "@/styles/Layout.module.css";

interface LayoutProps {
    children: React.ReactNode;
    title?: string;
};

const Layout: React.FC<LayoutProps> = ({ children, title }) => {
    return (
        <div>
            <Head>
                <title>{title || "Default Title"}</title>
                <meta name="viewport" content="width=device-width, intial-scale=1"/>
                <meta name="keywords" content="nextjs, react"/>
            </Head>
            <header className={styles.header}><NavigationHeader/></header>
            <main>{children}</main>
            <footer className={styles.footer}>© 2024 Generic Webpage</footer>
        </div>
    );
};

export default Layout;