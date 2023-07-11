import express from 'express'; 
import cors from 'cors';
import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';
dotenv.config();                             //configuring the dotenv using these method

const app = express();                      //calling express() method and assign to app
const PORT = process.env.PORT || 5000
const MONGO_URL = process.env.MONGO_URL;    //we accessing PORT AND URL FORM .env file hence written like these
app.use(express.json());
app.use(cors());                            //if you want to use express and cors then write like these


//firstly createConnection method to establish connection 
const createConnection = async ()=>{
    const client = new MongoClient(MONGO_URL)   //HERE WE CREATED OBJECT OF MongoClient & passed url
        await client.connect();                 //connected
        console.log("Connection established successfully!")
    return client                                //here just returning object 
}
  
const client = await createConnection();    //calling above method

app.get("/", (req,res)=>{
    res.send("hi hello im db");
})

app.post("/food", async (req,res)=>{
    const data = req.body               //requesting data from postamans body

    const result = await client
    .db("gofoodmern")
    .collection("sample")
    .insertOne(data)

result.acknowledged
?res.status(200).send({msg:"data send successfully"})
:res.status(400).send({msg:"Something went wrong! plz try again later"})
})

//for catagory
app.post("/type", async (req,res)=>{
    const data = req.body

    const result = await client
    .db("gofoodmern")
    .collection("category")
    .insertOne(data)

    result.acknowledged
    ?res.status(200).send({msg:"found successfully"})
    :res.status(400).send({msg:"something went wrong ! plz try again"})
})



app.get("/infofood",async (req,res)=>{
     
    const result = await client
    .db("gofoodmern")
    .collection("sample")
    .find(req.query)
    .toArray()

    res.status(200).send(result)

    
})
app.listen(PORT, ()=>{
    console.log("Server is running of port " + PORT);
})
