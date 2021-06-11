const front = "card-front"
const back = "card-back"

let currentMovements = 0

let allGamesMovements = []
let movementLowerOfAll = null

let salvedMovemet = localStorage.getItem("movementLowerOfAll")

if (salvedMovemet != "null") {
    salvedMovemet = parseInt(salvedMovemet)
    document.getElementById("best-game-moviments").innerText = salvedMovemet
}

startGame()

function startGame() {
    initializeBord(game.createCardsFromTecnologies())
    currentMovements = 0
    document.getElementById("current-game-movements").innerText = currentMovements
}

function updateTimer(time) {
    document.getElementById("time-left").innerText = time
}

function checkBestMovement() {

    allGamesMovements.push(currentMovements)
    
    if (salvedMovemet == "null") {
        salvedMovemet = currentMovements
    }

    movementLowerOfAll = allGamesMovements.reduce(checkLowerNumber, salvedMovemet)

    while (allGamesMovements.length > 0) {
        allGamesMovements.pop()
    }

    allGamesMovements.push(movementLowerOfAll)

    localStorage.setItem("movementLowerOfAll", movementLowerOfAll)

    document.getElementById("best-game-moviments").innerText = movementLowerOfAll
}

function checkLowerNumber(total, element) {
    return total < element ? total : element
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
