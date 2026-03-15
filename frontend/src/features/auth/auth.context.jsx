import { createContext, useState, useEffect } from "react";
import { getMe } from "./services/auth.api";

export const AuthContext = createContext()

export const AuthProvider = ({children}) => {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const getandSetUser = async () => {
            const data = await getMe()
            if(data && data.user){  // ✅ check if data exists first
                setUser(data.user)
            }
            setLoading(false)
        }
        getandSetUser()
    }, [])

    return(
        <AuthContext.Provider value={{user, setUser, loading, setLoading}}>
            {children}
        </AuthContext.Provider>
    )
}