import { useState } from "react";
import { NavLink } from "react-router";
import images from "../assets/images";
import Extras from "./Extras";
import Call from "./Call";

export default function Menu() {
    const [isExtrasOpen, setIsExtrasOpen] = useState(false);
    const handleOpenExtras = () => setIsExtrasOpen(true);

    
    const [isCallOpen, setIsCallOpen] = useState(false);
    const handleOpenCall = () => setIsCallOpen(true);

    return (
        <div className="relative flex h-full min-h-0 flex-col">
            <header className="relative z-10 h-8 shrink-0 bg-[linear-gradient(90deg,#FCA2C7_0%,#F77CAD_50%,#FCA2C7_100%)] mb-px">
                <h1 className="flex h-full items-center justify-center text-xl">
                    Menu
                </h1>
            </header>
            <div className="w-full items-center [background:radial-gradient(circle_at_100%_100%,#fff_0,#fff_3px,transparent_3px)_0%_0%/8px_8px_no-repeat,radial-gradient(circle_at_0_100%,#fff_0,#fff_3px,transparent_3px)_100%_0%/8px_8px_no-repeat,radial-gradient(circle_at_100%_0,#fff_0,#fff_3px,transparent_3px)_0%_100%/8px_8px_no-repeat,radial-gradient(circle_at_0_0,#fff_0,#fff_3px,transparent_3px)_100%_100%/8px_8px_no-repeat,linear-gradient(#fff,#fff)_50%_50%/calc(100%_-_10px)_calc(100%_-_16px)_no-repeat,linear-gradient(#fff,#fff)_50%_50%/calc(100%_-_16px)_calc(100%_-_10px)_no-repeat,linear-gradient(90deg,#fdd6ec_1%,#f77faf_50%,#fdd6ec_100%)] grid min-h-0 flex-1 grid-cols-3 grid-rows-3 gap-4 mx-auto justify-items-center p-5">
            <NavLink
                to="/contacts"
                className="button group w-fit"
                type="button"
                aria-label="Contacts"
            >
                <img
                    className="h-11 group-hover:hidden"
                    src={images.contactsIcon}
                    alt=""
                />
                <img
                    className="hidden h-11 group-hover:block"
                    src={images.contactshover}
                    alt=""
                />
            </NavLink>
            <button
                onClick={handleOpenExtras}
                className="button group w-fit"
                type="button"
                aria-label="Extras"
                aria-haspopup="dialog"
                aria-expanded={isExtrasOpen}
            >
                <img
                    className="h-11 group-hover:hidden"
                    src={images.extraIcon}
                    alt=""
                />

                <img
                    className="hidden h-11 group-hover:block"
                    src={images.extrahover}
                    alt=""
                />
            </button>
            <button
                onClick={handleOpenCall}
                className="button group w-fit"
                type="button"
                aria-label="Call"
                aria-haspopup="dialog"
                aria-expanded={isCallOpen}
            >
                <img
                    className="h-11 group-hover:hidden"
                    src={images.callIcon}
                    alt=""
                />

                <img
                    className="hidden h-11 group-hover:block"
                    src={images.callhover}
                    alt=""
                />
            </button>
            </div>
            <footer className="h-8 shrink-0 flex mt-0.5">
                <NavLink type="button" to="/" className="cursor-pointer py-1 pl-2 w-full text-left bg-linear-to-r from-[#F77CAD] from-40% to-[#FDD6EC]">Exit</NavLink>
                <button className="cursor-pointer py-1 pl-2 w-full text-right bg-linear-to-l from-[#F77CAD] from-40% to-[#FDD6EC]">Select</button>
            </footer>
            {isExtrasOpen && (
                <Extras onClose={() => setIsExtrasOpen(false)} />
            )}
            {isCallOpen && (
                <Call onClose={() => setIsCallOpen(false)} />
            )}
        </div>
    );
}