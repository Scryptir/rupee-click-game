/**********************************************************************			
Function Name: randomNumber1to16()
Parameters: None
Return Value: random number between 1 and 16
Description: This function will use the Math.random method to generate a random number between 1 and 16
**********************************************************************/
function randomNumber1to16() { // defines a function called randomNumber1to16()
    let number = Math.floor((Math.random()*16)+1) // uses Math.random to get a number between 0 and 15, adds 1 to make the value 1 to 16, assigns it to the number variable
    return number; // returns the value of the number variable
} // end randomNumber1to16()

var gameActive = false; // creates a variable called gameActive and sets it to false. the game is not active when the page is loaded


/**********************************************************************			
Function Name: newRupeeSquare()
Parameters: None
Return Value: None
Description: This function will use the randomNumber1to16() function to move a picture of a rupee around the 16 spaces of the gameboard after each click.
**********************************************************************/
function newRupeeSquare() { // Defines the newRupeeSquare() function
    if (gameActive == false){ // starts the if block, only runs this block of code if this is the first rupee square to be generated
        rupeeSquare = 'space-' + randomNumber1to16(); // uses the randomNumber1to16() function, appends it to the 'space-' string, and assigns it to the rupeeSquare variable. The 'space-#' corresponds to a space on the gameboard
        document.getElementById(rupeeSquare).innerHTML = '<img src="./images/zeldaRupee.png" alt="Zelda Green Rupee" id="rupeeImage"></img>'; // Adds the rupee image to the newly generated rupee square
        document.getElementById(rupeeSquare).classList.remove('empty'); // removes the class name 'empty' from the class list of the div that corresponds to the new rupee square
        document.getElementById('rupeeImage').addEventListener('click', clickedRupee); // adds an event listener to the rupee image so that the clickedRupee() function is called whenever the image is clicked

        let emptySquares = document.getElementsByClassName('empty'); // creates an array of elements that still contain the class name 'empty'
        for (let i = 0; i < emptySquares.length; i++) { //for loop that assigns the event listener that runs the clickedEmpty() function every time a square that doesn't contain the rupee image is clicked.
            emptySquares[i].addEventListener('click', clickedEmpty);
        }

        gameActive = true; // assigns the value of true to the gameActive variable so that the else statement is run the next time the newRupeeSquare() function os called
        console.log(rupeeSquare); // logs the value of the rupeeSquare to the console so that people can see that the function is working as intended
    } else { // starts the else block of the newRupeeSquare() function. Only runs after the function has been called on the page before
        let oldRupeeSquare = rupeeSquare; // assigns the value that was assigned to rupeeSquare before to the variable oldRupeeSquare so that we can alter the old location of the rupee before changing it again
        document.getElementById(oldRupeeSquare).innerHTML = ''; // removes that image of the rupee from the square that previously held the rupee
        document.getElementById(oldRupeeSquare).classList.add('empty'); // adds the class name empty to the old square that previously held the rupee so it will be included in the array before new event listeners are assigned
        rupeeSquare = 'space-' + randomNumber1to16(); // calls the randomNumber1to16() function again to assigne a new value to the rupeeSquare variable
        document.getElementById(rupeeSquare).innerHTML = '<img src="./images/zeldaRupee.png" alt="Zelda Green Rupee" id="rupeeImage"></img>'; // adds the image of a rupee to the new square that is supposed to hold the rupee
        document.getElementById(rupeeSquare).classList.remove('empty'); // removes the class 'empty' from the class list of the new selected div
        document.getElementById('rupeeImage').addEventListener('click', clickedRupee); // adds new event listener so that the clickedRupee() function is called when the new rupeeSquare is clicked

        let emptySquares = document.getElementsByClassName('empty'); // creates an array of elements that still contain the class name 'empty'
        for (let i = 0; i < emptySquares.length; i++) { //for loop that assigns the event listener that runs the clickedEmpty() function every time a square that doesn't contain the rupee image is clicked.
            emptySquares[i].addEventListener('click', clickedEmpty);
        }
        console.log(rupeeSquare); // logs the value of the rupeeSquare to the console so that people can see that the function is working as intended
    }
} // end newRupeeSquare()

var turnsRemaining = 5; // creates a new variable that holds the number of turns remaining before the game ends
var yourScore = 0; // creates a new variable that holds the value that corresponds to the user's current score

