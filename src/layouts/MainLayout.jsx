import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/footer";
import Gallery from "../components/Gallery";

export default function MainLayout() {
    return (
        <>
            <Header />
            <Outlet />
            <Gallery/>
            <Footer />
        </>
    )
}