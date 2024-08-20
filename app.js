const express = require('express')
const app = express()
const indexRouter  = require('./routes/indexRouter')
const { title } = require('process')
const PORT = process.env.PORT||3000

//middleware
app.set("view engine","ejs")
app.use(express.static("public"))
app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.use("/",indexRouter)


app.listen(PORT)

app.use((req,res)=>{
    res.status(404).render('404',{title:"404"})
})
