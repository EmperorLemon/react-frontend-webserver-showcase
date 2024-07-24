// pages/dasboard.tsx
import { NextPage } from "next";

import Dashboard from "@/components/Dashboard";
import ProtectedRoute from "@/components/ProtectedRoute";

const DashboardPage: NextPage = () => { 
    return <Dashboard/>
};

export default ProtectedRoute(DashboardPage);