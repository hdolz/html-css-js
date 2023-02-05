let player = true //player turn - true = p1, false = p2
let p1 = [] //squares marked
let p2 = [] 
let winnerMarks = []
let markedSquares = 0

function eventListener(id){
    console.log("click: ", id)
    let marked = markSquare(player, id)
    if(marked){
        markedSquares += 1
        //push to list the square marked by each player
        if(player){
            p1.push(id)
        } else {
            p2.push(id)
        }

        let p1Winner = checkWinner(p1)
        let p2Winner = checkWinner(p2)

        if(p1Winner) {
            console.log("p1 winner")
            announceWinner(player)
            highLightMarks(winnerMarks)
            increaseScore(player)
            gameGridDisabled(true)
            return
        }
        if(p2Winner) {
            console.log("p2 winner")
            announceWinner(player)
            highLightMarks(winnerMarks)
            increaseScore(player)
            gameGridDisabled(true)
            return
        }
        player = !player
        showTurnMessage()
        let gameTie = checkGameTie(markedSquares)
        if(gameTie){
            gameGridDisabled(true)
            showGameTieMessage()
        }
    }
}

function showGameTieMessage(){
    let messageP1 = document.getElementById("p1turn")
    messageP1.innerText = "TIE"
    messageP1.hidden = false
    let messageP2 = document.getElementById("p2turn")
    messageP2.innerText = "TIE"
    messageP2.hidden = false
}

function checkGameTie(qtd){
    if(qtd == 9) //all squares marked
        return true
    return false
}

function highLightMarks(marks) {
    for(let i=0;i<marks.length;i++){
        let square = document.getElementById(marks[i])
        square.style.color = "red"
    }
}

function increaseScore(player){
    let scoreId = player ? "scoreP1" : "scoreP2"
    let score = document.getElementById(scoreId)
    let value = score.innerHTML
    value = parseInt(value) + 1
    score.innerHTML = value
}

function announceWinner(player){
    let messageId = player ? "p1turn" : "p2turn"
    let element = document.getElementById(messageId)
    console.log(element)
    element.hidden = false
    element.innerHTML = "Winner!"
}

function addWinnerMarks(marks){
    winnerMarks.push(marks[0])
    winnerMarks.push(marks[1])
    winnerMarks.push(marks[2])
}

function checkWinner(pList){
    if(pList.includes(1) && pList.includes(2) && pList.includes(3))
        addWinnerMarks([1,2,3])
    if(pList.includes(4) && pList.includes(5) && pList.includes(6))
        addWinnerMarks([4,5,6])
    if(pList.includes(7) && pList.includes(8) && pList.includes(9))
        addWinnerMarks([7,8,9])
    if(pList.includes(1) && pList.includes(4) && pList.includes(7))
        addWinnerMarks([1,4,7])
    if(pList.includes(2) && pList.includes(5) && pList.includes(8))
        addWinnerMarks([2,5,8])
    if(pList.includes(3) && pList.includes(6) && pList.includes(9))
        addWinnerMarks([3,6,9])
    if(pList.includes(1) && pList.includes(5) && pList.includes(9))
        addWinnerMarks([1,5,9])
    if(pList.includes(7) && pList.includes(5) && pList.includes(3))
        addWinnerMarks([7,5,3])
    if(winnerMarks.length > 0)
        return true
    return false
}

function gameGridDisabled(state){
    for(let i=1;i<10;i++){
        document.getElementById(i).disabled = state
    }
}

function clearGameSquares(){
    for(let i=1;i<10;i++){
        let square = document.getElementById(i)
        square.innerHTML = ""
        square.style.color = "black"
    }
}

function markSquare(player, id){
    console.log("mark: ", player, id)
    let square = document.getElementById(id)
    let value = square.innerHTML
    if(!value) {
        let mark = player ? "X" : "O"
        square.innerHTML = mark
        return true
    }
    return false
}

function showTurnMessage(){
    document.getElementById("p1turn").hidden = !player
    document.getElementById("p2turn").hidden = player
}

function resetTurnMessage(){
    document.getElementById("p1turn").innerText = "Your turn"
    document.getElementById("p2turn").innerText = "Your turn"
}

function resetGame(){
    gameGridDisabled(false)
    clearGameSquares()
    p1 = []
    p2 = []
    winnerMarks = []
    markedSquares = 0
    player = true
    resetTurnMessage()
    showTurnMessage()
}