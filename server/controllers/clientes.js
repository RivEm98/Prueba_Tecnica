let db = require('../database/models');

module.exports={
    listar:(req,res)=>{
        res.render('index', {
            title: 'Express'
        }) 
    }
}