import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/footer";
import Productos from "../pages/Productos";

export default function MainLayout() {
    return (
        <>
            <Header />
            <Outlet />
            <Productos />
            <Footer />
        </>
    )
}