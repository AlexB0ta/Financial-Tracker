import express, {response} from 'express';
import bodyParser from 'body-parser';
import 'dotenv/config'
import {createClient} from '@supabase/supabase-js'
import cors from 'cors';
import axios from 'axios';
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import { GoogleGenerativeAI } from "@google/generative-ai";

import path from "path";
import {fileURLToPath} from 'url';

const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true
}
const port = process.env.PORT || 8080;

const supabase = createClient(process.env.DB_URL, process.env.DB_KEY);
//var shared between functions
let incomeSum = 0;
const API_KEY = process.env.ALPHA_API_KEY;
const JWT_SECRET = process.env.JWT_SECRET;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors(corsOptions));
app.use(cookieParser());

//sf-uri
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// app.use(express.static(path.join(__dirname, 'dist')));

//middle-ware
const verifyToken = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).send('No token provided');
    }

    try {
        const response = jwt.verify(token, process.env.JWT_SECRET);
        req.user = response;
        next();
    } catch (err) {
        console.log(err);
        return res.status(401).send('Invalid token');
    }
}

const verifyMail = (req, res, next) => {
    const {email} = req.body;
    console.log(email)

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const valid = emailRegex.test(email);
    if (!valid) {
        return res.status(401).send('Invalid email');
    } else {
        next();
    }

}

// app.get('/*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'dist', 'index.html'));
// });

app.post('/addUser', verifyMail, async (req, res) => {
    const {username, email, password, captchaToken} = req.body;

    try {
        const response = await axios.post(
            'https://challenges.cloudflare.com/turnstile/v0/siteverify',
            new URLSearchParams({
                secret: process.env.CAPTCHA_SECRET,
                response: captchaToken
            }).toString(),
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                }
            }
        );

        if (response.data.success) {
            console.log(response.data);
            //continue to register else return error
        } else {
            console.log("aci")
            return res.status(401).send('Verification failed!')
        }
    } catch (error) {
        //console.log(error);
        return res.status(401).send('Error verifying captcha!')
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const {error} = await supabase
        .from('Users')
        .insert({name: username, email: email, password: hashPassword})

    if (error) {
        console.log(error);
        return res.status(400).send(error.message);
    }
    return res.status(200).send()
})

app.post('/login', async (req, res) => {
    const {email, password, captchaToken} = req.body;
    //console.log(req.body)

    try {
        const response = await axios.post(
            'https://challenges.cloudflare.com/turnstile/v0/siteverify',
            new URLSearchParams({
                secret: process.env.CAPTCHA_SECRET,
                response: captchaToken
            }).toString(),
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                }
            }
        );

        if (response.data.success) {
            console.log(response.data);
            //continue to login else return error
        } else {
            return res.status(401).send('Verification failed!')
        }
    } catch (error) {
        console.log(error);
        return res.status(401).send('Error verifying captcha!')
    }

    const {data, error} = await supabase
        .from('Users')
        .select()
        .eq('email', email)
        .single();

    if (error) {
        console.log(error);
        return res.status(400).send(error.message);
    }

    const verifyPass = await bcrypt.compare(password, data.password);

    if (verifyPass === false) {
        return res.status(401).send({error: 'Invalid Credentials'});
    }

    const token = jwt.sign({id: data.id, email: data.email}, JWT_SECRET, {expiresIn: '1h'});

    res.cookie('token', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'None',
        maxAge: 3600000 //1hour
    });

    res.status(200).send({message: "Successfully logged in", username: data.name});
})

app.patch('/editUser', verifyMail, verifyToken, async (req, res) => {
    const {userName, email} = req.body;
    console.log(req.body)

    const {error} = await supabase
        .from('Users')
        .update({name: userName, email: email})
        .eq('id', req.user.id)


    if (error) {
        console.log(error);
        return res.status(400).send('Update failed!')
    }

    res.status(200).send();
})

