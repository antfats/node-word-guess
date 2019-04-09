function LetterGuess(value) {
    this.guessed = false;
    this.letter = value;
    function replace() {
        for (var i = 1; i < word.length; i++) {
            console.log("_");
        }
    }
    function correct() {
        if (userInput === str) {
            this.bool = true;
            console.log(this.str);
        }
    }

    function incorrect() {
        this.bool = true;
        this.str = charAt(str);
    }

}
new LetterGuess(false,"What in the dang nabbit",replace());