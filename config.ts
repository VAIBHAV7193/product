import mongoose from "mongoose";

const connetDb = async() =>{
    try{
        const connect = await mongoose.connect('mongodb+srv://vaibhav7193:Shiv7397844034@vaibhav0.kprze0e.mongodb.net/mycontacts-backend?retryWrites=true&w=majority');
        console.log('database connected',connect.connection.host,connect.connection.name)

    }catch(err){
        console.log(err);
        process.exit(1);
    }

};

export default connetDb;