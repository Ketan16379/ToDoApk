import express from "express";
import cors from "cors";
import pg from "pg";


const app = express();
const port = 5000;


const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "perntodo",
    password: "admin",
    port: 5342
});

db.connect();

//middleware
app.use(cors());
app.use(express.json());

//ROUTES//

//CREATE TODO   
app.post("/todos", async(req, res) => {
    try{
        const {description} = req.body;
        const newTodo = await db.query("INSERT INTO todo (description) VALUES ($1) RETURNING*", [description]);
        res.json(newTodo);
    }catch(err){
        console.log(err.message);
    }
})
//GET ALL TODO
app.get("/todos", async(req, res) => {
    try{
        const allTodos = await db.query("SELECT * FROM todo");
        res.json(allTodos.rows);
    }
    catch(err){
        console.log(err.message);
    }

})

//GET A TODO

app.get("/todos/:id", async(req, res) =>{
    try {
        const { id } = req.params;
        const todo = await db.query("SELECT * FROM todo WHERE todo_id = $1", [id]); 
        res.json(todo.rows[0]);
    } catch (err) {
        console.log(err.message);
    }
})

//UPDATE A TODO

app.put("/todo/:id", async(req, res) => {
    try {
       const { id } = req.params;
       const { description } = req.body;
       const updateTodo = await db.query("UPDATE todo SET description = $1 WHERE todo_id = $2", [description, id]);
       res.json("todo was updated!")
    } catch (err) {
        console.log(err.message);
    }
})


//DELETE A TODO

app.delete("/todos/:id", async(req, res) => {
    try {
        const { id } = req.params;
        const deleteTodo = await db.query("DELETE FROM todo WHERE todo_id = $1", [id]);
        res.json("todo was deleted!")
    } catch (err) {
        console.log(err.message);
    }
})

app.listen(port, () => {
    console.log(`sever running on: ${port}`);
})