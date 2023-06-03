import { signOut } from "firebase/auth";
import React, {  useState } from "react";
import { auth } from "../firebase";
import "../styles/navbar.css";


function Navbar({ isAuth , setIsAuth }) {

    const [clicked, setClicked] = useState(false)

    const signUserOut = () => {
        signOut(auth).then(() => {
          localStorage.clear()
          setIsAuth(false);
          window.location.pathname = "/";
        })
      }

    return ( 
        <>
            <nav>
                <a href="/"><svg id="logo-15" width="49" height="48" viewBox="0 0 49 48" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M24.5 12.75C24.5 18.9632 19.4632 24 13.25 24H2V12.75C2 6.53679 7.03679 1.5 13.25 1.5C19.4632 1.5 24.5 6.53679 24.5 12.75Z" className="ccustom" fill="#EF5B0C"></path> <path d="M24.5 35.25C24.5 29.0368 29.5368 24 35.75 24H47V35.25C47 41.4632 41.9632 46.5 35.75 46.5C29.5368 46.5 24.5 41.4632 24.5 35.25Z" className="ccustom"fill="#EF5B0C" ></path> <path d="M2 35.25C2 41.4632 7.03679 46.5 13.25 46.5H24.5V35.25C24.5 29.0368 19.4632 24 13.25 24C7.03679 24 2 29.0368 2 35.25Z" className="ccustom" fill="#EF5B0C" ></path> <path d="M47 12.75C47 6.53679 41.9632 1.5 35.75 1.5H24.5V12.75C24.5 18.9632 29.5368 24 35.75 24C41.9632 24 47 18.9632 47 12.75Z" className="ccustom" fill="#EF5B0C" ></path> </svg></a>
                <div>
                {!isAuth ? 
                (<a id={clicked ? "login-active" : "login"} className="navbar"  href="/login">Login</a>):
                // (<Link to="/login"><button  id="navbar" >Login</button></Link>):
                <>
                  {/* <Link to="/createpost"><button  id="navbar" >CreatePost</button></Link> */}
                  <ul className={clicked ? "navbar-active" : "nav1"} id="nav1">
                    <li>
                    <a className="navbar" href="/createpost">CreatePost</a>
                    </li>
                    <li>
                    <a className="navbar" href="/" onClick={signUserOut} id="navbar">LogOut</a>
                    </li>
                  </ul>
                </>}
                </div>
                    {!clicked && 
                    (<div className="icon"><i className="fa fa-bars" onClick={() => setClicked(true)}></i></div>)}
                    {clicked && 
                    (<div className="icon"><i className="fa fa-times" onClick={() => setClicked(false)}></i></div>)}
            </nav>
        </>
    )
}
export default Navbar;