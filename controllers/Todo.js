import { addTodoService, getAllTodosService, getOneTodoService, deleteTodoService } from "../services/Todo";

export const addTodoController = async (req, res) => {
    try{
      const todoTitle = { ...req.body };
      const createdTodo = addTodoService(todoTitle)
      await createdTodo.save()
      res.send(createdTodo);
  
    }catch(e){
      console.log(e)
      res.status(500).send(e.message)
    }
  }

  export const getAllTodosController = async (req,res) => {
    try{
      const todos = await getAllTodosService()
      res.send(todos)
    } catch(e){
      console.log(e)
      res.status(500).send(e.message)
    }
  }

  export const getOneTodoController =  async(req,res) => {
    try{
      const {todoId} = req.params
      const singleTodo = await getOneTodoService(todoId)
      if(!singleTodo){
        res.status(404).send({message: "no such todo with the specific id"})
      }
      res.send(singleTodo)
    } catch(e){
      console.log(e)
      res.send(e.message)
    }
  }

  export const updateTodoController = async(req,res) => {
    try{
      const {todoId} = req.params
  
      const singleTodo = await getOneTodoService(todoId)
  
      if(!singleTodo){
        res.status(404).send({message: "no such todo with the specific id"})
      }
  
      singleTodo.isDone = true;
      await singleTodo.save()
  
      res.send(singleTodo)
    } catch(e){
      console.log(e)
      res.send(e.message)
    }
  }

  export const deleteTodoController =  async(req,res) => {
    try{
      const {todoId} = req.params
      const singleTodo = await deleteTodoService(todoId)
      if(!singleTodo){
        res.status(404).send({message: "no such todo with the specific id"})
      }
      res.send(singleTodo)
    } catch(e){
      console.log(e)
      res.send(e.message)
    }
  }