var Letter = require("./letter.js");

function Word(answer){
    this.objArray = [];
    for (var i=0;i<answer.length;i++){
        var letter = new Letter(answer[i]);
        this.objArray.push(letter);
    }

}