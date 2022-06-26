const nav = document.querySelector("nav")
const startButton = document.getElementById("startbutton")
const topicList = document.createElement("ul")
const wordButton = document.createElement("a")

const steps = [
    {
        label: "SPRECHEN TEIL 1 (A1)",
        level: 1,
        topics: [
            {
                topic: "Vorstellen",
                words: ['Name?', 'Alter?', 'Land?', 'Wohnort?', 'Sprachen?', 'Beruf?', 'Hobby?']
            }
        ]
    },
    {
        label: "SPRECHEN TEIL 2 (A1)",
        level: 1,
        topics: [
            {
                topic: "Essen & Trinken",
                words: ['Frühstück', 'Lieblingsessen', 'Sonntag', 'Bier', 'Fleisch', 'Brot']
            },
            {
                topic: "Einkaufen",
                words: ['Zeitung', 'Kasse', 'Obst', 'Schuhe', 'Buch', 'Stadtplan']
            },
        ]
    },
    {
        label: "SPRECHEN TEIL 2 (A2)",
        level: 2,
        topics: [
            {
                topic: "Fragen zur Person",
                words: ['Urlaub', 'Arbeit', 'Einkaufen', 'Feste', 'Musik', 'Soziale Netzwerke', 'Wohnen', 'Kleidung', 'Ausbildung', 'Bücher', 'Tiere', 'Sport', 'Prüfung', 'Medien', 'Arbeitszeit', 'Telefonnummer', 'Aussehen', 'Herkunft', 'Haushalt', 'Verkehrsmittel', 'Essen und Trinken', 'Hobby', 'Lohn/Gehalt', 'Geburtstag', 'Familie', 'Lieblingsessen', 'Alter', 'Wetter', 'Kleidung', 'Freunde']
            }
        ]
    }
]

let activeGame

class WordGame {

    words = []
    activeIdx
    wordArea
    topicArea

    constructor(s) {
        this.level = s.level

        s.topics.forEach(t => {
            t.words.forEach( w => {
                this.words.push({
                    topic: t.topic,
                    word: w
                })
            })
        })
        this.buildWordGame()
        this.nextWord()
    }

    buildWordGame() {
        wordButton.innerHTML = ""
        wordButton.className = "simplebutton word-game-card"
        this.topicArea = document.createElement("h1")
        wordButton.appendChild(this.topicArea)
        this.wordArea = document.createElement("span")
        wordButton.appendChild(this.wordArea)
        wordButton.onclick = () => {
            this.words.splice(this.activeIdx, 1)
            this.nextWord()
        }
    }

    randomNumber() {
        this.activeIdx = Math.floor(Math.random() * this.words.length);
        return this.activeIdx
    }

    nextWord() {
        if (this.words.length > 0) {
            const w = this.words[this.randomNumber()]
            this.topicArea.innerText = w.topic
            this.wordArea.innerText = w.word
        } else {
            this.wordArea.innerText = "Du hast alle Wörter durch :D"
            wordButton.onclick = () => {
                nav.innerHTML = ""
                nav.appendChild(topicList)
            }
        }
    }
}

function topicButtonFunc(step) {
    nav.innerHTML = ""
    nav.appendChild(wordButton)
    activeGame = new WordGame(step)
}


startButton.onclick = function () {
    nav.innerHTML = ""
    nav.appendChild(topicList)
    steps.forEach(t => {
        const link = document.createElement("a")
        const li = document.createElement("li")
        li.appendChild(link)
        link.innerText = t.label
        link.className = "simplebutton"
        link.onclick = () => topicButtonFunc(t)
        topicList.appendChild(li)
    })
}
