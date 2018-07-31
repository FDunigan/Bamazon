var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "bamazon_DB"
  });

  connection.connect(function(err) {
    if (err) throw err;
    displayInfo();
  });

  function idSearch() {
      inquirer
        .prompt([
        {
            name: "item",
            type: "input",
            message: "Please enter the ID for the product you wish to purchase:",
            validate: function(value) {
                if (isNaN(value) === false) {
                  return true;
                }
                return false;
              }
        },
        {
            name: "unitsearch",
            type: "input",
            message: "How many units of the product would you like?",
            validate: function(value) {
                if (isNaN(value) === false) {
                  return true;
                }
                return false;
              }
            }
         
        ])
    };
  
  function displayInfo() {
    connection.query("SELECT * FROM products", function(err, res) {
      if (err) throw err;
      for (var i = 0; i < res.length; i++) {
      console.log("ID: " + res[i].id + " | Product Name: " + res[i].product_name + " | Price: " + res[i].price + 
        " | Quantity Remaining: " + res[i].stock_quantity);
      }
      idSearch();
    });
  }

