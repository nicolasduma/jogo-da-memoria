const front = "card-front"
const back = "card-back"

startGame()

function startGame() {
    initializeBord(game.createCardsFromTecnologies())
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
        console.log(game.lockMode)

        this.classList.add("flip")

        if (game.secondCard) {

            if (game.checkPair()) {

                game.clearCards()

                if (game.checkGameOver()) {
                    setTimeout (() => {
                        document.getElementById("game-over").classList.remove("d-none")
                        document.getElementById("game-over").classList.add("d-flex")
                    }, 400)
                }

            } else {

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
