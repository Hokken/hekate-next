import { createContext } from "react";

type myContext = {
    isAuthentificated: boolean;
    user: any;
    logout: () => void;
}

export default createContext<any | null>(null);