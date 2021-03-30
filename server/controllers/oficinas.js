let db = require('../database/models');

module.exports={
    listar:(req,res)=>{
        db.Oficinas.findAll()
        .then(data=>{
            res.send(data)
        })
    },
    detalle:(req,res)=>{
        db.Oficinas.findOne({
            where:{
                id:req.params.id
            }
        })
        .then(data=>{
            res.send(data)
        })
    }
}