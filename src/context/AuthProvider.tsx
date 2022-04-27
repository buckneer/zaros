

import React, {useState} from 'react';
import {User, UserContextType} from "../@types/user";

export const AuthContext = React.createContext<UserContextType>({} as UserContextType);

export const AuthProvider: React.FC<{children: JSX.Element[] | JSX.Element}> = ({children}) => {
    const [user, setUser] = useState<User | null>(null);

    const login = (user: User) => {
        setUser(user)
    }

    const logout = () => {
        setUser(null)
    }

    return(
        <AuthContext.Provider value={{user, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}


