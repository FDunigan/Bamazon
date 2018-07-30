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
  
  function displayInfo() {
    connection.query("SELECT * FROM products", function(err, res) {
      if (err) throw err;
      for (var i = 0; i < res.length; i++) {
      console.log("ID: " + res[i].id + " | Product Name: " + res[i].product_name + " | Price: " + res[i].price);
      }
      connection.end();
    });
  }