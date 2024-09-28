import express from 'express';
import bodyParser from 'body-parser';
import 'dotenv/config'
import { createClient } from '@supabase/supabase-js'
import cors from 'cors';
const corsOptions = {
    origin: 'http://localhost:5173',
}

const supabase = createClient(process.env.DB_URL,process.env.DB_KEY);
//var shared between functions
let incomeSum = 0;

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors(corsOptions));


app.get('/getAllTransactions', async (req, res) => {
    const obj={
        totalAmount:0,
        totalIncome:0,
        totalExpenses:0,
        allTransactions:[]
    }

    const {data,error2} = await supabase
        .from('Transactions')
        .select('*')

    if(error2){
        return res.status(400).send();
    }
    obj.allTransactions = data;

    const total = data.reduce((accumulator, currentValue) => {
        if(currentValue.type === 'income')
            return accumulator + currentValue.amount;
        else
            return accumulator - currentValue.amount;
    },0)

    incomeSum = data.reduce((accumulator,currentValue) => {
        if(currentValue.type === 'income')
            return accumulator + currentValue.amount;
        else
            return accumulator;
    },0)

    const expenseSum = data.reduce((accumulator,currentValue) => {
        if(currentValue.type === 'expense')
            return accumulator + currentValue.amount;
        else
            return accumulator;
    },0);

    obj.totalAmount = total;
    obj.totalExpenses = expenseSum;
    obj.totalIncome = incomeSum;

    res.status(200).send(obj);
})

app.get('/getAllIncomes', async (req, res) => {
    const obj={
        totalIncome:0,
        allIncomes:[]
    }

    const {data,error} = await supabase
        .from('Transactions')
        .select()
        .eq('type','income')

    if(error)
        return res.status(400).send();

    obj.allIncomes = data;
    obj.totalIncome = incomeSum;

    res.status(200).send(obj);
})

app.get('/getAllExpenses', async (req, res) => {
    const obj={
        totalExpenses:0,
        totalIncome: incomeSum,
        allExpenses:[]
    }

    const {data,error} = await supabase
        .from('Transactions')
        .select()
        .eq('type','expense')

    if(error)
        return res.status(400).send();

    obj.allExpenses = data;

    const expenseSum = data.reduce((accumulator,currentValue) => {
        return accumulator + currentValue.amount
    },0)
    obj.totalExpenses = expenseSum;
    obj.totalIncome = incomeSum;

    res.status(200).send(obj);
})

app.post('/', (req, res) => {})

app.listen(8080, function(err){
    if (err) console.log("Error in server setup")
    console.log("Server listening on Port: 8080");
})