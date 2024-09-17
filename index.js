const express=require('express')
const path=require('path');
const urlRoute=require('./routes/url');
const { connectMongoDb } = require('./connect');
const staticRoute=require('./routes/staticRouter')
const URL=require('./models/url')
const app=express();
const PORT=8000;
connectMongoDb('mongodb://127.0.0.1:27017/url_shortner')
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use("/",staticRoute)
app.set('view engine','ejs');
app.set('views',path.resolve('./views'))
app.use('/url',urlRoute)

app.get('/test',async (req,res)=>{
    const allUrls=await URL.find({});
    return res.render('home',{
        urls:allUrls,
    })
})
app.get('/url/:shortId',async (req,res)=>{
    const shortId=req.params.shortId;
    const entry=await URL.findOneAndUpdate(
        {shortId},
        {
            $push:{
            visitHistory:{
                timestamp:Date.now(), 
            }
        }
        
    },{new:true}
)
    if(!entry) {
        return res.status(404).send('Short URL not found');
    }
    return res.redirect(entry.redirectURL);
})

app.listen(PORT,()=>{
    console.log(`Server starting at ${PORT}`);
})