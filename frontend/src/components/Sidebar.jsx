import Calendar from "react-calendar";
// import 'react-calendar/dist/Calendar.css';

const Sidebar = () => {
    let today = new Date()

    return <>
        <div className="">
            <div className="">
                <h1>Calendar</h1>
                <Calendar value={today}/>
            </div>
        </div>
    </>

}

export default Sidebar