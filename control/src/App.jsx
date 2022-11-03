import { useState, useEffect } from "react";
import Login from "./components/Login";
import "./App.css";
import axios from 'axios'
import Menu from "./components/Menu";
import {motion} from 'framer-motion'



function App() {

  const [login, setlogin] = useState("");
  const [session, setSession] = useState("");

  console.log(`El valor de login  ⟢ ⊱⊱ ⟢ ${login}`);

  const loginContainer = () => {
    return <Login login={login} setlogin={setlogin} />;
  };

 
  const menu = () => {
    return <Menu />

  };



  return <motion.div className=""
  initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
  >
    {!window.sessionStorage.getItem('loggedAppUser') && loginContainer()}
    {window.sessionStorage.getItem('loggedAppUser') && menu()}
    </motion.div>;
}

export default App;