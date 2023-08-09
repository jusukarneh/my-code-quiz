var startbtn = document.getElementById("start-btn")
var introSectionEl = document.getElementById("intro-section")
var initialSectionEl =document.getElementById("initial-section")
var questionSectionEl = document.getElementById("question-section")
var questionTitleEl = document.getElementById("title")
var timerEl = document.getElementById('timer')
var choicesEl = document.querySelectorAll(".choices")
var scoreEl =document.getElementById("score")
var saveBtnEl = document.getElementById("save-btn")
var highscoreSectionEl =document.getElementById("highscore-section")
var gobackBtnEl =document.getElementById("go-back-btn")
var scorelistEl =document.getElementById("score-list")
var clearScoreBtnEl=document.getElementById("clear-score-btn")
var initialsInput =document.getElementById("initials-input")
var answersEl =document.getElementById("answers")
console.log(highscoreSectionEl);
console.log(initialSectionEl);
var questionIndex=0
var questionsArray = [
    {
        title: "1. Which of the following can be used to call a Javascript Code Snippet? ",
        choices: ["a) Preprocessor", "b) Fuction", "c) Triggering Event", "d) RMI"],
        answer: "b"
    },
    {
        title: "2. Which type of JavaScript language is _____?",
        choices: ["a) Object-oriented", "b) Object-based", "c) Functional programming", "d) All of the above",],
        answer: "b"
    },
    {
        title: "3. Which JavaScript method is used to access an HTML element by id? ",
        choices: ["a) getElementById", "b) getElement(id)", "c) getElementById(id)", "d)elementById(id)"],
        answer: "c"
    },
    {
        title: "4. In JavaScript, single line comment begins with ___.",
        choices: ["a) #", "b) /*", "c) $", "d) //"],
        answer: "d"
    },
    {
        title: "5. In JavaScript, multi-line comments start with __ and end with ___ ",
        choices: ["a)/* and */", "b)<!—and -->", "c)## and ##", "d)// and //"],
        answer: "a"
    },
]

var users=[]
if(localStorage.getItem("users")){
   users=JSON.parse(localStorage.getItem("users"))
}
console.log(questionsArray[questionIndex].title);
var timeLeft=questionsArray.length*15
/*
  1. hide intro section
  2. start timer
  3. show questions
  4. data structure to store questions and choices
*/




var setIntervalId=0;

function startQuiz() {
   // introSectionEl.classList.add("hide")
   introSectionEl.setAttribute("class","hide")
   questionSectionEl.setAttribute("class","")
   setIntervalId=setInterval(countDown,1000)
    showQuestions()
}

function countDown(){
timerEl.textContent=timeLeft--
 if(timeLeft===0){
    clearInterval(setIntervalId)
}
}

function showQuestions(){
    questionTitleEl.textContent=questionsArray[questionIndex].title

    choicesEl[0].textContent=questionsArray[questionIndex].choices[0]

    choicesEl[1].textContent=questionsArray[questionIndex].choices[1]

    choicesEl[2].textContent=questionsArray[questionIndex].choices[2]

    choicesEl[3].textContent=questionsArray[questionIndex].choices[3]



}

function nextQuestion(event){
  var currentElement= event.target
  var answer=questionsArray[questionIndex].answer
  if(currentElement.matches("button")&& questionIndex<questionsArray. length)
  {
    if(currentElement.textContent===answer){
        score = score + 20
        alert("correct")
    }

    else{
        timeLeft=timeLeft -10;
        alert("wrong")
    }
    questionIndex++
    if( questionIndex< questionsArray.length){
        showQuestions()
    }
   else{
    initialSectionEl.classList.remove("hide")
    // highscoreSectionEl.classList.remove("hide")
    questionSectionEl.setAttribute("class","hide")
    clearInterval(setIntervalId)
    scoreEl.textContent=timerEl.textContent

   }
  }  
}

function saveInitial(){
var userObject={
 initials:initialsInput.value,
 score:scoreEl.textContent
 

}

users.push (userObject)
localStorage.setItem("users",JSON.stringify(users))
initialSectionEl.classList.add("hide")
highscoreSectionEl.classList.remove("hide")
displayScore()
}
startbtn.addEventListener("click", startQuiz)

questionSectionEl.addEventListener("click",nextQuestion)

// gobackbtnEl.addEventListener("click")

// clearScoresEl.addEventListener("click",clear)

saveBtnEl.addEventListener("click",saveInitial)

function displayScore(){
   
    scorelistEl.textContent=""
    for (let i = 0; i < users.length; i++) {
        var li=document.createElement("li")
        li.textContent=users[i].initials+" - "+users[i].score
        scorelistEl.appendChild(li)
        
    }
}

function gobackBtn(){
  document.location.reload()  
}

gobackBtnEl.addEventListener("click",gobackBtn)

function clearScoreBtn(){
  users=[]  
  scorelistEl.textContent=""
    localStorage.clear()
}

clearScoreBtnEl.addEventListener("click",clearScoreBtn)