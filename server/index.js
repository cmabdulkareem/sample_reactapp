import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser'

const app = express();
const port = 3000;

// middleware
app.use(cors())
app.use(bodyParser.json())
app.use('/images', express.static('public/images'));



// Route to handle get request
app.get('/api/', (req, res)=>{
    console.log("get request processed")
    let data = [
        {id:1, name: "John", age: 18, education : "Plus two"}, 
        {id:2, name: "Vishnu", age: 19, education : "Plus two"}, 
        {id:3, name: "Tijo", age: 20, education : "Plus two"}, 
        {id:4, name: "Alex", age: 21, education : "Plus two"}, 
    ]
    res.json(data)
})

app.listen(port, ()=>{
    
    console.log(`server running on port http://localhost/${port}`)
})