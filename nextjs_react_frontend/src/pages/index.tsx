// pages/index.tsx
import { NextPage } from "next";

import Layout from "@/components/Layout";

const HomePage: NextPage = () => {
    return (
        <Layout>
            <div>
                <h1 style={{display: "flex", justifyContent: "center"}}>Welcome Home</h1>
            </div>
        </Layout>
    );
};

export default HomePage;