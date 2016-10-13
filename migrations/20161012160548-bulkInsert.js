'use strict';

var models = require("../models");

module.exports = {
  up: function (queryInterface, Sequelize) {
    // bulk insert these entries using our model
    return models.Burger.bulkCreate(
      [
        {burger_name: "Power Burger"},
        {burger_name: "Bad-Ass Burger"},
        {burger_name: "The Simpsons Burger"},
        {burger_name: "Star Wars Burger"},
        {burger_name: "Star Trek Burger"}
      ]
    )
  
  },

  down: function (queryInterface, Sequelize) {
   // remove all instances of these fandoms from the table
    return models.Burger.destroy({where:{burger_name: [
        "Power Burger",
        "Bad-Ass Burger",
        "The Simpsons Burger",
        "Star Wars Burger",
        "Star Trek Burger"
    ]}
  })
  }
}

