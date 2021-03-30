module.exports = (sequelize, dataTypes) => {

  let alias = "Oficinas"

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
      },
      codigo_interno:{
        type: dataTypes.STRING(50),
        allowNull:false,
      },
      persona_acargo:{
        type: dataTypes.STRING(50),
        allowNull:false,
      },
      cantidad_personas:{
        type: dataTypes.INTEGER(11),
        allowNull:false,
      },
      toilet:{
        type: dataTypes.STRING(10),
        allowNull:false,
      },
      wifi:{
        type: dataTypes.STRING(10),
        allowNull:false,
      },
      telefono:{
        type: dataTypes.STRING(10),
        allowNull:false
      }
  }

  let config = {
      tableName: "oficina",
      timestamps: false,
      underscored: true
  }

  const Oficina = sequelize.define(alias,cols,config)


  return Oficina
}