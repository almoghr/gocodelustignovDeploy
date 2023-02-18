import { Todo } from "../models/Todo";

export const addTodoService = (todoTitle) => {
    return createdTodo = new Todo(todoTitle)
}

export const getAllTodosService = () => {
    return Todo.find({})
}

export const getOneTodoService = (id) => {
    return Todo.findOne({_id:id})
}

export const deleteTodoService = (id) => {
    return Todo.findOneAndDelete({_id: id})
}

export const updateTodoService = (id, updateTodo) => {
    return Todo.findOneAndUpdate({_id:id}, updateTodo, {new:true})
}