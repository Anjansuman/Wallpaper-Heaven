"use client";
import { Navbar, NavBody, NavItems, NavbarLogo, NavbarButton } from "@/components/ui/resizable-navbar";
import Image from "next/image";
import homePage from "../../public/home.jpeg";
import BrandName from "../ui/Customs/BrandName";

export default function NavBar() {
    return (
        <div className="h-full w-full">
            <Navbar>
                <NavBody>
                    {/* <NavbarLogo  /> */}
                    <BrandName size={"sm"} />
                    <NavItems
                        items={[
                            { name: "Home", link: "/" },
                            { name: "About", link: "/about" },
                            { name: "Contact", link: "/contact" },
                        ]}
                    />
                    <div className="flex items-center gap-4">
                        <NavbarButton href="/login" variant="secondary" >Login</NavbarButton>
                        <NavbarButton href="/login" variant="primary" >Book a call</NavbarButton>
                    </div>
                </NavBody>
            </Navbar>
        </div>
    );
}
