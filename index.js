var Q = require('Q');
var fs = require('fs');
var wordDict = require('./50tones');

function readWords() {
    var words = [];
    for (var i in wordDict) {
        words.push([i, wordDict[i]]);
    }
    return words;
}

function Questioner() {
    this.words = readWords();
    this.currentQuestion = null;
}

Questioner.prototype.ask = function() {
    var ranIndex = Math.floor(Math.random() * this.words.length);
    this.currentQuestion = this.words[ranIndex];
    return this.currentQuestion;
};

Questioner.prototype.hint = function() {
    return this.currentQuestion[0];
};

Questioner.prototype.answer = function(str) {
    if (!this.currentQuestion) {
        return;
    }
    if (str != this.currentQuestion[1]) {
        return false;
    } else {
        return true;
    }
};

if (!module.parent) {
    (function main() {
        var questioner = new Questioner();
        var q = questioner.ask();
        console.log(questioner.hint());
        process.stdin.on('data', function(data) {
            if (questioner.answer(data.toString('utf8').replace('\n', ''))) {
                console.log('right!');
            } else {
                console.log('wrong!, answer: ' + questioner.currentQuestion[1]);
            }
            var q = questioner.ask();
            console.log(questioner.hint());
        });
    })();
} else {
    module.exports = questioner;
}