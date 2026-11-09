
import { NavLink, useLocation, useNavigate } from "react-router";
export default function ContactDetails() {  
    const navigate = useNavigate();
    const location = useLocation();

    function handleExit() {
        if (location.key === "default") {
            navigate("/", { replace: true });
            return;
        }

        navigate(-1);
    }

    return(
        <div className="flex h-full min-h-0 flex-col overflow-hidden">
            <header className="h-8 shrink-0 bg-[linear-gradient(90deg,#FCA2C7_0%,#F77CAD_50%,#FCA2C7_100%)]">
                <h1 className="flex h-full items-center justify-center text-base edge:text-xl">
                    Edit Contact
                </h1>
            </header>
            <div className="flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto px-2 justify-center text-xs edge:text-base">
                <div>
                    <label for="name">Name:</label>
                    <input type="text" id="name" className="w-full px-2 text-black border edge:border-2 border-t-black border-r-black border-b-gray-400 border-l-gray-400" />
                </div>
                <div>
                    <label for="number">Number:</label>
                    <input type="text" id="number" className="w-full px-2 text-black border edge:border-2 border-t-black border-r-black border-b-gray-400 border-l-gray-400" />
                </div>
                <div>
                    <label for="type">Type:</label>
                    <br />
                    <select id="type" className="py-1 w-full border edge:border-2 border-t-black border-r-black border-b-gray-400 border-l-gray-400">
                        <option value="mobile">Mobile</option>
                        <option value="home">Home</option>
                        <option value="work">Work</option>
                        <option value="fax">Fax</option>
                    </select>
                </div>
                <div className="grid grid-cols-2 gap-1">
                    <div className="min-w-0">
                        <label htmlFor="picture">Picture:</label>

                        <label
                            htmlFor="picture"
                            className="flex items-center justify-center w-full h-8 cursor-pointer border border-t-black border-r-black border-b-gray-400 border-l-gray-400 text-xs"
                        >
                            Choose File
                        </label>

                        <input
                            type="file"
                            id="picture"
                            accept="image/*"
                            className="sr-only"
                        />
                    </div>
                    <div className="min-w-0">
                        <label htmlFor="ringtone">Ringtone:</label>

                        <select
                            id="ringtone"
                            className="block box-border w-full min-w-0 h-8 appearance-auto border border-solid border-t-black border-r-black border-b-gray-400 border-l-gray-400 bg-white px-1 text-xs"
                        >
                            <option value="default">Default</option>
                        </select>
                    </div>

                </div>
            </div>
            <footer className="mt-auto flex shrink-0 text-sm edge:text-base">
                <div className="w-full bg-linear-to-r from-[#F77CAD] from-40% to-[#FDD6EC]">
                    <button type="button" onClick={handleExit} className="cursor-pointer py-1 pl-2 w-full text-left">Exit</button>
                </div>
                <div className="w-full bg-linear-to-l from-[#F77CAD] from-40% to-[#FDD6EC]">
                    <NavLink to="/contact-details" className="cursor-pointer py-1 pr-2 w-fit block ml-auto text-right">Save</NavLink>
                </div>
            </footer>
        </div>
    );
}''