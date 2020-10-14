import express from 'express';
import mongoose from 'mongoose';
import Cards from "./dbCards.js";
import Cors from "cors";
const app =express();
const port = process.env.PORT || 8001;
const connection_url = "mongodb+srv://admin:0R6Sv8DTse2nSBsz@cluster0.nzhse.mongodb.net/tinderdb?retryWrites=true&w=majority"

app.use(express.json());
app.use(Cors());
mongoose.connect(connection_url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,//mongoose is under development so thats why we use it
});

//API Endpoints
app.get("/" , (req,res) => res.status(200).send("hello world"));
app.post("/tinder",(req, res) =>{
    const dbCard =req.body;

    Cards.create(dbCard, (err, data) =>
    {
        if(err){
            res.status(500).send(err);
        }
        else{
            res.status(201).send(data);
        }
    })
});

app.get("/tinder",(req, res) =>{
    Cards.find( (err, data) =>
    {
        if(err){
            res.status(500).send(err);
        }
        else{
            res.status(200).send(data);
        }
    })
});

//Listener
app.listen(port, () => console.log('listening on localhost: ${port}'));

// mA17zIgPEcBD9yib
