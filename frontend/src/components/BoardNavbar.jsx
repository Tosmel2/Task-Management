import {NavLink} from "react-router-dom";
import { BsBarChartFill } from "react-icons/bs";
// import { BsBell } from "react-icons/bs";origin
import { BsGear } from "react-icons/bs";
import {MdOutlineSpaceDashboard} from "react-icons/md"
import {FiLogOut} from "react-icons/fi"
import {BsFillPlusCircleFill} from "react-icons/bs"
// import {MdSchedule} from "react-icons/md"
import { useState } from "react";


const BoardNavbar = () => {
    const [card, setCard] = useState(false)

    return <>
        <div className={Style.wrapper}>
            <div className={Style.topNav}>
                <div className={Style.leftTopNav}>
                    <BsBarChartFill />
                    <p>TaskPal</p>
                </div>
                <div className={Style.rightTopNav}>
                    {/* <BsBell/> */}
                    <NavLink to="/overview/settings" end><BsGear/></NavLink>
                    <NavLink to="/" end><FiLogOut/></NavLink>
                    

                </div>
            </div>
            <div className={Style.bottomNav}>
                <div className={Style.leftBottomNav}>
                    <NavLink to = "/overview">
                    <div className={Style.link} >
                        <MdOutlineSpaceDashboard/>
                        <p>Overview</p>
                    </div>
                    </NavLink>
                </div>
                <div className="">
                    <BsFillPlusCircleFill onMouseOver={() => setCard(true)}/>
                </div>
                <div className={card ? Style.toggleCard : Style.hide} onMouseLeave = {() => setCard(false)}>
                    <div className={Style.wrap}>
                        <NavLink to="/overview/category" end style={Style.toggleLink}>Add Category</NavLink>
                        <NavLink to="/overview/taskform" end style={Style.toggleLink}>Add Task</NavLink>
                    </div>
                </div>
            </div>
        </div>
    </>;

}

export default BoardNavbar