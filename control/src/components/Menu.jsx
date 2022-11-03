import React from 'react'
import Logout from "./Logout";
import Sumoner from './Sumoner';

const Menu = () => {
  return (
    
    <div>
     <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <div className="container-fluid">
    <div className="collapse navbar-collapse" id="navbarColor03">
      <h2>Loli Sumoner</h2>
    </div>
    <Logout/>
  </div>
</nav>
        <Sumoner/>
        </div>
  )
}

export default Menu