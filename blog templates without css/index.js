const express = require("express");
const app = express();
const port= 8080;
const path= require("path");
const { v4: uuidv4 } = require('uuid');
const methodOverride=require("method-override");


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(methodOverride('_method'));

let posts =[
  {

    id : uuidv4(),
    username :"hello",
    content  :" i love coke i love coke i love coke",
  },
  {
    id : uuidv4() ,
    username :"hello2",
    content  :"i love chips i love chips i love chips",
  },
  {
    id : uuidv4(),
    username :"hello3",
    content  :"i love cake i love cake i love cake",
  },
]





app.get("/posts", (req,res)=>{
res.render("index",{posts})
});

app.get("/posts/new",(req,res)=>{
  res.render("new");
});

app.post("/posts",(req,res)=>{
  let {username,content}= req.body;
  let id=uuidv4();
  posts.push({id,username,content});
  res.redirect("/posts")
});

app.get("/posts/:id",(req,res)=>{
   let {id}=req.params;
   let post =posts.find((p)=>id===p.id);
   res.render("show", {post})
});

app.patch("/posts/:id", (req,res)=>{
  let {id}=req.params;
  let newContent=req.body.content;
   let post =posts.find((p)=>id===p.id);
   post.content=newContent;
   console.log(post);
  res.redirect("/posts")
})


app.get("/posts/:id/edit",(req,res)=>{
  let {id}=req.params;
   let post =posts.find((p)=>id===p.id);
  res.render("edit", {post})
   
  })


app.delete("/posts/:id",(req,res)=>{
  let {id}=req.params;
   posts =posts.filter((p)=>id !== p.id);
res.redirect("/posts")

})








app.listen(8080, ()=>{
  console.log(`listening at ${port}`)
});