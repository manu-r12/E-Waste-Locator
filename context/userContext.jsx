import { auth } from "@/firebase/database";
import { onAuthStateChanged } from "firebase/auth";

const { createContext, useState, useEffect } = require("react");



export  const UserContext = createContext()


export const UserProvider  = ({children}) =>{

    const [currentUser, setCurrentUser] = useState({})


    useEffect(() => {
             const unsub =   onAuthStateChanged(auth, (user) =>{
            setCurrentUser(user)
      
             })
            return () => {
                unsub()
            }
        }, [])


return <UserContext.Provider value={{currentUser}}>{children}</UserContext.Provider>


}   
