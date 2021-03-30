let db = require('../database/models');

module.exports={
    index:(req,res)=>{
        db.Clientes.findAll()
        .then(data=>{
            res.render('index', {
             title: 'Express',
             data
            }) 
        })
        .catch(error=>{
            console.log(error)
        })
    }
}