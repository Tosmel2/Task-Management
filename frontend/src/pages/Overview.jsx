import BoardNavbar from "../components/BoardNavbar";
import Sidebar from "../components/Sidebar";
import {ImDropbox} from "react-icons/im"
import {BsBoxArrowInDownLeft} from "react-icons/bs"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import Cookies from "universal-cookie";
import {FiEdit3} from "react-icons/fi"
import {AiOutlineDelete} from "react-icons/ai"


const Overview = () => {

    const[categories, setCategories] = useState([])
    const[categoryname, setCategoryName] = useState([])
    const[task, setTask] = useState([])
    const[redirect, setRedirect] = useState(false)
    const[checked, setChecked] = useState(false)
    const [status, setStatus] = useState(false)
    const[text, setText] = useState("")
    const[statuspop, setStatusPop] = useState(true)

    const navigate = useNavigate()
    const cookies = new Cookies();
    let token = cookies.get("TOKEN")

    useEffect(() => {
        const fetchData = async () => {
            await fetch("https://tasky-management.onrender.com/api/v1/users/category", {
                  method: "get",
                  headers: {
                      Authorization: `Bearer ${token}`
                  },
                })
                .then((response) => response.json())
              .then((data) => {
                console.log(data)
                if(data.status === "Failed"){
                    navigate("/login")
                    window.location.reload()
                }
                  setCategories(data.data)
                  setStatus(true)
              })
              .catch((error) => {
                console.log(error)
              })
        }

        fetchData()
    }, [token, navigate])


    const getTasks = async (category) => {
        setCategoryName(category)
        setStatus(false)

        try{
            await fetch(`https://tasky-management.onrender.com/api/v1/users/taskandcategory/${category}`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
                

            }).then((response) => response.json())
            .then((data) => {
                console.log(data.data)
                setTask(data.data)
                setRedirect(true)
                setStatus(true)
            })
        }catch(error){
            console.log(error)
        }
    }

    const updateTaskCompletion = async (e, id) => {
        setChecked(e.target.checked)
        // window.location.reload()
        console.log(e.target.checked)
        console.log(checked)
        console.log(id)
        try{
            await fetch(`https://tasky-management.onrender.com/api/v1/users/updatetaskcomplete/${id}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    isCompleted: e.target.checked 
                })
                
                
            }).then((response) => response.json())
            .then((data) => {
                window.location.reload()
                console.log(data.isCompleted)
                setRedirect(true)
            })
        }catch(error){
            console.log(error.message)
        }
    }

    const Edit = (id) => {
        cookies.set("TASK_ID", id, {path: "/"})
        navigate("/overview/edittask")
    }

    const Delete = async(id) => {
        try{
            await fetch(`https://tasky-management.onrender.com/api/v1/users/deletetask/${id}`, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json'
                }
                

            }).then((response) => response.json())
            .then((data) => {
                setStatusPop(false)
                setText("Task Deleted Successfully")
                window.location.reload()
            })
        }catch(error){
            console.log(error.message)
        }
    }

    const deleteCategory = async(id) => {
        try{
            await fetch(`https://tasky-management.onrender.com/api/v1/users/deletecategory/${id}`, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json'
                }

            }).then((response) => response.json())
            .then((data) => {
                setStatusPop(false)
                setText("Category Deleted Successfully")
                setTimeout(() => {
                    window.location.reload()
                  }, 3000);
            })
        }catch(error){
            console.log(error.message)
        }
    }


    // const taskList = task
    return <>
        <BoardNavbar/>
        <Sidebar/>

        {
            !status ? 
            <div className={Style.loading}>
                <h3>Loading...</h3>
            </div> :
        
        <div className={!redirect ? Style.hero : Style.hide}>
            <div className={!statuspop ? Style.loadingpop : Style.hide}>
                    <h3>{text}</h3>
            </div>
            <div className={Style.emptyWrapper}>
                <div className={Style.wrap}>
                    <ImDropbox/>
                    <h1>No Task Currently</h1>
                </div>
            </div>
            <div className={Style.taskWrapper}>
                <div className={Style.taskBox}>
                    <div className={Style.taskHead}>
                        <h3>Personal</h3>
                        <BsBoxArrowInDownLeft  onClick={() => getTasks("Personal")}/>
                    </div>
                    <div className={Style.taskBottom}>
                        <p><span>Created: </span> ---</p>
                    </div>
                </div>
                <div className={Style.taskBox}>
                    <div className={Style.taskHead}>
                        <h3>Work</h3>
                        <BsBoxArrowInDownLeft  onClick={() => getTasks("Work")}/>
                    </div>
                    <div className={Style.taskBottom}>
                        <p><span>Created: </span> ---</p>
                    </div>
                </div>
                {
                    categories.map((data, index) => {
                        return(
                            <div className="" key={index}>
                                <div className={Style.taskHead}>
                                    <h3>{data.categoryname}</h3>
                                    <BsBoxArrowInDownLeft onClick={() => getTasks(data.categoryname)}/>
                                </div>
                                <div className={Style.taskBottom}>
                                    <p><span>Created: </span> {data.createdAt.split("T")[0]}</p>
                                    <AiOutlineDelete onClick={() => deleteCategory(data._id)}/>
                                </div>
                            </div>

                        )
                    })
                }
            </div>
        </div>
        }

        {
            !status ?
            <div className="">
                <h3>Loading...</h3>
            </div> : 
        
        <div className={redirect ? Style.show : Style.hide}>
            <div className={Style.taskhero}>
                <h2>{categoryname} <span onClick={() => setRedirect(false)}>Back</span></h2>
                <div className={!task.length <= 0 ? Style.tasks : Style.hide}>
                    {
                        task.map((data, index) => {
                            const endTime = new Date(data.endTime.split(".")[0]) / 1000
                            var elapsed = new Date() / 1000;
                            var totalSec =  endTime - elapsed;
                            var h = parseInt( totalSec / 3600 )
                            var m = parseInt( totalSec / 60 ) % 60;
                            var s = parseInt(totalSec % 60, 10);
                            var result = h + " hours, " + m + " minutes " + s + " seconds";

                            return(
                                <div className={Style.task} key={index}>
                                    <div className="">
                                        <form action="" method="post">
                                            <input type="checkbox" name="isCompleted" id="" checked={data.isCompleted  ? true : false} onChange={(e) => updateTaskCompletion(e, data._id)}/>
                                        </form>
                                        <h3 className={!data.isCompleted ? Style.norm : Style.cancel}>{data.taskName}</h3>
                                        <div className={Style.timeWrap}>
                                            <p>Time Left: <span>{!data.isCompleted ? result : "0.0.0"}</span></p>
                                        </div>
                                    </div>
                                    <div className="">
                                        <FiEdit3 onClick={() => Edit(data._id)}/>
                                        <AiOutlineDelete onClick={() => Delete(data._id)}/>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
        }

    </>

}
export default Overview