import register from "../images/register.svg"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

const Register = () => {
    const[user, setUser] = useState({
        firstname: "",
        lastname: "",
        othername: "",
        email: "",
        password: "",
        cpassword: ""
    })
    const[PswError, setPswError] = useState("")
    const[status, setStatus] = useState(true)
    const navigate = useNavigate()
    const [text, setText] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault();
        setPswError("")
        setStatus(false)
        setText("Loading, Please wait")

        if(user['password'] !== user['cpassword']){
            setPswError("Password does not match")
        }else{
            try{
                let res = await fetch("https://tasky-management.onrender.com/api/v1/users/register", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        firstname: user['firstname'],
                        lastname: user['lastname'],
                        othername: user['othername'],
                        email: user['email'],
                        password: user['password']
                    })
                    

                });
                let resJson = await res.json();
                if(resJson.status === "error"){
                    setText(resJson.data)
                    setTimeout(() => {
                        setStatus(true)
                      }, 3000);
                }else if(res.status === 200){
                    console.log(user['password'])
                    setUser({
                        firstname: "",
                        lastname: "",
                        othername: "",
                        email: "",
                        password: ""
                    })
                    setText("Successfull, You will be redireted shortly")
                    setTimeout(() => {
                        setStatus(true)
                        navigate("/login")
                      }, 3000);
                }
            }catch(error){
                console.log(error.message)
            }
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
                        <h2>Create An Account</h2>
                        <p>Already have an account? <a href="login">Login</a></p>
                    </div>
                    <form action="" method="post" onSubmit={(e) => handleSubmit(e)}>
                        <div className="">
                            <label htmlFor="fnm">First Name:</label>
                            <input type="text" name="fnm" id="fnm" value = {user['firstname']} onChange={(e) => setUser({...user, firstname: e.target.value})} required  disabled = {!status ? true : false}/>
                        </div>
                        <div className="">
                            <label htmlFor="lnm">Last Name:</label>
                            <input type="text" name="lnm" id="lnm" value = {user['lastname']} onChange={(e) => setUser({...user, lastname: e.target.value})} required disabled = {!status ? true : false}/>
                        </div>
                        <div className="">
                            <label htmlFor="onm">Other Name:</label>
                            <input type="text" name="onm" id="onm" value = {user['othername']} onChange={(e) => setUser({...user, othername: e.target.value})} disabled = {!status ? true : false}/>
                        </div>
                        <div className="">
                            <label htmlFor="eml">Email Address:</label>
                            <input type="text" name="eml" id="eml" value = {user['email']} onChange={(e) => setUser({...user, email: e.target.value})} required disabled = {!status ? true : false}/>
                        </div>
                        <div className="">
                            <label htmlFor="psw">Password:</label>
                            <input type="password" name="psw" id="psw" value = {user['password']} onChange={(e) => setUser({...user, password: e.target.value})} required disabled = {!status ? true : false}/>
                        </div>
                        <div className="">
                            <label htmlFor="cpsw">Confirm Password:</label>
                            <input type="password" name="cpsw" id="cpsw" value = {user['cpassword']} onChange={(e) => setUser({...user, cpassword: e.target.value})} required disabled = {!status ? true : false}/>
                            <p className={Style.error}>{PswError}</p>
                        </div>
                        <div className="">
                            <button type="submit" className={!status ? Style.disabled : Style.button}  disabled = {!status ? true : false}>Submit</button>
                        </div>
                    </form>
                </div>
            </div>

            <div className={Style.rightWrapper}>
                <img src={register} alt="Registeration svg" />
            </div>
        </div>
    </>

}

export default Register