import mongoose from "mongoose";

const tasksSchema = new mongoose.Schema({
    taskName: {
        type: String,
        required: [true, "Your task require a name"]
    },
    isCompleted: {
        type: Boolean,
        default: false
    },
    endTime: {
        type: Date,
        // required: [true, "Please enter thetsk end time"
    },
    category: {
        type: String,
        required: [true, "Please add Category"]
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
},
{
    timestamps: true,
    toJSON: {virtuals: true}
}) 

const Tasks = mongoose.model("Tasks", tasksSchema);

export default Tasks;