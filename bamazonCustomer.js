var mysql = require("mysql");
var prompt = require("prompt");
prompt.start();

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'BAMAZON'
});

connection.connect(function(err){
	if (err) {
		console.log(err);
	}
	else {
		console.log('connection is good');
	}
});

 connection.query('SELECT * FROM PRODUCTS',function(err,rows,fields) {
 	
 	for (i=0; i < rows.length; i++) {
 	console.log("The name of this product is: "+rows[i].ProductName+". Item ID is: "+rows[i].ItemID+". Price: "+rows[i].Price);

 	}
 	userOrder();
 });

function userOrder () {
	console.log("choose item ID and quantity for your order");
prompt.get(['productID','Quantity'],function (err,res){

	id = res.productID;
	qtyOrdered = res.Quantity;	
	checkStock();
  });
}

function checkStock (){

	connection.query('SELECT * FROM PRODUCTS',function(err,rows,fields) {
 	
 	for (i=0; i < rows.length; i++) {

 	    if (rows[i].ItemID == id) {
 	    	if (qtyOrdered <= rows[i].StockQuantity) {
 	    		console.log("There is enough in stock. Your total cost is $"+(rows[i].Price * qtyOrdered));
 	    		processOrder(id,qtyOrdered,(rows[i].Price * qtyOrdered),rows[i].DepartmentName); 
 	    	}
 	    	 else {
 	    	 	console.log("not enough in stock");
 	    	 }
 	    }

 	  }
 	  
 	 });
  }

 function processOrder (id,qtyOrdered,total,dept) {
 
 	connection.query('UPDATE PRODUCTS SET StockQuantity = StockQuantity - '+qtyOrdered+' WHERE ItemID = ?',[id],function(err,rows,fields) {
 		console.log("update completed");
 		console.log('revenue = '+total);	
	 	
 	});
 	

 	connection.query('UPDATE Departments SET TotalSales = TotalSales + ? WHERE DepartmentName = ?',[total,dept],function(err,res) {

 		if (err){
 			console.log(err);
 		}
 	});

 	connection.query('UPDATE Departments SET TotalProfit = TotalSales - OverHeadCosts WHERE DepartmentName = ?',[dept],function(err,res) {

 		if (err){
 			console.log(err);
 		}
 		else {
 			console.log('Total sales and Total profit fields have been updated in Departments table');
 		}
 	});
 		connection.end();

 }


	





