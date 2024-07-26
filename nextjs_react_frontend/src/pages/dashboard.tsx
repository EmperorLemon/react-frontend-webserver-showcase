// pages/dasboard.tsx
import { NextPage } from "next";

import Layout from "@/components/Layout";
import Dashboard from "@/components/Dashboard";
import ProtectedRoute from "@/components/ProtectedRoute";
import Sidebar from "@/components/Sidebar";

const DashboardPage: NextPage = () => { 
    return (
        <Layout title="Dashboard" useHeader={false}>
            <Sidebar/>
            <Dashboard/>
        </Layout>
    );
};

export default ProtectedRoute(DashboardPage);