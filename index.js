import express from "express";
import mongoose from 'mongoose'
import dotenv from "dotenv"
dotenv.config()
const { PORT, DB_USER,DB_PASS,DB_HOST,DB_NAME } = process.env
const app = express();




mongoose.set('strictQuery', true)
app.use(express.json());
app.use(express.static("client/build"))

//MODEL
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

// const productSchema = new mongoose.Schema({
//   price:{
//     type: Number,
//     required:true
//   },
//   title:{
//     type:String,
//     required:true
//   },
//   img:{
//     type:String,
//     required:true
//   },
//   dateCreated:{
//     type:Date,
//     default:Date.now()
//   },
//   category:{
//     type:String,
//     required:true
//   }
// })
const Todo = mongoose.model('Todo', todoSchema)
// const Product = mongoose.model('Product', productSchema)


// app.get("/api/greeting", (req, res) => {
//   res.send("Hello World!");
// });
// app.get("/api/product/:productId/", (req, res) => {
//   const params = req.params;
//   console.log(params);
//   res.send(params.productId);
// });
// app.get("/api/calculator", (req, res) => {
//   const { a, b } = req.query;
//   const sum = parseInt(a) + parseInt(b);
//   if (req.query.requestor.toLowerCase() === "tictac") {
//     console.log("hello there");
//   }
//   res.send(`the answer is ${sum}`);
// });

// app.post("/api/addProduct", (req, res) => {
//   const newProduct = { ...req.body };
//   res.send(newProduct);
// });
// app.put("/api/editProduct/:productId", (req, res) => {
//   const { productId } = req.params;
//   const obj = {
//     title: "necklace",
//     price: "500",
//     description: "24k Gold Necklace",
//     isForFemales: true,
//   };
//   const newProductProperties = { ...req.body };
//   const newProductAfterMerge = { ...obj, ...newProductProperties };
//   res.send(newProductAfterMerge);
// });

// app.delete("/api/deleteProduct/:productId", (req, res) => {
//   const arrayOfObj = [
//     {
//       id: 1,
//       title: "necklace",
//       price: "500",
//       description: "24k Gold Necklace",
//       isForFemales: true,
//     },
//     {
//       id: 2,
//       title: "necklace",
//       price: "500",
//       description: "24k Gold Necklace",
//       isForFemales: true,
//     },
//     {
//       id: 3,
//       title: "necklace",
//       price: "500",
//       description: "24k Gold Necklace",
//       isForFemales: true,
//     },
//     {
//       id: 4,
//       title: "necklace",
//       price: "500",
//       description: "24k Gold Necklace",
//       isForFemales: true,
//     },
//     {
//       id: 5,
//       title: "necklace",
//       price: "500",
//       description: "24k Gold Necklace",
//       isForFemales: true,
//     },
//   ];

//   const { productId } = req.params;
//   const productIndex = arrayOfObj.findIndex(
//     (p) => p.id === parseInt(productId)
//   );
//   const clone = [...arrayOfObj];
//   if (productIndex === -1) {
//     res.send({
//       error:
//         "you have sent a wrong id of a product, there is no such product with this id",
//       clone,
//     });
//   }
//   clone.splice(productIndex, 1);
//   res.send(clone);
// });

app.post("/api/addTodo", async (req, res) => {
  try{
    const todoTitle = { ...req.body };
    const createdTodo = new Todo(todoTitle)
    await createdTodo.save()
    res.send(createdTodo);

  }catch(e){
    console.log(e)
    res.status(500).send(e.message)
  }
});

app.get("/api/todos", async (req,res) => {
  try{
    const todos = await Todo.find({})
    res.send(todos)
  } catch(e){
    console.log(e)
    res.status(500).send(e.message)
  }
})
app.get("/api/todo/:todoId", async(req,res) => {
  try{
    const {todoId} = req.params
    const singleTodo = await Todo.findOne({_id: todoId})
    if(!singleTodo){
      res.status(404).send({message: "no such todo with the specific id"})
    }
    res.send(singleTodo)
  } catch(e){
    console.log(e)
    res.send(e.message)
  }
})

app.put("/api/updateTodo/:todoId", async(req,res) => {
  try{
    const {todoId} = req.params

    const singleTodo = await Todo.findOne({_id: todoId})

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
})
app.delete("/api/deleteTodo/:todoId", async(req,res) => {
  try{
    const {todoId} = req.params
    const singleTodo = await Todo.findOneAndDelete({_id: todoId})
    if(!singleTodo){
      res.status(404).send({message: "no such todo with the specific id"})
    }
    res.send(singleTodo)
  } catch(e){
    console.log(e)
    res.send(e.message)
  }
})

app.get("*", (req, res) => {
  res.sendFile(__dirname + "/client/build/index.html");
});

// mongoose.connect("mongodb://localhost:27017/todos", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });


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