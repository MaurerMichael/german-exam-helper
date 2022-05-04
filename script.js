const nav = document.querySelector("nav")
const startButton = document.getElementById("startbutton")
const topicList =document.createElement("ul")
const wordButton = document.createElement("a")

const topics = [
    {
        topic: "Fragen zur Person",
        words: ['Urlaub', 'Arbeit','Einkaufen', 'Feste', 'Musik', 'Soziale Netzwerke', 'Wohnen', 'Kleidung', 'Ausbildung', 'Bücher', 'Tiere', 'Sport', 'Prüfung', 'Medien', 'Arbeitszeit', 'Telefonnummer', 'Aussehen', 'Herkunft', 'Haushalt', 'Verkehrsmittel', 'Essen und Trinken', 'Hobby', 'Lohn/Gehalt', 'Geburtstag', 'Familie', 'Lieblingsessen', 'Alter', 'Wetter', 'Kleidung', 'Freunde']
    }
]

let activeGame

class WordGame {

    words = []
    activeIdx
    wordArea

    constructor(t) {
        this.words = t.words
        this.topic = t.topic
        this.buildWordGame()
        this.nextWord()
    }

    buildWordGame() {
        wordButton.innerHTML = ""
        wordButton.className = "simplebutton word-game-card"
        const topicArea = document.createElement("h1")
        topicArea.innerText = this.topic
        wordButton.appendChild(topicArea)
        this.wordArea = document.createElement("span")
        wordButton.appendChild(this.wordArea)
        wordButton.onclick = () => {
            this.words.splice(this.activeIdx, 1)
            this.nextWord()
        }
    }

    randomNumber() {
        return Math.floor(Math.random() * this.words.length);
    }

    nextWord() {
        if(this.words.length > 0){
            this.wordArea.innerText = this.words[this.randomNumber()]
        }else {
            this.wordArea.innerText = "Du hast alle Wörter durch :D"
        }
    }
}

function topicButtonFunc(topic) {
    nav.innerHTML = ""
    nav.appendChild(wordButton)
    activeGame = new WordGame(topic)
}

startButton.onclick = function () {
    nav.innerHTML = ""
    nav.appendChild(topicList)
    topics.forEach(t => {
        const link = document.createElement("a")
        const li = document.createElement("li")
        li.appendChild(link)
        link.innerText = t.topic
        link.className = "simplebutton"
        link.onclick = ()=>topicButtonFunc(t)
        topicList.appendChild(li)
    })
}
