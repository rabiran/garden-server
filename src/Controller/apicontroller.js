const axios = require('axios')

const newUser = async (req,res)=>{
    try{
        
        sendRes = await axios.post('https://automation.com/immigrant',req.body);
        res.status(201).json(sendRes);
        
    }catch(e){
        res.status(504).json(e.message)
    }
}

const getUsers = async (req,res) =>{
    try{
        allUsers = await axios.get('https://automation.com/immigrants');
        res.status(201).json(allUsers)
    }catch(e){
        res.status(504).json(e.message)
    }
}

