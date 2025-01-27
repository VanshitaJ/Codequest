import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import nodemailer from "nodemailer"
import crypto from "crypto"
import bodyParser from "body-parser"

import dotenv from "dotenv"
import userroutes from "./routes/user.js"
import questionroutes from "./routes/question.js"
import answerroutes from "./routes/answer.js"
const app = express();
dotenv.config();
app.use(express.json({ limit: "30mb", extended: true }))
app.use(express.urlencoded({ limit: "30mb", extended: true }))
app.use(cors());



// // In-memory store for OTPs
// const otpStore = {};

// // Configure the email transporter
// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: 'your-email@gmail.com',
//     pass: 'your-email-password',
//   },
// });

// // Generate OTP
// app.post('/api/generate-otp', (req, res) => {
//   const { question } = req.body;
//   const otp = crypto.randomInt(100000, 999999).toString();
//   otpStore[otp] = question;

//   // Send OTP via email
//   transporter.sendMail({
//     from: 'your-email@gmail.com',
//     to: 'user-email@gmail.com', // Replace with the user's email
//     subject: 'Your OTP for Programming Chatbot',
//     text: `Your OTP is: ${otp}`,
//   });

//   res.json({ success: true });
// });

// // Validate OTP and respond
// app.post('/api/validate-otp', (req, res) => {
//   const { question, otp } = req.body;

//   if (otpStore[otp] !== question) {
//     return res.json({ response: 'Invalid OTP or expired session.' });
//   }

//   // Delete OTP after use
//   delete otpStore[otp];

//   // Check for Java-related questions
//   if (question.toLowerCase().includes('java')) {
//     return res.json({ response: 'I will not answer Java questions.' });
//   }

//   // Respond to other programming questions
//   return res.json({ response: `Here is the answer to your question: [Answer to "${question}"]` });
// });

app.post("/chat",(req,res) => {
  const { question } = req.body;
  if(!question){
    return res.status(400).json({message: "question is required"})
  }
  if(question.toLowerCase().includes('java')){
    return res.json({response: "I will not answer Java questions."})
  }
  const response = "That is an interesting programming question!";
  res.json({response })
});

app.use("/user", userroutes);
app.use('/questions', questionroutes)
app.use('/answer',answerroutes)
app.get('/', (req, res) => {
    res.send("Codequest is running perfect")
})

const PORT = process.env.PORT || 5000

const database_url = "mongodb+srv://admin:test@codequest.l8xq3.mongodb.net/?retryWrites=true&w=majority&appName=codequest"

mongoose.connect(database_url)
    .then(() => app.listen(PORT, () => { console.log(`server running on port ${PORT}`) }))
    .catch((err) => console.log(err.message))