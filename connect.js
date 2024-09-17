const mongoose=require('mongoose')
async function connectMongoDb(url) {
    
    return mongoose.connect(url)
    .then(()=>console.log("mongodb connected"))
    .catch(()=>console.log("Not able to connect"))
}
module.exports={
    connectMongoDb
}