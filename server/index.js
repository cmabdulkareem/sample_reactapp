import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser'


const app = express();
const port = 3000;

app.use(cors())
app.use(bodyParser.json())
app.use('/images', express.static('public/images'))


app.get('/api/data', (req,res)=>{
    console.log("get request processed")
    let data = [
        {id: 1, name: "Alex", age: 18, education : "plus two"},
        {id: 2, name: "John", age: 19, education : "plus one"},
        {id: 3, name: "Vishnu", age: 20, education : "degree"},
        {id: 4, name: "Tijo", age: 21, education : "degree"}
    ]
    res.json(data)
})

    app.listen(port, ()=>{
        console.log("server running")
    })
