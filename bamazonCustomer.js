var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "bamazon_DB"
});

connection.connect(function (err) {
    if (err) throw err;
    displayInfo();
});

function idSearch() {
    inquirer
        .prompt([
            {
                name: "product",
                type: "input",
                message: "Please enter the ID for the product you wish to purchase:",
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            },
            {
                name: "quantity",
                type: "input",
                message: "How many units of the product would you like?",
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            }
        ]).then(function(res) {
            var item2 = res.product;
            var quantity2 = res.quantity;

            connection.query("SELECT * FROM products WHERE ?", { product_name: item2 }, 
            function(err, response) {
                if (err) throw err;

                if (response.length === 0) {
                    console.log('Error: Please select a valid ID.');
                    displayInfo();
                } else {
                    var productRes = response[0];
                    if (quantity2 <= productRes.stock_quantity) {
                        console.log('Your product is in stock!');
                    }
                } {
                    console.log('Sorry, that item is out of stock.');
                }
            
            })
        })
};

function displayInfo() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log("ID: " + res[i].id + " | Product Name: " + res[i].product_name + " | Price: " + res[i].price +
                " | Quantity Remaining: " + res[i].stock_quantity);
        }
        idSearch();
    });
}

