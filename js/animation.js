//Animation - set hands visible or hidden
function blinkAnimation(){
	
	//Set hands elements
	var lhand = document.getElementById("lhand");
	var rhand = document.getElementById("rhand");
	
	
	if(lhand.style.visibility == "hidden"){
		
		lhand.style.visibility = "visible";
		rhand.style.visibility = "visible";
	}
	else{
	
		lhand.style.visibility = "hidden";
		rhand.style.visibility = "hidden";
	}
	
}

//Animation timer
function timer(){
	
	var timer = setInterval(blinkAnimation, 1000);
}

