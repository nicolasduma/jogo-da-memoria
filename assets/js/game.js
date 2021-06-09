let game = {

    technologies: [
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
    ],

    cards: [],

    createCardsFromTecnologies: function() {
        for (let technology of this.technologies) {
            this.cards.push(
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

        game.shuffleCards()
        return this.cards
    },

    shuffleCards: function() {
        let currentIndex = this.cards.length
        let randomIndex = 0
    
        while (currentIndex !== 0) {
            randomIndex = Math.round(Math.random() * currentIndex)
            currentIndex--
    
            [this.cards[randomIndex], this.cards[currentIndex]] = [this.cards[currentIndex], this.cards[randomIndex]]
        }
    },

}
