module.exports = (sequelize, Sequelize) => {
    const productModel = sequelize.define("product", {
      nom: {
        type: Sequelize.STRING
      },
      prix_unitaire: {
        type: Sequelize.FLOAT
      },
      quantité: {
        type: Sequelize.INTEGER
      }
    });
  
    return productModel;
  };