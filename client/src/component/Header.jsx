import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import AdminHeader from "./Header/AdminHeader";
import UserHeader from "./Header/UserHeader";

function Header(props){


    return(
        <div>
            {props.isAdmin ? 
            (<AdminHeader name={props.name} isAdmin={props.isAdmin} isLoggedIn={props.isLoggedIn} />
        ):(
            <UserHeader name={props.name} isAdmin={props.isAdmin} isLoggedIn={props.isLoggedIn} cartQty={props.cartQty} />)}
        </div>
    )
}

export default Header;