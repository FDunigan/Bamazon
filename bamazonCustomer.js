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
          var item = res.product;
          var amount = res.quantity;

          connection.query('SELECT * FROM products WHERE ?', { item_id: item }, 
            function(err, response) {
                if (err) throw err;

                if (response.length == 0) {
                    console.log("Error: Please enter a valid ID");
                    displayInfo();
                } else {
                    var productRes = response[0];
                    if (amount <= productRes.stock_quantity) {
                        console.log("Great choice! Your item is in stock");

                        var updateInventory = 'UPDATE products SET stock_quantity = ' +
                        (productRes.stock_quantity - amount) + ' WHERE item_id = ' + item;

                        connection.query(updateInventory, function(err, data) {
                            if (err) throw err;

                            console.log('Your order has been placed! Your total is $' + productRes.price * amount);
                            console.log("Thank you for shopping with us!");
                            keepShopping();
                        })
                    } else {
                        console.log('Sorry, that item is not in stock');
                        console.log('You chose ' + productRes.product_name + ' and it has only ' +
                        productRes.stock_quantity + ' left in stock.');
                        console.log('\n---------------');
                        keepShopping();
                    }
                }
            })
        })
};

function displayInfo() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log("ID: " + res[i].item_id + " | Product Name: " + res[i].product_name + " | Price: " + res[i].price +
                " | Quantity Remaining: " + res[i].stock_quantity);
        }
        console.log('\n-------------------');
        idSearch();
    });
}

function keepShopping() {
    inquirer
    .prompt([
        {
            name: 'confirm',
            type: 'confirm',
            message: 'Would you like to keep shopping?'
        }    
    ]).then(function(res) {
        if (res.confirm) {
            console.log('\n-----------------');
            displayInfo();
        } else {
            console.log('Thank you for shopping with us!');
            connection.end();
        }
    })
}