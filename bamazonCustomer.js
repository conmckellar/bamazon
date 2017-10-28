var mysql = require("mysql");
var inquirer = require ("inquirer");

var connection = mysql.createConnection({

  host: "",

  port: 3306,

  user: "root",

  password: "", //do not push to github

  database: "bamazon"

});

// connect to the mysql server and sql database
connection.connect(function(err) {
  if (err) throw err;

  // run the start function after the connection is made to prompt the user (also never put a function caller in a for loop.)
});


function show() {

  connection.query('SELECT * FROM products', function(err, result) {
    if (err) throw err;
      
      for(var i = 0; i < result.length; i++) {
          console.log("ID: " + result[i].id + " || Product: " + result[i].product_name + " || Department: " + result[i].department_name + " || Price: $" +  result[i].price + " || Quantity: " + result[i].stock_quantity);
        };

        console.log("\nOur Product Listings");

  });
  setTimeout(start,500);
};


function start() {
  console.log("\nWelcome to Bamazon!");
  console.log("\n")

    inquirer.prompt([

    {
      name: "itemID",
      type: "input",
      message: "Please type the id number of the product you wish to purchase.",
      //filter: Number
    },
    {
      name: "itemQuantity",
      type: "input",
      message: "Please type how many of this you are purchasing.",
      //filter: Number
    }

    ]).then(function(answer) {

      //put the inputed values into variables
      var item = answer.itemID;
      var quantity = answer.itemQuantity;

      //now we do things with them
      connection.query('SELECT * FROM products WHERE id=' + item, function(err, selection) {
        if (err) throw err;

        if (selection[0].stock_quantity - quantity >= 0) {

          console.log("\nYou have selected " + selection[0].product_name + ".");
          console.log("\nStock: " + selection[0].stock_quantity + "\nNumber Ordered: " + quantity + ".");
          console.log("\nYour account has been charged $" + (answer.itemQuantity * selection[0].price) +  ". Thank you for using Bamazon!");
          console.log("\nMake another purchase? Here is our updated product list.")
          
          connection.query('UPDATE products SET stock_quantity=? WHERE id=?', [selection[0].stock_quantity - quantity, item],
            function(err, inventory) {
              if (err) throw err;
                 // Runs the prompt again, so the user can keep shopping.
                 show();
          });

        } else {
          console.log("We're sorry, but we don't have that many. We only have " + selection[0].stock_quantity + " of " + selection[0].product_name + " at the moment.");
          console.log("Please try your order again.")
          start();
        }
      })
    });

};

show();