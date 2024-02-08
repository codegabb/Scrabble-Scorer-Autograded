// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");

let word = " ";

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }

	  }
	}
	return letterPoints;
 }
 

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
   console.log("Let's play some scrabble!")
   word = input.question("Enter a word: ");
};

function simpleScorer(word) {
   word = word.toUpperCase();
   let letterPoints = 0
   
   for (let i = 0; i < word.length; i++) {
      letterPoints += 1;
    }
  return letterPoints;
}
	

function vowelBonusScorer(word){
   word = word.toUpperCase();
   let letterPoints = 0
   
   for (let i = 0; i < word.length; i++) {
      if ('AEIOU'.includes(word[i])){
         letterPoints += 3;
      }else{
         letterPoints += 1
      }
	  }
	return letterPoints;
}
   
//Define a function that takes a word as a parameter and returns a score. Each vowel within the word is worth 3 points, and each consonant is worth 1 point.



function scrabbleScorer(word) {
   word = word.toUpperCase();
   let letterPoints = 0;
   for (let i = 0; i < word.length; i++) {
      let letter = word[i].toLowerCase();
      letterPoints += newPointStructure[letter];
   }
   return letterPoints;
}

const scoringAlgorithms = [
  {
      description: 'The traditional scoring algorithim',
      name: 'Scrabble', 
      scorerFunction: scrabbleScorer
   },
   { 
      description: 'Each letter is worth 1 point.',
      name: 'Simple Score', 
      scorerFunction: simpleScorer
   },
   {
      description: 'Vowels are 3 pts, consonants are 1 pt.',
      name: 'Bonus Vowels', 
      scorerFunction: vowelBonusScorer
   }
];

function scorerPrompt() {
   let scoreChoice = input.question("Select what type of scoring you'd like to use:\nFor the simple scoring, enter 0\nFor the vowel bonus scoring, enter 1\nFor the traditional scoring, enter 2\n");
   if (scoreChoice === '0') {
      return console.log("algorithm name: ", scoringAlgorithms[1].name),
      console.log("socringFunction result: ", scoringAlgorithms [1].scorerFunction(word))
   } else if (scoreChoice === '1') {
      return console.log("algorithm name: ", scoringAlgorithms[2].name),
      console.log("socringFunction result: ", scoringAlgorithms [2].scorerFunction(word))
   } else if (scoreChoice === '2') {
      return console.log("algorithm name: ", scoringAlgorithms[0].name),
      console.log("socringFunction result: ", scoringAlgorithms [0].scorerFunction(word))
   }
}
      

function transform(oldPointStructure){
   let newPointStructure = {};
   for(let pointValue in oldPointStructure) {
      let letters = oldPointStructure[pointValue];
      for (let i = 0; i < letters.length; i++){
         let letter = letters[i].toLowerCase();
         newPointStructure[letter] = Number(pointValue);
      }
   }
   return newPointStructure;
}

let newPointStructure = transform(oldPointStructure);

function runProgram() {
   initialPrompt();
   // console.log(oldScrabbleScorer(word));
   // console.log(simpleScorer(word));
   // console.log(vowelBonusScorer(word));
   scorerPrompt()
      // Simple scoring
      // console.log("algorithm name: ", scoringAlgorithms[0].name);
      // console.log("scoringFunction result: ", scoringAlgorithms[0].scoringFunction(""));

}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};
