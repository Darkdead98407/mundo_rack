import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/footer";
import ChatWidget from "../components/ChatWidget";

export default function MainLayout() {
    return (
        <>
            <Header />
            <Outlet />
            <Footer />
            <ChatWidget />
        </>
    )
}