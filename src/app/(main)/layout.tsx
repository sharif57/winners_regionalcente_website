import React from "react";
import Navbar from "@/components/shareUI/navbar";
import Footer from "@/components/shareUI/footer";

export default function MainLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <Navbar />
            {children}
            <Footer />
        </>
    );
}
