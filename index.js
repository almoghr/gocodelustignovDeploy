import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import {
  getAllTodosController,
  getOneTodoController,
  updateTodoController,
  deleteTodoController,
  addTodoController,
} from "./controllers/Todo";
dotenv.config();
const { PORT, DB_USER, DB_PASS, DB_HOST, DB_NAME } = process.env;
const app = express();

mongoose.set("strictQuery", true);
app.use(express.json());
app.use(express.static("client/build"));

//MODEL
app.post("/api/addTodo", addTodoController);
app.get("/api/todos", getAllTodosController);
app.get("/api/todo/:todoId", getOneTodoController);
app.put("/api/updateTodo/:todoId", updateTodoController);
app.delete("/api/deleteTodo/:todoId", deleteTodoController);

app.get("*", (req, res) => {
  res.sendFile(__dirname + "/client/build/index.html");
});


mongoose.connect(
  `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    app.listen(PORT || 8000, () => {
      console.log("err", err);
      console.log("Ani maazin!");
    });
  }
);
