const front = "card-front"
const back = "card-back"

let currentMovements

let allGamesMovements = []
let movementLowerOfAll = null

let salvedMovement = localStorage.getItem("movementLowerOfAll")

salvedMovement = salvedMovement != null ? parseInt(salvedMovement) : 0
document.getElementById("best-game-moviments").innerText = salvedMovement

startGame()

function startGame() {
    initializeBord(game.createCardsFromTecnologies())

    currentMovements = 0
    document.getElementById("current-game-movements").innerText = currentMovements

    game.clearTimer = false

    game.timer(100, updateTimer, updateScreenGameOverByLoss)
}

function checkBestMovement() {

    allGamesMovements.push(currentMovements)
    
    if (salvedMovement === 0) {
        salvedMovement = currentMovements
    }

    movementLowerOfAll = allGamesMovements.reduce(((total, element) => total < element ? total : element), salvedMovement)

    document.getElementById("best-game-moviments").innerText = movementLowerOfAll

    while (allGamesMovements.length > 0) {
        allGamesMovements.pop()
    }

    allGamesMovements.push(movementLowerOfAll)

    localStorage.setItem("movementLowerOfAll", movementLowerOfAll)

}

function updateTimer(time) {
    document.getElementById("time-left").innerText = time
}

function updateScreenGameOverByLoss() {
    game.lockMode = true

    document.getElementById("game-over-text").innerHTML = "Que pena, você não completou o jogo a tempo!"

    setTimeout (() => {
        document.getElementById("game-over").classList.remove("d-none")
        document.getElementById("game-over").classList.add("d-flex")
    }, 200)

}

function initializeBord(cards) {
    let gameBord = document.getElementById("game-bord")
    gameBord.innerHTML = ""

    for (let card of cards) {
        let cardElement = document.createElement("div")
        cardElement.id = card.id
        cardElement.classList.add("card")
        cardElement.dataset.icon = card.icon

        createCardContent(card, cardElement)

        cardElement.onclick = flipCard

        gameBord.appendChild(cardElement)
    }
}

function createCardContent(card, cardElement) {
    createCardFace(front, card, cardElement)
    createCardFace(back, card, cardElement)
}

function createCardFace(face, card, element) {
    let cardElementFace = document.createElement("div")
    cardElementFace.classList.add(face)

    if (face === front) {

        let iconElement = document.createElement("img")
        iconElement.classList.add("icon")
        iconElement.src = "./assets/images/" + card.icon + ".png"
        iconElement.alt = "logo " + card.icon

        cardElementFace.appendChild(iconElement)

    } else if (face === back) {

        cardElementFace.innerHTML = "&lt;/&gt;"
        
    }

    element.appendChild(cardElementFace)
}

function flipCard() {

    if (game.setCard(this.id)) {

        this.classList.add("flip")

        if (game.secondCard) {

            currentMovements++

            document.getElementById("current-game-movements").innerText = currentMovements

            if (game.checkPair()) {

                game.clearCards()

                if (game.checkGameOver()) {

                    playSound("board-complete")

                    document.getElementById("total-game-movements").innerText = currentMovements

                    checkBestMovement()

                    game.clearTimer = true

                    setTimeout (() => {
                        document.getElementById("game-over").classList.remove("d-none")
                        document.getElementById("game-over").classList.add("d-flex")
                    }, 400)

                } else {

                    playSound("cards-are-pair")

                }

            } else {

                playSound("cards-not-are-pair")

                setTimeout(() => {

                    document.getElementById(game.firstCard.id).classList.remove("flip")
                    document.getElementById(game.secondCard.id).classList.remove("flip")

                    game.unflipCards()

                }, 800)

            }
        }

    }

}

function restartGame() {
    game.clearCards()
    startGame()

    document.getElementById("game-over").classList.remove("d-flex")
    document.getElementById("game-over").classList.add("d-none")
}

function playSound(typeSound) {
    setTimeout(() => {
        try {

            if (typeSound === "cards-not-are-pair") {
    
                document.getElementById("sound-of-cards-not-are-pair").play()
    
            } else if (typeSound === "cards-are-pair") {

                document.getElementById("sound-of-cards-are-pair").play()                

            } else if (typeSound === "board-complete") {
    
                document.getElementById("sound-of-board-complete").play()
    
            } 
    
        } catch {
    
            return
    
        }
    }, 100)
}