/**********************************************************************			
Function Name: clickedEmpty()
Parameters: None
Return Value: None
Description: This function will decrease the value of the turnsRemaining variable and leave the yourScore variable unchanged. It then updates the html elements to show the changes to the values of the variables. This function is run when the user clicks on a square that does not hold the rupee image, concidered a failure.
**********************************************************************/
function clickedEmpty() {  // defines a new function called clickedEmpty()
    if (turnsRemaining > 1) { // start if block that only runs if the value of turnsRemaining is over 1
        turnsRemaining = turnsRemaining - 1; // subtracts one from the value held in the turnsRemaining variable and reassigns the new value to the turnsRemaining variable
    
        document.getElementById('remaining-turns').innerHTML = '<p>Turns Remaining: ' + turnsRemaining + '</p>'; // updates the html element that shows the user how many turns are remaining in the game
        document.getElementById('scoreboard').innerHTML = '<p>Your Score: ' + yourScore + '</p>'; // updates the html element that shows the user what their current score is
    
        newRupeeSquare(); // calls the function newRupeeSquare() again so that the rupee image moves to a new place on the gameboard
    } else { // start of the else block that runs if the value of turnsRemaining is 1 or lower
        if (turnsRemaining == 1){ // if block that updates the value of turns remaining from 1 to 0
            turnsRemaining = turnsRemaining - 1;
        }

        document.getElementById('remaining-turns').innerHTML = ''; // updates the remaining turns element with the new value of turns remaining
        document.getElementById('scoreboard').innerHTML = ' <p>Game Over! Your score was: ' + yourScore + '</p>'; // updates teh scoreboard element with the current score the user has obtained
    }
} // end clickedEmpty()

/**********************************************************************			
Function Name: clickedRupee()
Parameters: None
Return Value: None
Description: This function will dectreases the value of the turnsRemaining variable and increases the value of the yourScore variable. It then update the HTML elements on the screen with the current value of the variables. This function is run when the user successfully clicks on a rupee after the game is started.
**********************************************************************/
function clickedRupee() { // defines a new clickedRupee() function
    if (turnsRemaining > 1) { // start if block that only runs if the value of turnsRemaining is over 1
        yourScore = yourScore + 1; // increases the value of yourScore by one because the user successfully clicked on the rupee image
    
        document.getElementById('remaining-turns').innerHTML = '<p>Turns Remaining: ' + turnsRemaining + '</p>'; // updates the remaining turns element with the new value of turns remaining
        document.getElementById('scoreboard').innerHTML = '<p>Your Score: ' + yourScore + '</p>';// updates teh scoreboard element with the current score the user has obtained
    
        newRupeeSquare(); // calls the function newRupeeSquare() again so that the rupee image moves to a new place on the gameboard
    } else {
        if (turnsRemaining == 1){ // if block that increases the value of yourScore by 1 as long as there is still a turn remaining
            yourScore = yourScore + 1;
        }

        document.getElementById('remaining-turns').innerHTML = ''; // updates the remaining turns element with the new value of turns remaining
        document.getElementById('scoreboard').innerHTML = ''; // updates the scoreboard element with the current score the user has obtained
        document.getElementById('game-button').innerHTML = '<a href="./index.html">Clear Board</a>' // changes the button so that it contains a link to the page so that the code reloads when the page is reloaded
    }
} // end clickedRupee()

/**********************************************************************			
Function Name: rupeeGame()
Parameters: None
Return Value: None
Description: This function will be called with the press of a button on the screen. The function calls the newRupeeSquare() function to get the first rupee on the screen to start the rotation of if...else statements and event listeners. This is the start of the game.
**********************************************************************/
function rupeeGame() { // defines a new function called rupeeGame()
    newRupeeSquare(); // calls the newRupeeSquare() function
    document.getElementById('remaining-turns').innerHTML = '<p>Turns Remaining: 5</p>'; // adds a paragraph that shows that the user has five turns when the button is clicked
    document.getElementById('scoreboard').innerHTML = '<p>Your Score: 0</p>'; // adds a paragraph that shows that the user has a score of zero when the game starts
    document.getElementById('game-button').innerHTML = '<a href="./index.html" id="clear-board-button">Clear Board</a>'; // changes the button so that it contains a link to the page so that the code reloads when the page is reloaded
} // end rupeeGame()