import Users from "../model/User.js";
import bcrypt from "bcrypt";
import generateToken from "../util/generateToken.js";
import Tasks from "../models/tasks.model.js"

export const userRegister = async(req, res) => {
    const{firstname, lastname, othername, email, password} = req.body;

    try{
        const userFound = await Users.findOne({email});

        if(userFound){
            res.json({
                status: "error",
                data: "User Already Exists"
            })
        }

        const salt = await bcrypt.genSalt(5);
        const passwordHash = await bcrypt.hash(password, salt)
        
        const User = await Users.create({
            firstname,
            lastname,
            othername,
            email,
            password: passwordHash
        })

        res.json({
            status: "success",
            data: User
        })
    }catch(error){
        res.json(error.message)
    }
}

export const userLogin = async(req, res) => {
    const {email, password} = req.body;

    try{
        const userFound = await Users.findOne({email});

        if(!userFound){
            res.json({
                status: "error",
                message: "Wrong Login details"
            })
        }

        const passwordFound = await bcrypt.compare(password, userFound.password)
        if(!passwordFound){
            res.json({
                status: "error",
                message: "Incorrect Password"
            })
        }else{
            res.json({
                status: "success",
                data: {
                    userFound,
                    token: generateToken(userFound._id)
                }
            })
        }
    }catch(error){
        res.json({
            status: "error",
            message: error.message
        })
    }
}

export const getAllUsers = async(req, res) => {
    
    try{
        const allUsers = await Users.find();

        res.json({
            status: "success",
            data: allUsers
        })

    }catch(error){
        res.json({
            status: "error",
            message: "An error occured"
        })
    }

    
}

export const getSpecificUser = async(req, res) => {
    try{
        console.log(req.userAuth);
        const foundUser = await Users.findById(req.userAuth);
        if(foundUser){
            res.json({
                status: "Success",
                data: {foundUser}
            });
        }else{
            res.json({
                status: "Success",
                message: "User with such id does not exist"
            });
        }
    }catch(error){
        res.json(error.message)
    }
}

export const updateUserDetails = async(req, res) => {
    try{

        await Users.updateOne(req.userAuth, {
            $set: {
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                othername: req.body.othername,
                email: req.body.email,
                task: Tasks.find(req.userAuth)
                
            }
            
        },{
            new: true
        })
        res.json({
            status: "success",
            data: "Updated Successfully"
        })

    }catch(error){
        res.json({
            status: "error",
            message: error.message
        })
    }
}

export const updateUserPassword = async(req, res) => {
    try{
        // const userFound = await Users.findById(req.UserAuth);

        const salt = await bcrypt.genSalt(5);
        const passwordHash = await bcrypt.hash(req.body.password, salt)

        await Users.findByIdAndUpdate(req.userAuth, {
            $set: {
                password: passwordHash,
            }
        },{
            new: true
        })

        res.json({
            status: "success",
            data: "password updated"
        })

    }catch(error){
        res.json({
            status: "error",
            message: error.message
        })
    }
}

export const deleteASpecificUser = async(req, res) => {
    await Users.findOneAndDelete(req._id);
}