module.exports = (sequelize, dataTypes) => {

    let alias = "Alquileres"
  
    let cols = {
        id:{
            type: dataTypes.INTEGER(11),
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        oficina:{
            type: dataTypes.INTEGER(11),
            allowNull: false
        },
        cliente:{
          type: dataTypes.STRING(50),
          allowNull:false,
        },
        persona_reservo:{
          type: dataTypes.STRING(50),
          allowNull:false,
        },
        fecha_reserva:{
          type: dataTypes.DATE,
          allowNull:true,
        },
        fecha_comienzo:{
          type: dataTypes.DATEONLY,
          allowNull:false,
        },
        fecha_fin:{
          type: dataTypes.DATEONLY,
          allowNull:false
        }
    }
  
    let config = {
        tableName: "alquiler",
        timestamps: false,
        underscored: true,
    }
  
    const Alquiler = sequelize.define(alias,cols,config)

    return Alquiler
  }