import { useRoutes } from "react-router";
import routes from "../../app/routes";

export default function PhoneScreen({ inputValue, onInputChange }) {
    const screen = useRoutes(routes);

    return (
        <div className="relative z-9 top-32 h-83 w-63 rounded-sm">
            {/* <input
                type="text"
                value={inputValue}
                onChange={(event) => onInputChange(event.target.value)}
                className="bg-gray-200 border-none focus:outline-none"
            /> */}
            {screen}
        </div>
    );
}