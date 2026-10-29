import type { RouteObject } from "react-router";
// @ts-expect-error Home is a JavaScript component without TypeScript declarations.
import Home from "../screens/Home";
// @ts-expect-error Menu is a JavaScript component without TypeScript declarations.
import Menu from "../screens/Menu";
// @ts-expect-error Menu is a JavaScript component without TypeScript declarations.
import Contacts from "../screens/Contacts";
// @ts-expect-error Menu is a JavaScript component without TypeScript declarations.
import ContactDetails from "../screens/ContactDetails";

const routes: RouteObject[] = [
  { index: true, element: <Home /> },
  { path: "menu", element: <Menu /> },
  { path: "home", element: <Home /> },
  { path: "contacts", element: <Contacts /> },
  { path: "contact-details", element: <ContactDetails /> },
];

export default routes;