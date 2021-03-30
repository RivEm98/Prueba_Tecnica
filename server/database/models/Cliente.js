module.exports = (sequelize, dataTypes) => {

    let alias = "Clientes"
  
    let cols = {
        id:{
            type: dataTypes.INTEGER(11),
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        nombre:{
            type: dataTypes.STRING(50),
            allowNull: false
        }
    }
  
    let config = {
        tableName: "cliente",
        timestamps: false
    }
  
    const Cliente = sequelize.define(alias,cols,config)

    return Cliente
  }