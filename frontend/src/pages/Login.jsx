import register from "../images/register.svg"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import Cookies from "universal-cookie"

const Login = () => {

    const[user, setUser] = useState({
        email: "",
        password: ""
    })
    const[status, setStatus] = useState(true)
    const[text, setText] = useState("")
    const navigate = useNavigate()
    const cookies = new Cookies();

    const handleSubmit = async (e) => {
        setStatus(false)
        e.preventDefault();
        setText("Loading, Please wait")
        // setStatus(false)

        try{
            await fetch("https://tasky-management.onrender.com/api/v1/users/login", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: user['email'],
                    password: user['password'].toString()
                })
                

            }).then((response) => response.json())
            .then((data) => {
                console.log(data)
                console.log(data.status)
                if(data.status !== "success"){
                    setStatus(false)
                    setText(data.message)
                    setTimeout(() => {
                        setStatus(true)
                    }, 3000)
                }
                console.log(data.status)
                cookies.set("TOKEN", data.data.token, {path: "/"})
                if(data.status === "success"){
                    setUser({
                        email: "",
                        password: ""
                    })
                    // setStatus(true)
                    setText("Login Successfull")
                    setTimeout(() => {
                        setStatus(true)
                        navigate("/overview")
                      }, 3000);

                    
                }
            })
        }catch(error){
            console.log(error.message)
        }
    }
    
    
    return <>
        <div className={!status ? Style.loading : Style.hide}>
            <h3>{text}</h3>
        </div>
        <div className={Style.wrapper}>
            <div className={Style.leftWrapper}>
                <div className={Style.formWrapper}>
                    <div className={Style.head}>
                        <h2>Login</h2>
                        <p>Don't have an account? <a href="register">Create an account</a></p>
                    </div>
                    <form action="" method="post" onSubmit={(e) => handleSubmit(e)}>
                        <div className="">
                            <label htmlFor="eml">Email Address:</label>
                            <input type="text" name="eml" id="eml"  value = {user['email']} onChange={(e) => setUser({...user, email: e.target.value})} required disabled = {!status ? true : false}/>
                        </div>
                        <div className="">
                            <label htmlFor="psw">Password:</label>
                            <input type="password" name="psw" id="psw" value = {user['password']} onChange={(e) => setUser({...user, password: e.target.value})} required disabled = {!status ? true : false} />
                        </div>
                        <div className={Style.inputWrapper}>
                            <button type="submit" className={!status ? Style.disabled : Style.button} disabled = {!status ? true : false}>Submit</button>
                        </div>
                    </form>
                </div>
            </div>

            <div className="">
                <img src={register} alt="Registeration svg" />
            </div>
        </div>
    </>

}

export default Login