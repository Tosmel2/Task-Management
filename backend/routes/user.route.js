import { deleteASpecificUser, getAllUsers, getSpecificUser, updateUserDetails, updateUserPassword, userLogin, userRegister } from "../controller/user.controller.js";
import express from "express";
import { isAuth } from "../middleware/isAuth.js";
import { createTask, deletTask, editTaskComplete, editTask, getAllTask, getAllTask } from "../controller/task.controller.js";
import { createCategory, deletCategory, getAllCategories } from "../controller/category.controller.js";

const userRoute = express.Router();

// Create a new User
userRoute.post("/register", userRegister);

// Verify User Login Details
userRoute.post("/login", userLogin);

// Get a specific user
userRoute.get("/specificUser", isAuth, getSpecificUser);

// Get a specific user categories
userRoute.get("/category", isAuth, getAllCategories);

// Get all users
userRoute.get("", getAllUsers);

// get all task for a logged in user
userRoute.get("/task",isAuth, getAllTask);

// get all task for 
userRoute.get("/taskandcategory/:category", isAuth, getAllTasktoCategory);

// Update User details
userRoute.put("/update",isAuth, updateUserDetails);

// Update Task details
userRoute.put("/updatetask/:id", editTask);

// Update Task details
userRoute.put("/updatetaskcomplete/:id", editTaskComplete);

// delete Task details
userRoute.delete("/deletetask/:id", deletTask);

// delete Task details
userRoute.delete("/deletecategory/:id", deletCategory);

// update user password
userRoute.put("/updatepassword",isAuth, updateUserPassword);

// Delete a specific User
userRoute.delete("/delete", deleteASpecificUser);

// add task for a logged in user
userRoute.post("/task", isAuth, createTask);

// add a new category for logged in user
userRoute.post("/category", isAuth, createCategory);


export default userRoute;