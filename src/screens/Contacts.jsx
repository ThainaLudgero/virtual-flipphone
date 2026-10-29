
import { useCallback, useEffect, useRef, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router";
import images from "../assets/images";

const CONTACTS = [1, 2, 3, 4, 5, 6];

export default function Contacts() {
    const navigate = useNavigate();
    const location = useLocation();
    const listRef = useRef(null);
    const [activeContact, setActiveContact] = useState(0);
    const [bottomSpace, setBottomSpace] = useState(0);

    function handleExit() {
        if (location.key === "default") {
            navigate("/", { replace: true });
            return;
        }

        navigate(-1);
    }

    // Cria espaço suficiente para o último contato chegar ao topo.
    useEffect(() => {
        const list = listRef.current;

        if (!list) return;

        const updateBottomSpace = () => {
            const contacts = list.querySelectorAll("[data-contact]");
            const lastContact = contacts[contacts.length - 1];

            if (!lastContact) return;

            setBottomSpace(
                Math.max(0, list.clientHeight - lastContact.offsetHeight)
            );
        };

        const observer = new ResizeObserver(updateBottomSpace);

        observer.observe(list);
        updateBottomSpace();

        return () => observer.disconnect();
    }, []);

    // Seleciona o primeiro contato visível no topo da lista.
    const updateActiveContact = useCallback((event) => {
        const list = event.currentTarget;
        const listTop = list.getBoundingClientRect().top;

        const contacts = Array.from(
            list.querySelectorAll("[data-contact]")
        );

        const index = contacts.findIndex(
            (contact) =>
                contact.getBoundingClientRect().bottom > listTop + 1
        );

        if (index !== -1) {
            setActiveContact(index);
        }
    }, []);

    // Ao clicar, leva o contato selecionado até o topo.
    const selectContact = useCallback((event, index) => {
        const list = listRef.current;
        const contact = event.currentTarget;

        if (!list) return;

        setActiveContact(index);

        const listTop = list.getBoundingClientRect().top;
        const contactTop = contact.getBoundingClientRect().top;

        list.scrollTo({
            top: list.scrollTop + contactTop - listTop,
            behavior: "smooth",
        });
    }, []);

    return (
        <div className="flex h-full min-h-0 flex-col overflow-hidden">
            <header className="h-8 shrink-0 bg-[linear-gradient(90deg,#FCA2C7_0%,#F77CAD_50%,#FCA2C7_100%)]">
                <h1 className="flex h-full items-center justify-center text-xl">
                    Contacts
                </h1>
            </header>

            <div
                ref={listRef}
                onScroll={updateActiveContact}
                className="min-h-0 flex-1 snap-y snap-mandatory overflow-y-auto"
            >
                {CONTACTS.map((contact, index) => (
                    <button
                        key={contact}
                        type="button"
                        data-contact
                        onClick={(event) => selectContact(event, index)}
                        aria-pressed={activeContact === index}
                        className={`flex w-full shrink-0 snap-start items-center gap-3 py-4 pl-5 pr-3 text-left transition-colors duration-150 ${
                            activeContact === index
                                ? "bg-[linear-gradient(180deg,#FFDD94_0%,#FFDD94_5%,#FFCF67_15%,#FFCF67_69%,#FCBC32_100%)]"
                                : "bg-transparent"
                        }`}
                    >
                        <img
                            className="h-16 shrink-0"
                            src={images.defaultcontact}
                            alt=""
                        />

                        <span className="text-base">
                            &gt; Nome do contato {contact}
                            <span className="block">
                                (DDD) 1234-5678
                            </span>
                        </span>
                    </button>
                ))}

                <div
                    aria-hidden="true"
                    className="shrink-0"
                    style={{ height: bottomSpace }}
                />
            </div>
            <footer className="h-8 shrink-0 flex mt-0.5">
                <button type="button" onClick={handleExit} className="cursor-pointer py-1 pl-2 w-full text-left bg-[linear-gradient(90deg,#F77CAD_40%,rgba(253,214,236,1)_100%)]">Exit</button>
                <NavLink to="/contact-details" className="cursor-pointer py-1 pl-2 w-full text-right bg-[linear-gradient(270deg,#F77CAD_40%,rgba(253,214,236,1)_100%)]">View</NavLink>
            </footer>
        </div>
    );
}
