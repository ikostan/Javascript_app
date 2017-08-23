//Global variables
var ask_Hrate = "Please enter your hourly pay rate:";
var ask_Hworked = "Please enter the number of hourse you worked current week:";
var ask_dependents = "Please enter the number of dependents:";
var errorPrefix = "<p>Please enter a valid";

var hRate, hWorked, dependents, tax, deduction, total;

//Main function - process all functions that are needed for the calculation + open a new window 
function main(){

	//Get user data
	hRate = getUserData(ask_Hrate); //The hourly pay rate for the employee	
	hWorked = getUserData(ask_Hworked); //The number of hours worked by that employee for the current week	
	dependents = getUserData(ask_dependents); //The number of dependents claimed by that employee
	
	var errorMsg = dataValidation(hRate, hWorked, dependents); //Entered data validation	
	
	
	if(errorMsg != ""){
	
		displayError(errorMsg);
	}
	else{
		
		var	error = document.getElementById("error");
		error.style.visibility = "hidden";
		error.style.display = "none";
		error.innerHTML = ""; //Remove the error
		calculate(); //Calculate an employee's weekly tax deduction + total
		redirect(); //Redirect the user in order to show the results
	}
}


//Get user data
function getUserData(data){

	var result = getUserInput(data);
	return result;
}

//Data validation
function dataValidation(hRate, hWorked, dependents){
	
	
	var errorMessage = "";
	
	if(isNaN(hRate) || hRate == "" || hRate == null || hRate < 0){
		
		errorMessage = errorMessage + errorPrefix + " hourly pay rate value.</p>";
	}
	
	if(isNaN(hWorked) || hWorked == "" || hWorked == null || hWorked < 0){
		
		errorMessage = errorMessage + errorPrefix + " number of hours worked.</p>";
	}
	
	if(isNaN(dependents) || dependents == "" || dependents == null || dependents < 0){
		
		errorMessage = errorMessage + errorPrefix + " number of dependents.</p>";
	}
	
	return errorMessage;
}

//Get user input - generic function
function getUserInput(string){
	
	var data;

	data = prompt(string, "");
			
	return data;
}


//Display an Error
function displayError(errorMsg){
		
	var	error = document.getElementById("error");
	error.style.display = "block";
	error.style.visibility = "visible";
	error.innerHTML = errorMsg;	
}


//Calculate an employee's weekly tax deduction
function calculate(){
	
	if(dependents == 0){
	
		tax = 28 / 100;
	}
	else if(dependents > 0 && dependents < 4){
	
		tax = 25 / 100;
	}
	else if(dependents > 3 && dependents < 7){
		
		tax = 15 / 100;
	}
	else{
		
		tax = 10 / 100;	
	}
	
	//hRate, hWorked, dependents, tax, deduction
	total = hRate * hWorked;
	total = parseFloat(total).toFixed(2);
	deduction = total * tax;
	deduction = parseFloat(deduction).toFixed(2);
} 

var smallWindow;

//Redirect the user in order to show the results
function redirect(){
	
	//Transfer following data sets via URL: hRate, hWorked, dependents, deduction
	hRate = parseFloat(hRate).toFixed(2);
	
	window.location.href = "calc.html" + 
							'#' + hRate + 
							'#' + hWorked + 
							'#' + dependents + 
							'#' + tax + 
							'#' + deduction +
							'#' + total;	
}

	
//Handle on click event - close the window
function closeWindow(){
	
	window.location.href = "paycheques.html";
}

function displayData(){
	
	//Set GUI elements
	var hourRate = document.getElementById("hourRate");
	var hourWorked = document.getElementById("hourWorked");
	var depend = document.getElementById("depend");
	var taxRate = document.getElementById("taxRate");
	var deduct = document.getElementById("deduct");
	var total = document.getElementById("total");
	
	//Extract data from URL
	var data = window.location.hash.substring(1);
	data = data.split('#'); //Split parameters
			
	//Assign values
	hRate = data[0];
	hWorked = data[1];
	dependents = data[2];
	tax = data[3];
	deduction = data[4];
	totalEarned = data[5];
			
	//Display the data
	hourRate.innerHTML = hRate + '$';
	hourWorked.innerHTML = hWorked;
	depend.innerHTML = dependents;
	taxRate.innerHTML = parseFloat(tax * 100).toFixed(2) + '%';
	deduct.innerHTML = deduction + '$';
	total.innerHTML = parseFloat(totalEarned - deduction).toFixed(2) + '$';
}
