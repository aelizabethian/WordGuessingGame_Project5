const keyBoard = document.querySelector("#qwerty");
const phrase = document.getElementById("phrase");
const startGameButton = document.querySelector(".btn__reset");
const overlay = document.getElementById("overlay");
const phrases = [
  "Better late than never",
  "Break a leg",
  "So far so good",
  "Less is more",
  "Out of this world",
  "Fun times",
  "Claim to fame",
  "Sitting pretty",
  "To each his own",
  "Through thick and thin",
];

let missed = 0;

//Attach an event listener to the "Start Game" button to hide the overlay
startGameButton.addEventListener("click", () => {
  overlay.style.display = "none";
});

//A Function to randomly choose a phrase from the phrases array. Returns an array of characters of the phrase
function getRandomPhraseAsArray(arr) {
  let random = Math.floor(Math.random() * arr.length);
  let newArr = arr[random].split("");
  return newArr;
}

const randomPhrase = getRandomPhraseAsArray(phrases);

// //Set the game display to loop through an array of characters
function addPhraseToDisplay(arr) {
  const ul = document.querySelector("#phrase ul");

  for (let i = 0; i < arr.length; i++) {
    let li = document.createElement("li");
    li.textContent = arr[i];

    if (li.textContent !== " ") {
      li.className = "letter";
    } else {
      li.className = "space";
    }
    ul.appendChild(li);
  }
  return ul;
}

// //Function using the variable collected from the getRandomPhrase as an argument
addPhraseToDisplay(randomPhrase);

// //Creating a checkletter function to compare the letter selected with the letters in the phrase
function checkLetter(buttonPicked) {
  let letters = document.getElementsByClassName("letter");
  let match = null;
  for (i = 0; i < letters.length; i++) {
    if (letters[i].textContent.toLowerCase() === buttonPicked.textContent) {
      letters[i].className += " show";

      //Adding an additional transform quality randomly to some of the letters
      let randomTrans = [" transA", " transB", " transC", " transD", ""];
      let random = Math.floor(Math.random() * randomTrans.length);
      letters[i].className += randomTrans[random];

      match = buttonPicked;
    }
  }
  return match;
}

//Function to create a new 'restart' button to be incorporated into the check win function
function restartButton() {
  let button = document.querySelector(".btn__reset");
  button.textContent = "Restart";
}

//Function to clear the li elements, reset the hearts, keyboard and start from 0 again with a new phrase
function restartGame() {
  missed = 0;
  let ul = document.querySelector("ul");

  while (ul.firstChild) {
    ul.removeChild(ul.lastChild);
  }

  let heartImg = document.querySelectorAll(".tries img");
  for (let i = 0; i < heartImg.length; i++) {
    heartImg[i].src = "images/liveHeart.png";
  }

  let keyboardButtons = document.querySelectorAll("#qwerty button");
  console.log(keyboardButtons, keyboardButtons[0]);
  for (let i = 0; i < keyboardButtons.length; i++) {
    if (keyboardButtons[i].hasAttribute("class")) {
      keyboardButtons[i].removeAttribute("class");
      keyboardButtons[i].disabled = false;
    }
  }
  let newRandom = getRandomPhraseAsArray(phrases);
  addPhraseToDisplay(newRandom);
}

// //Create a checkwin function to check whether the game has been won or lost.Will integrate into event listener later
function checkWin() {
  let show = document.querySelectorAll(".show");
  let letters = document.querySelectorAll(".letter");
  if (show.length === letters.length) {
    overlay.className += " win";
    overlay.style.display = "flex";
    document.querySelector(".title").textContent = "You WON!!!🎉";
    restartButton();
    restartGame();
  } else if (missed > 4) {
    overlay.className += " lose";
    overlay.style.display = "flex";
    document.querySelector(".title").textContent = "Sorry, you lost!😩";
    restartButton();
    restartGame();
  }
}

// //Adding an event listener to the keyboard buttons to parse the button from the function.

keyBoard.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    e.target.className = "chosen";
    e.target.disabled = true;
    let check = checkLetter(e.target);

    if (check === null) {
      missed += 1;
      let heartImg = document.querySelectorAll(".tries img");
      heartImg[missed - 1].src = "images/lostHeart.png";
    }
  }
  checkWin();
});

//Add a event listener to trigger a CSS transition for when letters are displayed
