import express from 'express';
import bodyParser from 'body-parser';
import 'dotenv/config'
import {createClient} from '@supabase/supabase-js'
import cors from 'cors';
import axios from 'axios';
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true
}

const supabase = createClient(process.env.DB_URL, process.env.DB_KEY);
//var shared between functions
let incomeSum = 0;
const API_KEY = "S9M6AWAZMYHJKIOA";
const JWT_SECRET = process.env.JWT_SECRET;

const app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors(corsOptions));

app.post('/addUser',async (req,res)=>{
    const {username, email, password} = req.body;

    const hashPassword = await bcrypt.hash(password, 10);

    const {error} = await supabase
        .from('Users')
        .insert({name: username, email: email, password: hashPassword})

    if(error){
        console.log(error);
        return res.status(400).send(error.message);
    }
    return res.status(200).send()
})

app.post('/login',async (req,res)=>{
    const {email, password} = req.body;
    const {data,error} = await supabase
        .from('Users')
        .select()
        .eq('email',email)
        .single();

    if(error){
        console.log(error);
        return res.status(400).send(error.message);
    }

    const verifyPass = await bcrypt.compare(password, data.password);

    if(verifyPass === false){
        return res.status(401).send({error: 'Invalid Credentials'});
    }

    const token = jwt.sign({id: data.id, email: data.email},JWT_SECRET,{expiresIn: '1h'});

    res.cookie('token',token,{
        httpOnly:true,
        secure:true,
        maxAge: 3600000 //1hour
    });

    res.status(200).send({message:"Successfully logged in"});
})

app.get('/getAllTransactions', async (req, res) => {
    const obj = {
        totalAmount: 0,
        totalIncome: 0,
        totalExpenses: 0,
        allTransactions: []
    }

    const {data, error2} = await supabase
        .from('Transactions')
        .select('*')

    if (error2) {
        return res.status(400).send();
    }
    obj.allTransactions = data;

    const total = data.reduce((accumulator, currentValue) => {
        if (currentValue.type === 'income')
            return accumulator + currentValue.amount;
        else
            return accumulator - currentValue.amount;
    }, 0)

    incomeSum = data.reduce((accumulator, currentValue) => {
        if (currentValue.type === 'income')
            return accumulator + currentValue.amount;
        else
            return accumulator;
    }, 0)

    const expenseSum = data.reduce((accumulator, currentValue) => {
        if (currentValue.type === 'expense')
            return accumulator + currentValue.amount;
        else
            return accumulator;
    }, 0);

    obj.totalAmount = total;
    obj.totalExpenses = expenseSum;
    obj.totalIncome = incomeSum;

    res.status(200).send(obj);
})

app.get('/getAllIncomes', async (req, res) => {
    const obj = {
        totalIncome: 0,
        allIncomes: []
    }

    const {data, error} = await supabase
        .from('Transactions')
        .select()
        .eq('type', 'income')

    if (error)
        return res.status(400).send();

    incomeSum = data.reduce((accumulator, currentValue) => {
        if (currentValue.type === 'income')
            return accumulator + currentValue.amount;
        else
            return accumulator;
    }, 0)

    obj.allIncomes = data;
    obj.totalIncome = incomeSum;

    res.status(200).send(obj);
})

app.get('/getAllExpenses', async (req, res) => {
    const obj = {
        totalExpenses: 0,
        totalIncome: incomeSum,
        allExpenses: []
    }

    const {data, error} = await supabase
        .from('Transactions')
        .select()
        .eq('type', 'expense')

    if (error)
        return res.status(400).send();

    obj.allExpenses = data;

    const expenseSum = data.reduce((accumulator, currentValue) => {
        return accumulator + currentValue.amount
    }, 0)
    obj.totalExpenses = expenseSum;
    obj.totalIncome = incomeSum;

    res.status(200).send(obj);
})

app.delete('/deleteExpense/:id', async (req, res) => {
    //console.log(req.params);
    const response = await supabase
        .from('Transactions')
        .delete()
        .eq('id', req.params.id)

    return res.status(response.status).send();
})

app.patch('/updateExpense', async (req, res) => {
    //console.log(req.body);
    const {data, error} = await supabase
        .from('Transactions')
        .update({
            description: req.body.description,
            amount: req.body.amount,
            category: req.body.category,
            created_at: req.body.date
        })
        .eq('id', req.body.id)

    if (error)
        return res.status(400).send();

    return res.status(200).send();

})

app.post('/addExpense', async (req, res) => {
    //console.log(req.body);
    const response = await supabase
        .from('Transactions')
        .insert({
            description: req.body.description,
            amount: req.body.amount,
            category: req.body.category,
            created_at: req.body.date,
            type: 'expense'
        })

    return res.status(response.status).send();
})

app.post('/addIncome', async (req, res) => {
    const response = await supabase
        .from('Transactions')
        .insert({
            description: req.body.description,
            amount: req.body.amount,
            category: req.body.category,
            created_at: req.body.date,
            type: 'income'
        })

    return res.status(response.status).send();
})

app.patch('/updateIncome', async (req, res) => {

    const {error} = await supabase
        .from('Transactions')
        .update({
            description: req.body.description,
            amount: req.body.amount,
            category: req.body.category,
            created_at: req.body.date
        })
        .eq('id', req.body.id)

    if (error)
        return res.status(400).send();

    return res.status(200).send();
})

app.delete('/deleteIncome/:id', async (req, res) => {
    const response = await supabase
        .from('Transactions')
        .delete()
        .eq('id', req.params.id)

    return res.status(response.status).send();
})

app.get('/getAllTransactions/filter', async (req, res) => {
    console.log(req.query)
    const {type, sortBy, ascending} = req.query;
    const isAscending = (ascending === 'true');

    const {data, error} = await supabase
        .from('Transactions')
        .select()
        .eq('type', type)
        .order(sortBy, {ascending: isAscending})


    if(error)
        return res.status(400).send();

    if(data)
        return res.status(200).send(data);

})

app.get('/getBestInvestments',async (req,res) =>{
    const response = await axios.get(`https://www.alphavantage.co/query?function=TOP_GAINERS_LOSERS&apikey=${API_KEY}`);

    return res.status(200).send(response.data);
})

app.listen(8080, function (err) {
    if (err) console.log("Error in server setup")
    console.log("Server listening on Port: 8080");
})