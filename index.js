var Word = require("./Word.js");
var inquirer = require("inquirer");
var wordBank = ["Stranger Things", "Black Mirror", "The Crown", "You", "Arrested Developement", "Glow", "House of Cards", "Orange Is the New Black", "Dark", "Daredevil", "Ozark", "Big Mouth"];
var randomIndex = Math.floor(Math.random() * wordBank.length);
var randomWord = wordBank[randomIndex];
var targetWord = new Word(randomWord);

var requireNewWord = false;

var incorrectLetters = [];
var correctLetters = [];
var letterArray = "abcdefghijklmnopqrstuvwxyz"

var guessesLeft = 10;

function mainLogic() {
    if (requireNewWord) {
        var randomIndex = Math.floor(Math.random() * wordBank.length);
        var randomWord = wordBank[randomIndex];
        targetWord = new Word(randomWord);
        requireNewWord = false;
    }
    var wordComplete = [];
    targetWord.objArray.forEach(completeCheck);

    if (wordComplete.includes(false)) {
        inquirer.prompt([
            {
                type: "input",
                message: "Select a letter A to Z",
                name: "userInput"
            }
        ])
            .then(function (input) {
                if (!letterArray.includes(input.userInput) || input.userInput.length > 1) {
                    console.log("\nPlease try again!\n");
                    mainLogic();
                }
                else {
                    if (
                        incorrectLetters.includes(input.userInput) ||
                        correctLetters.includes(input.userInput) ||
                        input.userinput === ""
                    ) {
                        console.log("\nAlready guessed that or nothing was entered");
                        mainLogic();
                    }
                    else {
                        var wordCheckArray = [];

                        targetWord.userGuess(input.userInput);

                        targetWord.objArray.forEach(wordCheck);
                        if (wordCheckArray.join("") === wordComplete.join("")) {
                            console.log("\nIncorrect\n");
                            incorrectLetters.push(input.userInput);
                            guessesLeft--;
                        }
                        else {
                            console.log("\nCorrect!\n");
                            correctLetters.push(input.userInput);
                        }

                        targetWord.log();
                        // Print guesses left
                        console.log("Guesses Left: " + guessesLeft + "\n");

                        // Print letters guessed already
                        console.log(
                            "Letters Guessed: " + incorrectLetters.join(" ") + "\n"
                        );

                        // Guesses left
                        if (guessesLeft > 0) {
                            // Call function
                            mainLogic();
                        } else {
                            console.log("Sorry, you lose!\n");

                            restartGame();
                        }

                        function wordCheck(key) {
                            wordCheckArray.push(key.guessed);
                        }
                    }
                }
            });
    } else {
        console.log("YOU WIN!\n");

        restartGame();
    }

    function completeCheck(key) {
        wordComplete.push(key.guessed);
    }
}

function restartGame() {
    inquirer.prompt([
        {
            type: "list",
            message: "Would you like to:",
            choices: ["Play Again", "Exit"],
            name: "restart"
        }
    ])
        .then(function (input) {
            if (input.restart === "Play Again") {
                requireNewWord = true;
                incorrectLetters = [];
                correctLetters = [];
                guessesLeft = 10;
                theLogic();
            } else {
                return;
            }
        });
}

mainLogic();