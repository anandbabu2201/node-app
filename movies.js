const express= require('express');
const app=express();
const Joi= require('joi');

app.use(express.json());

const movies=[
    {id:1,genre:'horro'},
    {id:2,genre:'comedy'},
    {id:3,genre:"action"},
    { id:4,genre:"fiction"}
]

app.get('/api/movies',(req,res)=>{
    res.send(movies)
})

app.get('/api/movies/:id',(req,res)=>{
    let movie= movies.find(e=>e.id==req.params.id);
    if(!movie) return res.status(400).send('not found');
    res.send(movie);
})

app.post('/api/movies/',(req,res)=>{
    const {error}=validator(req.body);
    if(error) return res.status(400).send(error.details[0].message)
    const movie={
     id:movies.length+1,
     genre:req.body.genre
    }
    movies.push(movie);
    res.send(movies)
})

app.put('/api/movies/:id',(req,res)=>{
    const movie= movies.find(e=>e.id == parseInt(req.params.id));
    if(!movie) return res.status(400).send('not found');
    const {error}= validator(req.body);
    if(error) return res.status(400).send(erro.details[0].message);
    movie.genre=req.body.genre;
    res.send(movie);
})

app.delete('/api/movies/:id',(req,res)=>{
    const movie= movies.find(e=>e.id == parseInt(req.params.id));
    if(!movie) return res.status(400).send('not found');
    const index= movies.indexOf(movie);
    movies.splice(index,1)
    res.send(movie);
})

function validator(movie){
    const schema={
        genre:Joi.string().min(3).required()
    }
    return Joi.validate(movie,schema);
}

const port = process.env.PORT;
app.listen(port,()=>console.log(`listening to port number ${port}`))