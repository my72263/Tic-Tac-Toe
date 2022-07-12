console.log("Welcome to Tic Tac Toe")

// Add music to the HTML file
let music = new Audio("music.mp3")
let audioTurn = new Audio("ting.mp3")
let gameover = new Audio("gameover.mp3")
let wingame = new Audio("winmusic.wav")

let turn = "X"
let isgameover = false;
let count=0;
// @Funtion to chnage the turn:If turnplayer is X then return 0 and if turnplyer is 0 return x.

const changeTurn = ()=>{
    return turn === "X"? "0": "X"
}

/*
 @Function to check for win : Here we will wirte win logic for win 
Step1. let's create a array of all the possiblities when one can win and there transition state(How should line transitie)
step2. check every possiblity if you find there box with same value innertext(0,x && no box should be empty) then game is over
*/
const checkWin = ()=>{
    count =0
    let boxtext = document.getElementsByClassName('boxtext');
    let wins = [
        [0, 1, 2, 5, 5, 0],
        [3, 4, 5, 5, 15, 0],
        [6, 7, 8, 5, 25, 0],
        [0, 3, 6, -5, 15, 90],
        [1, 4, 7, 5, 15, 90],
        [2, 5, 8, 15, 15, 90],
        [0, 4, 8, 5, 15, 45],
        [2, 4, 6, 5, 15, 135],
    ]
    wins.forEach(e =>{
        if((boxtext[e[0]].innerText === boxtext[e[1]].innerText) && (boxtext[e[2]].innerText === boxtext[e[1]].innerText) && (boxtext[e[0]].innerText !== "") ){
            document.querySelector('.info').innerText = boxtext[e[0]].innerText + " Won"
            isgameover = true
            wingame.play()
            document.querySelector('.imgbox').getElementsByTagName('img')[0].style.width = "200px";
            document.querySelector(".line").style.transform = `translate(${e[3]}vw, ${e[4]}vw) rotate(${e[5]}deg)`
            document.querySelector(".line").style.width = "20vw";
        }
        if(isgameover === false){
            if(((boxtext[e[0]].innerText !== boxtext[e[1]].innerText) || (boxtext[e[2]].innerText != boxtext[e[1]].innerText)) && (boxtext[e[0]].innerText !== "" && boxtext[e[1]].innerText !== "" && boxtext[e[2]].innerText !== "")){
                count += 1;
            }
        }
    })
}

/* Game Logic: We want to add eventlistner to every box
Step1: Get all the boxes with the hellp of "document.getElementsByClassName("box")" where "box" is class of all the boxes, This is return an HTML collection.
Step2: make it an array so you can traverse all the boxes 
Step3: Get the box text
        The querySelector() method returns the first element that matches a CSS selector.To return all matches (not only the first), use the querySelectorAll() instead.
        Both querySelector() and querySelectorAll() throw a SYNTAX_ERR exception if the selector(s) is invalid.
Step4. add Eventlistner "click"to every box and chnage the inner text
Conclusion. when you loop in HTMLcollection (element will be vairbale) then change the innertext of that element's span box
Mtlb jab bhi kisi box pe click ho us box ke (yani element.querySelector('.boxtext'); ) ander wali boxtext class walen spa ke ander ka content h usko turn bna do.
*/
let boxes = document.getElementsByClassName("box");
Array.from(boxes).forEach(element =>{
    let boxtext = element.querySelector('.boxtext');
    element.addEventListener('click', ()=>{
        if(boxtext.innerText === ''){
            boxtext.innerText = turn;
            turn = changeTurn();
            audioTurn.play();
            checkWin();
            if (!isgameover){
                document.getElementsByClassName("info")[0].innerText  = "Turn for " + turn;
            }
            if(count===8){
                wingame.play()
                document.getElementsByClassName("info")[0].innerText  = " DRAW !!";
            } 
        }
    })
})

// Add onclick listener to reset button
reset.addEventListener('click', ()=>{
    let boxtexts = document.querySelectorAll('.boxtext');
    Array.from(boxtexts).forEach(element => {
        element.innerText = ""
    });
    turn = "X"; 
    count=0
    isgameover = false
    document.querySelector(".line").style.width = "0vw";
    document.getElementsByClassName("info")[0].innerText  = "Turn for " + turn;
    document.querySelector('.imgbox').getElementsByTagName('img')[0].style.width = "0px"
})

