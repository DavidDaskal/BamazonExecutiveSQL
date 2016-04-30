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
	
});

console.log("Choose one of the following options below. 1.) View product sales by department. 2.) Create new department");

prompt.get(['option'],function(err,res) {

	if (res.option == '1') {
		connection.query('SELECT * FROM Departments',function(err,rows,fields) {
 	
		 	for (i=0; i < rows.length; i++) {
		 	console.log("Department: "+rows[i].DepartmentName+" Total sales: "+rows[i].TotalSales+". Total Profits: "+rows[i].TotalProfit);

		 	}
 
 		});
	}

	else {
		prompt.get(['DepartmentName','OverHeadCosts'],function(err,res) {

			connection.query('INSERT INTO departments(DepartmentName,OverHeadCosts,TotalSales,TotalProfit) VALUES (?,?,0,0)',[res.DepartmentName,res.OverHeadCosts],function(err,res){

				if (err) {console.log(err)}
					else {
						console.log("New Department added successfully");
					}
			});

		});
	}
 });
	





