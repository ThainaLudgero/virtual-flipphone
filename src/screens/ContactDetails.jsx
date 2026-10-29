
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
                <h1 className="flex h-full items-center justify-center text-xl">
                    Edit Contact
                </h1>
            </header>
            <div className="flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto px-2 justify-center">
                <div>
                    <label for="name">Name:</label>
                    <input type="text" id="name" className="w-full px-2 text-black border-2 border-t-black border-r-black border-b-gray-400 border-l-gray-400" />
                </div>
                <div>
                    <label for="number">Number:</label>
                    <input type="text" id="number" className="w-full px-2 text-black border-2 border-t-black border-r-black border-b-gray-400 border-l-gray-400" />
                </div>
                <div>
                    <label for="type">Type:</label>
                    <br />
                    <select id="type" className="py-1 w-full border-2 border-t-black border-r-black border-b-gray-400 border-l-gray-400">
                        <option value="mobile">Mobile</option>
                        <option value="home">Home</option>
                        <option value="work">Work</option>
                        <option value="fax">Fax</option>
                    </select>
                </div>
                <div className="flex justify-between">
                    <div>
                        <label for="picture">Picture:</label>
                        <input type="image" id="picture" className="w-full h-7 pl-2 border-2 border-t-black border-r-black border-b-gray-400 border-l-gray-400"/>
                    </div>
                    <div>
                        <label for="ringtone">Ringtone:</label>
                        <select id="ringtone" className="py-1 w-full border-2 border-t-black border-r-black border-b-gray-400 border-l-gray-400">
                            <option value="default">Default</option>
                        </select>
                    </div>
                </div>
            </div>
            <footer className="mt-auto flex shrink-0">
                <button type="button" onClick={handleExit} className="cursor-pointer py-1 pl-2 w-full text-left bg-[linear-gradient(90deg,#F77CAD_40%,rgba(253,214,236,1)_100%)]">Exit</button>
                <NavLink to="/contact-details" className="cursor-pointer py-1 pl-2 w-full text-right bg-[linear-gradient(270deg,#F77CAD_40%,rgba(253,214,236,1)_100%)]">Save</NavLink>
            </footer>
        </div>
    );
}''