app.delete('/deleteUser', verifyToken, async (req, res) => {

    const response = await supabase
        .from('Users')
        .delete()
        .eq('id', req.user.id)

    return res.status(response.status).send(response.statusText);
})


app.post('/logout', async (req, res) => {
    res.cookie('token', '', {maxAge: 0});
    res.status(200).send({message: "Logged out successfully"});
})

app.get('/getAllTransactions', verifyToken, async (req, res) => {
    const obj = {
        totalAmount: 0,
        totalIncome: 0,
        totalExpenses: 0,
        allTransactions: []
    }
    console.log(req.user);

    const {data, error2} = await supabase
        .from('Transactions')
        .select('*')
        .eq('user_id', req.user.id)

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

app.get('/getAllIncomes', verifyToken, async (req, res) => {
    const obj = {
        totalIncome: 0,
        allIncomes: []
    }

    const {data, error} = await supabase
        .from('Transactions')
        .select()
        .eq('type', 'income')
        .eq('user_id', req.user.id)

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

app.get('/getAllExpenses', verifyToken, async (req, res) => {
    const obj = {
        totalExpenses: 0,
        totalIncome: incomeSum,
        allExpenses: []
    }

    const {data, error} = await supabase
        .from('Transactions')
        .select()
        .eq('type', 'expense')
        .eq('user_id', req.user.id)

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

app.delete('/deleteExpense/:id', verifyToken, async (req, res) => {
    //console.log(req.params);
    const response = await supabase
        .from('Transactions')
        .delete()
        .eq('id', req.params.id)

    return res.status(response.status).send();
})

app.patch('/updateExpense', verifyToken, async (req, res) => {
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

app.post('/addExpense', verifyToken, async (req, res) => {
    //console.log(req.body);
    const response = await supabase
        .from('Transactions')
        .insert({
            description: req.body.description,
            amount: req.body.amount,
            category: req.body.category,
            created_at: req.body.date,
            type: 'expense',
            user_id: req.user.id,
            recurring: req.body.recurring
        })

    return res.status(response.status).send();
})

app.post('/addIncome', verifyToken, async (req, res) => {
    const response = await supabase
        .from('Transactions')
        .insert({
            description: req.body.description,
            amount: req.body.amount,
            category: req.body.category,
            created_at: req.body.date,
            type: 'income',
            user_id: req.user.id
        })

    return res.status(response.status).send();
})

app.patch('/updateIncome', verifyToken, async (req, res) => {

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

app.delete('/deleteIncome/:id', verifyToken, async (req, res) => {
    const response = await supabase
        .from('Transactions')
        .delete()
        .eq('id', req.params.id)

    return res.status(response.status).send();
})

app.get('/getAllTransactions/filter', verifyToken, async (req, res) => {
    console.log(req.query)
    const {type, sortBy, ascending} = req.query;
    const isAscending = (ascending === 'true');

    const {data, error} = await supabase
        .from('Transactions')
        .select()
        .eq('type', type)
        .eq('user_id', req.user.id)
        .order(sortBy, {ascending: isAscending})


    if (error)
        return res.status(400).send();

    if (data)
        return res.status(200).send(data);

})

app.get('/getIncomesByDate', verifyToken, async (req, res) => {
    const{startDate, endDate,type} = req.query;
    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);
    const startDateFormatted = startDateObj.toISOString();
    const endDateFormatted = endDateObj.toISOString();
    //console.log(startDateFormatted,endDateFormatted)

    const {data, error} = await supabase
        .from('Transactions')
        .select('amount')
        .eq('type', type)
        .eq('user_id', req.user.id)
        .gte('created_at', startDateFormatted)
        .lte('created_at', endDateFormatted)


    if (error) {
        console.log(error)
        return res.status(400).send();
    }

    //console.log(data)
    return res.status(200).send(data);
})

app.get('/getBestInvestments', async (req, res) => {
    const response = await axios.get(`https://www.alphavantage.co/query?function=TOP_GAINERS_LOSERS&apikey=${API_KEY}`);
    console.log(response.data);

    if (Object.hasOwn(response.data,'Information')) {  //to test if i have api requests left
        return res.status(500).send(response.data.Information)
    }

    return res.status(200).send(response.data);
})


app.get('/getCryptoData', async (req, res) => {
    const {crypto, currency} = req.query;
    //console.log(req.query)

    const response = await axios.get(`https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=${crypto}&to_currency=${currency}&apikey=${API_KEY}`);
    console.log(response.data)
    if (Object.hasOwn(response.data, 'Information')) {  //to test if i have api requests left
        return res.status(500).send(response.data.Information)
    }

    return res.status(200).send(response.data);
})

app.get('/getAllSavings', verifyToken, async (req, res) => {

    const {data, error} = await supabase
        .from('Savings')
        .select()
        .eq('user_id', req.user.id)


    if (error) {
        console.log(error)
        return res.status(400).send();
    }

    return res.status(200).send(data);

})

app.post('/addSavingPlan', verifyToken,async (req, res) => {

    //console.log(req.body);
    const response = await supabase
        .from('Savings')
        .insert({
            goal: req.body.goal,
            amount: req.body.amount,
            current_amount: 0,
            user_id: req.user.id
        })

    return res.status(response.status).send();
})

app.delete('/deleteSavingPlan/:id', verifyToken, async (req, res) => {
    const response = await supabase
        .from('Savings')
        .delete()
        .eq('id', req.params.id)

    return res.status(response.status).send();
})

app.patch('/updateSavingPlan', verifyToken, async (req, res) => {

    const {error} = await supabase
        .from('Savings')
        .update({current_amount: req.body.newAmount})
        .eq('id', req.body.id)

    if (error)
        return res.status(400).send();

    return res.status(200).send();
})

app.get('/getAllRecurringPayments', verifyToken, async (req, res) => {

    const {data, error} = await supabase
        .from('Transactions')
        .select('id, description, amount,category, created_at')
        .eq('user_id', req.user.id)
        .eq('recurring', true)

    if (error) {
        console.log(error)
        return res.status(400).send();
    }

    return res.status(200).send(data);
})

app.post('/addRecurringPayment', verifyToken, async (req, res) => {

    const response = await supabase
        .from('Transactions')
        .insert({
            description: req.body.name,
            amount: req.body.amount,
            category: req.body.name,
            created_at: new Date().toISOString(),
            type: "expense",
            user_id: req.user.id,
            recurring: true
        })

    return res.status(response.status).send();
})

app.delete('/deleteRecurringPayment/:id',verifyToken, async (req, res) => {

    //console.log(req.params);
    const response = await supabase
        .from('Transactions')
        .delete()
        .eq('id', req.params.id)

    return res.status(response.status).send();
})

app.post('/getAiResponse', verifyToken, async (req, res) => {

    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const quizAns = JSON.parse(req.body.data);

    const chat = model.startChat({
        history: [
            {
                role: "user",
                parts: [{ text: "Hello" }],
            },
            {
                role: "model",
                parts: [{ text: "Great to meet you. What would you like to know?" }],
            },
        ],
    });

    let result = await chat.sendMessage("I want you to give me an answer about investment advice. I will give you my primary investment goal, How long I plan to invest and my risk tolerance");
    //console.log(result.response.text());
    let result2 = await chat.sendMessage(`My goal is ${quizAns.question1}, I plan to invest ${quizAns.question2} and my risk tolerance is ${quizAns.question3}. Make the answer about 125 words long and don't include disclaimers.`);
    //console.log(result2.response.text());

    return res.status(200).send(result2.response.text());
})

app.listen(port, function (err) {
    if (err) console.log("Error in server setup")
    console.log("Server listening on Port: 8080");
})