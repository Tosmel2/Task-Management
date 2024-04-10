import BoardNavbar from "../components/BoardNavbar";
import Sidebar from "../components/Sidebar";
import { useState, useEffect } from "react";
import Cookies from "universal-cookie";

const EditTask = () => {
    const [taskName, setTaskName] = useState("")
    const [endDate, setEnddate] = useState()
    const [category, setCategory] = useState()
    const [categoryList, setCategoryList] = useState([])
    const[status, setStatus] = useState(false)
    const[statuspop, setStatusPop] = useState(true)
    const[text, setText] = useState("")
    
    const cookies = new Cookies();
    let token = cookies.get("TOKEN")
    let taskid = cookies.get("TASK_ID")
    console.log(taskid)


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
            await fetch(`https://tasky-management.onrender.com/api/v1/users/updatetask/${taskid}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    taskName: taskName,
                    endTime: endDate,
                    category: category
                })
                

            }).then((response) => response.json())
            .then((data) => {
                console.log(token)
                console.log(data)
                setStatusPop(false)
                setText("Task edited Successfully")
                setTimeout(() => {
                    setStatusPop(true)
                    window.location.reload()
                  }, 3000);
            })
        }catch(error){
            console.log(error.message)
        }
    }
    
    console.log(categoryList)
    return<>
    <BoardNavbar/>
    <Sidebar/>
    {
            !status ? 
            <div className="">
                <h3>Loading...</h3>
            </div>

            :
        
        <div className="">
            <div className={!statuspop ? Style.loadingpop : Style.hide}>
                <h3>{text}</h3>
            </div>
            <h1>Edit Task</h1>
            <div className="">
                <form action="" method="post" onSubmit={(e) => handleSubmit(e)}>
                    <div className="">
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
                        <option value=""></option>
                        <option value="Perosnal">Personal</option>
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

export default EditTask