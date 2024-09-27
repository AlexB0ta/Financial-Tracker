import express from 'express';
import bodyParser from 'body-parser';
import pg from 'pg';

app.use(bodyParser.json());

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "FinancialTracker",
    password: "anaaremere",
    port: 5432,
});

app.get('/', (req, res) => {})

app.post('/', (req, res) => {})

app.listen(8080, function(err){
    if (err) console.log("Error in server setup")
    console.log("Server listening on Port: 8080");
})