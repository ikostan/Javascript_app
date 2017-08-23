//Global variables
var letterGrade, gpa, group;
var askForGrade = "Please enter a percentage grade (integer only) for a studen:";
var errorPrefix = "<p>Please enter a valid";

//Handle on click event - close the window
function closeWindow(){
	
	window.location.href = "letter_grade.html";
}

/*Main function*/
function main(){
	
	var percantage = getUserInput(askForGrade);	//Ask for user input
	var errorMessage = dataValidation(percantage);	//Input validation
	
	if(errorMessage != ""){
		
		displayError(errorMessage); //Display error message
	}
	else{
		
		var	error = document.getElementById("error");
		error.style.visibility = "hidden";
		error.style.display = "none";
		error.innerHTML = ""; //Remove the error
		calcGrade(percantage); //Calculate the grade
		redirect(percantage); //Redirect the user in order to show the results
	}
}

//Calculate the grade
function calcGrade(prsn){
	
	//percantage, letterGrade, gpa
	prsn = parseInt(prsn);
	
	switch(true){
	
		case (prsn > 94 && prsn <= 100):
			letterGrade = 'A+'; 
			gpa = 4.33;
			group = 1;
			break;		
		case (prsn < 95 && prsn > 89):
			letterGrade = 'A'; 
			gpa = 4.00;
			group = 2;
			break;
		case (prsn < 90 && prsn > 84):
			letterGrade = 'A-'; 
			gpa = 3.67;
			group = 3;
			break;
		case (prsn < 85 && prsn > 79):
			letterGrade = 'B+'; 
			gpa = 3.33;
			group = 4;
			break;
		case (prsn < 80 && prsn > 74):
			letterGrade = 'B'; 
			gpa = 3.00;
			group = 5;
			break;
		case (prsn < 75 && prsn > 69):
			letterGrade = 'B-'; 
			gpa = 2.67;
			group = 6;
			break;
		case (prsn < 70 && prsn > 64):
			letterGrade = 'C+'; 
			gpa = 2.33;
			group = 7;
			break;
		case (prsn < 65 && prsn > 59):
			letterGrade = 'C'; 
			gpa = 2.00;
			group = 8;
			break;
		case (prsn < 60 && prsn > 54):
			letterGrade = 'C-'; 
			gpa = 1.67;
			group = 9;
			break;
		case (prsn < 55 && prsn > 49):
			letterGrade = 'P'; 
			gpa = 1.00;
			group = 10;
			break;
		case (prsn < 50):
			letterGrade = 'F'; 
			gpa = 0.00;
			group = 11;
			break;
		default:
			break;
	}	
}

//Get user input - generic function
function getUserInput(string){
	
	var data;

	data = prompt(string, "");
			
	return data;
}

//User input validation
function dataValidation(userInput){
		
	var error = "";
	
	if(isNaN(userInput) || userInput == "" || userInput == null || userInput < 0 ||  userInput > 100){
		
		error = errorPrefix + " percentage grade INPUT (integer only) for a student.</p>";
	}	
	
	return error;
}

//Display an Error
function displayError(errorMsg){
		
	var	error = document.getElementById("error");
	error.style.display = "block";
	error.style.visibility = "visible";
	error.innerHTML = errorMsg;	
}

//Redirect the user in order to show the results
function redirect(percantage){
	
	//Transfer following data sets via URL: percantage, letterGrade, gpa
	window.location.href = "gpa.html" + 
							'#' + percantage + 
							'#' + letterGrade +
							'#' + gpa +
							'#' + group;	
}

//Extract data from URL and display it
function displayData(){
	
	//Set GUI elements
	var percentage = document.getElementById("prcnt");
	var letterGrade = document.getElementById("lg");
	var gpa = document.getElementById("gpa");
	
	//Extract data from URL
	var data = window.location.hash.substring(1);
	data = data.split('#'); //Split parameters
			
	//Assign values
	var prcnt = data[0];
	var lg = data[1];
	var sgpa = data[2];
	var group = data[3];	
		
	//Display the data
	percentage.innerHTML = prcnt + '%';
	letterGrade.innerHTML = lg;
	gpa.innerHTML = parseFloat(sgpa);
	
	highlightRow(group); //highlighth coresponding table category (row)
}

//highlighth coresponding table category (row)
function highlightRow(input){
	
	var row = document.getElementById(input);
	row.id = "selected";	
}
