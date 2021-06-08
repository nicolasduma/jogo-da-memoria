const front = "card-front"
const back = "back"

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
