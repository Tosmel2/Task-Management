import Navbar from "../components/Navbar";
import task1 from "../images/task1.svg"
import { NavLink } from "react-router-dom";

const Home = () => {

    return <>

        <Navbar/>

        <div className="">
            <div className="">
                <h1>Manage Your Day With Task<span>Pal</span></h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore aperiam optio id iste, sunt vitae rem ab. Facilis ab modi, voluptas, fugit at recusandae quam, repellat laboriosam eius possimus aliquid.</p>
                <NavLink to="/register" end><button>Get Started</button></NavLink>
            </div>
            <div className="">
                <img src={task1} alt="" />
            </div>
        </div>

    </>

}

export default Home