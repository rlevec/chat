import { createContext, useContext } from "react";

const RouterContext = createContext();

export default RouterContext;

export const useRouter = () => useContext(RouterContext);
