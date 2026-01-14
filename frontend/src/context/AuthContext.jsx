import{createContext,useContext ,useState} from "react";

const AuthContext = createContext(null);
 
export const AuthProvider=({children}) =>{
    const storedUser=(()=>{
        try{
            return JSON.parse(localStorage.getItem("user"));

        }catch{
            return null;
        }
    })();

const[user,setUser]= useState(storedUser);

const login =(userData)=>{
    localStorage.setItem("user",JSON.stringify(userData));
    localStorage.setItem("token", userData.token); 
    setUser(userData);
}

const logout=()=>{
    localStorage.removeItem("user");
    setUser(null);
};

return (
    <AuthContext.Provider value={{user,login,logout}}>
        {children}
    </AuthContext.Provider>
);
};

export const useAuth =()=>{
    const context = useContext(AuthContext);
    if(!context) {
        throw new Error("useAuth must be used within AuthProvider");
    }
    return context;
};