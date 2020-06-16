const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

//middleware
app.use(cors());
app.use(express.json());

//ROUTES

// create board

app.post("/boards", async(req, res) => {
  try {
    const {title} = req.body;
    const newBoard = await pool.query("INSERT INTO board (title) VALUES($1) RETURNING *", [title]);
    res.json(newBoard.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
})

// get all boards

app.get("/boards", async(req, res) => {
  try {
    const allBoards = await pool.query("SELECT * FROM board");
    res.json(allBoards.rows);
  } catch (err) {
    console.error(err.message);
  }
})

app.get("/boards/:id", async(req, res) => {
  try {
    const {id} = req.params;
    const board = await pool.query("SELECT * FROM board WHERE board_id = $1", [id]);
    res.json(board.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
})

//updating

app.put("/boards/:id", async(req, res) => {
  try {
    const {id} = req.params;
    const { title } = req.body;
    const updateBoard = await pool.query("UPDATE board SET title = $1 WHERE board_id = $2 RETURNING *", [title, id]);
    res.json(updateBoard.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
})

app.listen(5000, () => {
  console.log("server started on port 5000")
})