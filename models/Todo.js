import mongoose from "mongoose"

const todoSchema = new mongoose.Schema({
    title:{
      type: String,
      required: true
    },
    isDone:{
      type: Boolean,
      default:false
    },
    dateCreated:{
      type: Date,
      default: Date.now()
    }
  })
  
  export const Todo = mongoose.model('Todo', todoSchema)
  