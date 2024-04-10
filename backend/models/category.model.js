import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    categoryname: {
        type: String,
        required: [true, "Category name is required"]
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
},
{
    timestamps: true,
    toJson: {virtuals: true}
})

const Category = mongoose.model("Category", categorySchema)

export default Category