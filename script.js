// Assignment Code
var generateBtn = document.querySelector("#generate");

// Write password to the #password input

var numbers = ["1","2","3","4","5","6","7","8","9","0"]
var specials = ["!","@","#","$","%","^","&","*","(",")"]
var letters = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"]

var waystoWriteYes = ["YES","Y","YE"]

var shouldCapital = false
var shouldNumber = false
var shouldSpecials = false
var passwordLength = 15

function generatePassword() {

  var password = ""
  var alreadyIncludesCapital = !shouldCapital

  for (var i = 0; i < passwordLength; i++) {

    var chosenChar = letters[Math.floor(Math.random() * letters.length)]
    
    if (shouldCapital && Math.floor(Math.random() * 10) >= 5) {

      chosenChar = chosenChar.toUpperCase()
      alreadyIncludesCapital = true

    }

    if (shouldSpecials && Math.floor(Math.random() * 10) > 5 && (!alreadyIncludesCapital || i != passwordLength - 1)) {

      chosenChar = specials[Math.floor(Math.random() * specials.length)]

    } else if (shouldNumber && Math.floor(Math.random() * 10) > 5 && (!alreadyIncludesCapital || i != passwordLength - 1)) {

      chosenChar = numbers[Math.floor(Math.random() * numbers.length)]

    }

    if (!alreadyIncludesCapital && i <= letters.length/2 && letters.includes(chosenChar)) {

      chosenChar = chosenChar.toUpperCase()
      console.log("Forced Uppercase")
      alreadyIncludesCapital = true

    }

    password = password + chosenChar

    console.log("Char " + (i + 1) + ": " + chosenChar)
    

  }

  var alreadyIncludesSpecial = !shouldSpecials
  var alreadyIncludesNumber = !shouldNumber

  for (var i = 0; i < passwordLength; i++) {

    var currString = password.substring(i,i + 1)

    if (numbers.includes(currString)) {

      alreadyIncludesNumber = true

    } else if (specials.includes(currString)) {

      alreadyIncludesSpecial = true
      
    }

  }

  console.log(password + " Unmodified")

  var alreadyReplacedChar

  if (!alreadyIncludesSpecial) {

    var randoNumber = Math.floor(Math.random() * passwordLength) - 1

    var currString = password.substring(randoNumber,randoNumber + 1)

    password = password.replace(currString,specials[Math.floor(Math.random() * specials.length)])

    alreadyReplacedChar = randoNumber
    console.log(password + " Modified (Symbols)")

  }

  if (!alreadyIncludesNumber) {

    var randoNumber = Math.floor(Math.random() * passwordLength) - 1

    do {

      randoNumber = Math.floor(Math.random() * passwordLength) - 1

    } while (randoNumber == alreadyReplacedChar && !specials.includes(password.substring(randoNumber,randoNumber + 1)))

    var currString = password.substring(randoNumber,randoNumber + 1)

    password = password.replace(currString,numbers[Math.floor(Math.random() * numbers.length)])

    console.log(password + " Modified (Numbers)")

  }
  
  
  return password

}

function writePassword() {

  var askUserCapital = prompt("Do you want capital letters?")
  shouldCapital = waystoWriteYes.includes(askUserCapital.toUpperCase())
  console.log(shouldCapital + " Capital answer")

  var askUserNumbers = prompt("Do you want numbers?")
  shouldNumber = waystoWriteYes.includes(askUserNumbers.toUpperCase())
  console.log(shouldNumber + " Number answer")

  var askUserSpecials = prompt("Do you want specials characters?")
  shouldSpecials = waystoWriteYes.includes(askUserSpecials.toUpperCase())
  console.log(shouldSpecials + " Special answer")

  var characteramount = prompt("How many characters do you want?\n(min of 8, max of 128, will default to 15 if not a number or not in limitations)")
  passwordLength = ((Number(characteramount) >= 8 && Number(characteramount) <= 128) && Number(characteramount)) || 15

  alert("Generating password!")

  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);