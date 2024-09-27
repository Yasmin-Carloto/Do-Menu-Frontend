import { createContext, ReactNode, useContext, useEffect, useState  } from "react";

export const ContextToken = createContext<TokenContextProps | null>(null)

interface TokenProviderProps {
    children: ReactNode
}

interface TokenContextProps {
    token: string | null,
    setToken: (token: string | null) => void;
}

export const TokenProvider = ({children}: TokenProviderProps) => {
    const [token, setToken] = useState<string | null>(localStorage.getItem("restaurant_token") || null)

    useEffect(() => {
        if(token){
            localStorage.setItem("restaurant_token", token);
        }
    }, [token])

    return (
        <ContextToken.Provider value={{token, setToken}}>
            {children}
        </ContextToken.Provider>
    )
}


export const useToken = () => {
    const context = useContext(ContextToken)

    if (!context) {
        throw new Error("useToken must be used within a TokenProvider")
    }

    return context
}