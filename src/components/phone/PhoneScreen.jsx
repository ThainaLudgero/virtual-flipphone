
import { useRoutes } from "react-router";
import routes from "../../app/routes";

export default function PhoneScreen() {
    const screen = useRoutes(routes);

    return (
        <div className="relative z-[9] flex h-full min-h-0 w-full min-w-0 flex-col overflow-hidden rounded-sm">
            {screen}
        </div>
    );
}
