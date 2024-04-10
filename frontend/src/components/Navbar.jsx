import { BsBarChartFill } from "react-icons/bs";
import { NavLink } from "react-router-dom";

const Navbar = () => {

    return <>
        <div className="">
            <div className="">
                <BsBarChartFill/>
                <p>TaskPal</p>
            </div>
            <div className="">
                <NavLink to="/register">
                    <button>Create New Account</button>
                </NavLink>
                <NavLink to="/login">
                    <button>Login</button>
                </NavLink>
            </div>
        </div>
    </>
}

export default Navbar