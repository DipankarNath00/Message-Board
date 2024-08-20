const {Router} = require('express');
const { title } = require('process');
const indexRouter = Router()
const {v4:uuidv4} = require("uuid")
const messages = [
    {
     id: "1a2b3c4d", 
      text: "Hi there!",
      user: "Amando",
      added: new Date()
    },
    {
      id: "5e6f7g8h",
      text: "Hello World!",
      user: "Charles",
      added: new Date()
    }
  ];
  
indexRouter.get("/",(req,res)=>{
     res.render('index',{title:"Mini Message Board",messages:messages})
})
indexRouter.get("/new",(req,res)=>{
    res.render('form',{title:"Form"})
})
indexRouter.post("/new",(req,res)=>{
    try{
        const messageText = req.body.messageText;
        const user = req.body.user
        messages.push({
            id:uuidv4(),
            text:messageText,
            user:user,
            added:new Date()});
        res.redirect("/");
    }catch(error){
        res.status(500).json({error:"Failed to create message"})
    }
})
indexRouter.get("/:id",(req,res)=>{
    const id = req.params.id
    const message = messages.find(msg=>msg.id===id)
    if(message){
        res.render("details",{title:"Message Details",message})
    }else{
        res.status(404).render("404",{title:"404"})
    }
})
module.exports  = indexRouter;