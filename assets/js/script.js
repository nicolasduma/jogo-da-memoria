const front = "card-front"
const back = "card-back"

const technologies = [
    "bootstrap",
    "css",
    "electron",
    "firebase",
    "html",
    "javascript",
    "jquery",
    "mongo",
    "node",
    "react",
]

let cards = null

startGame()

function startGame() {
    cards = createCardsFromTecnologies()
    shuffleCards(cards)

    initializeBord(cards)
}

function initializeBord(cards) {
    let gameBord = document.getElementById("game-bord")

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

function createCardsFromTecnologies() {
    let cards = []

    for (let technology of technologies) {
        cards.push(
            {
                id: technology + "_1",
                icon: technology,
                flipped: false,
            },
        
            {
                id: technology + "_2",
                icon: technology,
                flipped: false,
            }
        )
    }

    return cards
}

function shuffleCards(cards) {
    let currentIndex = cards.length
    let randomIndex = 0

    while (currentIndex !== 0) {
        randomIndex = Math.round(Math.random() * currentIndex)
        currentIndex--

        [cards[randomIndex], cards[currentIndex]] = [cards[currentIndex], cards[randomIndex]]
    }
}

function flipCard() {
    this.classList.add("flip")
}
