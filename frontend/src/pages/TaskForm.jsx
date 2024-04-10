// import BoardNavbar from "../components/BoardNavbar";
import Sidebar from "../components/Sidebar";
import { useState, useEffect } from "react";
import Cookies from "universal-cookie";

const TaskForm = () => {
    const [taskName, setTaskName] = useState("")
    const [endDate, setEnddate] = useState()
    const [category, setCategory] = useState()
    const [categoryList, setCategoryList] = useState([])
    const[status, setStatus] = useState(false)
    const[statuspop, setStatusPop] = useState(true)
    const[text, setText] = useState("")
    
    const cookies = new Cookies();
    let token = cookies.get("TOKEN")

    useEffect(() => {
        const fetchData = async () => {
            await fetch("https://aya-task-management.onrender.com/api/v1/users/category", {
                  method: "get",
                  headers: {
                      Authorization: `Bearer ${token}`
                  },
                })
                .then((response) => response.json())
                .then((data) => {
                  setCategoryList(data.data)
                  setStatus(true)
                  setText("")
              })
              .catch((error) => {
                console.log(error)
              })
        }

        fetchData()
    }, [token])


    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatusPop(false)
        setText("Loading, Please wait")

        try{
            await fetch("https://aya-task-management.onrender.com/api/v1/users/task", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    taskName: taskName,
                    isCompleted: false,
                    endTime: endDate,
                    category: category
                })
                

            }).then((response) => response.json())
            .then((data) => {
                setText("Task Added Successfully")
                setTimeout(() => {
                    setStatusPop(true)
                    window.location.reload()
                }, 3000);
            })
        }catch(error){
            setText(error.message)
        }
    }
    
    return<>
    {/* <BoardNavbar/> */}
    <Sidebar/>
            <div className={!statuspop ? Style.loadingpop : Style.hide}>
                <h3>{text}</h3>
            </div>
    {
            !status ? 
            <div className={Style.loading}>
                <h3>Loading...</h3>
            </div>

            :
        

        <div className="">
            <h1>Add Task</h1>
            <div className="">
                <form action="" method="post" onSubmit={(e) => handleSubmit(e)}>
                    <div className={Style.inputWrapper}>
                        <label htmlFor="fnm">Task Name:</label>
                        <input type="text" name="fnm" id="fnm" required value={taskName} onChange={(e) => setTaskName(e.target.value)}/>
                    </div>
                    <div className="">
                        <label htmlFor="edate">Task Time:</label>
                        <input type="datetime-local" name="edate" id="edate" required  value={endDate} onChange={(e) => setEnddate(e.target.value)}/>
                    </div>
                    
                    <div className="">
                        <label htmlFor="category">Category:</label>
                        <select name="categories" id="" onChange={(e) => setCategory(e.target.value)} required>
                        <option value = ""></option>
                        <option value="Personal">Personal</option>
                        <option value="Work">Work</option>
                            {
                                categoryList.map((data, index) => {
                                    return(
                                        <option value={data.categoryname} key={index}>{data.categoryname}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    
                    <div className="">
                        <button type="submit">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    }
    </>

}

export default TaskForm