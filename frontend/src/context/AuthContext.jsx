import { createContext, useState, useEffect, Children } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();


const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("userInfo");
    const token = localStorage.getItem("authToken");
    // Set only if both exist — otherwise null
    console.log(storedUser);
    return storedUser && storedUser !== "undefined" && token
    ? JSON.parse(storedUser)
    : null;
  }); 
  //store user info
  const [token, setToken] = useState(localStorage.getItem("authToken"));
  const [loading, setLoading] = useState(true);
 const [progressData, setProgressData] = useState({
        progress: 0,
        message: "🌱 Start Growing",
      });

        const [openGenerator, setOpenGenerator] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("userInfo");
    console.log(storedUser);
    if (storedUser && storedUser !== "undefined") {
      setUser(JSON.parse(storedUser));
    }
    
    setLoading(false);
  }, []);

  console.log("stored info",user);
  useEffect(() => {
    console.log(token);
    if (token) {
      console.log(token);
      localStorage.setItem("authToken", token);
    } else {
      localStorage.removeItem("authToken");
    }
  }, [token]);

console.log(user);

  const logoutUser = () => {
    if (!localStorage.getItem("authToken") && !user) return;

    localStorage.removeItem("authToken");
    localStorage.removeItem("userInfo");
    setUser(null);
    setToken(null);
    window.location.href = "/login";

  };

  useEffect(() => {
    const handleTokenExpired = () => {
      console.log("🔁 Token expired — logging out user");
      setUser(null);
      setToken(null);
      // Optional redirect
      // window.location.href = "/login";
    };
  
    window.addEventListener("tokenExpired", handleTokenExpired);
    return () => window.removeEventListener("tokenExpired", handleTokenExpired);
  }, []);
  
    const [notification, setNotification] = useState("");


  return (
    <AuthContext.Provider value={{ user, setUser, token, setToken, logoutUser, loading,progressData,setProgressData ,setOpenGenerator,openGenerator, notification, setNotification}}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider;