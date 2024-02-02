const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;
const front_url = "http://127.0.0.1:5500/frontend/index.html";

const connection = mysql.createConnection({
    user: "root",
    //password: "root",
    host: "localhost",
    database: "library",
});

const newOrder = (req, res) => {
    const order = {
        book: req.body.book,
        author: req.body.author,
        lend_date: req.body.lend,
        return_date: req.body.return,
    };
    
    let query = "INSERT INTO Books(book_name, author, lend_date, return_date) VALUE";
    query += `("${order.book}", "${order.author}", "${order.lend_date}", "${order.return_date}")`;

    connection.query(query, (err, result) => {
        if (err) res.json(err);
        else res.redirect(front_url);
    });
}

const read = (req, res) => {
    connection.query("SELECT * FROM Books ORDER BY id DESC;", (err, result) => {
        if (err) res.json(err);
        else res.json(result);
    });
}

const deleteOrder = (req, res) => {
    const id = req.params.id;
    let query = `DELETE FROM Books WHERE id = ${id};`;
    connection.query(query, (err, result) => {
        if (err) res.json(err);
        else res.redirect(front_url);
    });
}

const updateOrder = (req, res) => {
    const order = {
        id: req.body.id,
        book: req.body.book_name,
        author: req.body.author,
        lend_date: req.body.lend_date,
        return_date: req.body.return_date,
    };

    let query = ` UPDATE Books SET
        book_name = '${order.book}',
        author = '${order.author}',
        lend_date = '${order.lend_date}',
        return_date = '${order.return_date}'
        WHERE id = ${order.id};
    `;
    connection.query(query, (err, result) => {
        if (err) res.json(err);
        //else res.redirect(front_url);
    });
}

const getBook = (req, res) => {
    const query = `SELECT * FROM Books WHERE id = ${req.params.id}`;
    connection.query(query, (err, rows, fields) => {
        if (err) req.json(err);
        else res.send(rows);
    });
}

connection.connect((err => {
    if (err) res.json(err);
    console.log("MySQL Connected");
}));

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.post("/books", newOrder);
app.get("/books", read);
app.get("/books/(:id)", getBook);

app.get("/delete/(:id)", deleteOrder);
app.post("/update", updateOrder);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
