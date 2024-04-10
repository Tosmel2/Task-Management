// import BoardNavbar from "../components/BoardNavbar";
import Sidebar from "../components/Sidebar";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom"

const Settings = () => {
    const cookies = new Cookies()
    let token = cookies.get("TOKEN")
    const [firstname, setFirstname] = useState()
    const [lastname, setLastname] = useState()
    const [othername, setOthername] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [cpassword, setCPassword] = useState()
    const [status, setStatus] = useState(false)
    const [statuspop, setStatusPop] = useState(true)
    
    const navigate = useNavigate()


    useEffect(() => {
        const fetchData = async () => {
            await fetch("https://tasky-management.onrender.com/api/v1/users/specificUser", {
                  method: "get",
                  headers: {
                      Authorization: `Bearer ${token}`
                  },
                })
                .then((response) => response.json())
              .then((data) => {
                console.log(data)
                  console.log(data.data.foundUser.firstname)
                  console.log(token)
                  setFirstname(data.data.foundUser.firstname)
                  setLastname(data.data.foundUser.lastname)
                  setOthername(data.data.foundUser.othername)
                  setEmail(data.data.foundUser.email)
                  setStatus(true)
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

        try{
            await fetch("https://tasky-management.onrender.com/api/v1/users/update", {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    firstname: firstname,
                    lastname: lastname,
                    othername: othername,
                    email: email
                })
                

            }).then((response) => response.json())
            .then((data) => {
                console.log(data)
                setStatusPop(true)
                alert("Data change Successfull")
                window.location.reload()
            })
        }catch(error){
            alert(error.message)
        }
    }

    const updatePassword = async (e) => {
        e.preventDefault();
        setStatusPop(false)

        if(password !== cpassword){
            alert("Password does not match")
            setStatusPop(true)
        }
        else{
            try{
                await fetch("https://tasky-management.onrender.com/api/v1/users/updatepassword", {
                    method: "PUT",
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        password: password
                    })
                    
    
                }).then((response) => response.json())
                .then((data) => {
                    console.log(data)
                    alert("Password changed Successfully")
                    setStatusPop(true)
                    navigate("/login")
                })
            }catch(error){
                console.log(error.message)
            }
        }
    }


    return <>

        <BoardNavbar/>
        <Sidebar/>
        {
            !status ? 
            <div className={Style.loading}>
                <h3>Loading...</h3>
            </div>

            :
        
        <div className="">
            <div className={!statuspop ? Style.loadingpop : Style.hide}>
                <h3>Loading...</h3>
            </div>
            <div className="">
                <h1>Account Details</h1>
                <form action="" method="put" onSubmit={(e) => handleSubmit(e)}>
                <div className="">
                            <label htmlFor="fnm">First Name:</label>
                            <input type="text" name="fnm" id="fnm"  value = {firstname} onChange={(e) => setFirstname(e.target.value)}  required/>
                        </div>
                        <div className="">
                            <label htmlFor="lnm">Last Name:</label>
                            <input type="text" name="lnm" id="lnm"  value = {lastname} onChange={(e) => setLastname(e.target.value)}  required/>
                        </div>
                        <div className="">
                            <label htmlFor="onm">Other Name:</label>
                            <input type="text" name="onm" id="onm"   value = {othername} onChange={(e) => setOthername(e.target.value)} />
                        </div>
                        <div className="">
                            <label htmlFor="eml">Email Address:</label>
                            <input type="text" name="eml" id="eml"   value = {email} onChange={(e) => setEmail(e.target.value)}  required/>
                        </div>
                        <div className="">
                            <button type="submit">Submit</button>
                        </div>
                </form>
            </div>

            <div className="">
                <h1>Password</h1>
                <form action="" method="put" onSubmit={(e) => updatePassword(e)}>
                    <div className="">
                        <label htmlFor="cpsw">New Password:</label>
                        <input type="password" name="cpsw" id="cpsw"   value = {password} onChange={(e) => setPassword(e.target.value)}  required/>
                    </div>
                    <div className="">
                        <label htmlFor="cpsw">Confirm Password:</label>
                        <input type="password" name="cpsw" id="cpsw"   value = {cpassword} onChange={(e) => setCPassword(e.target.value)}  required/>
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

export default Settings