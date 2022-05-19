const express = require('express');
require('dotenv').config();
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5000
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
//use middleware
app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.oxikf.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run() {
    try {
      await client.connect();
      const taskCollection = client.db("toCollection").collection("service");

 //post and add new inventory
 app.post("/add",async(req,res)=>{
  const task = req.body;
  const getUserTask = await taskCollection.insertOne(task);
  res.send(getUserTask )
})
//show user task 
app.get("/add",async(req,res)=>{
    const query = {};
    const cursor = taskCollection.find(query);
    const tasks = await cursor.toArray();
    res.send(tasks );
})
   //delete
   app.delete("/addDelete/:Id",async(req,res)=>{
    const Id = req.params.Id
    const query = {_id:ObjectId(Id)};
    const result = await taskCollection.deleteOne(query);
    res.send(result)
})
    } 
    finally {
    
    }
  }
  run().catch(console.dir);



app.get('/', (req, res) => {
    res.send('Hello World!!')
  })
   
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })