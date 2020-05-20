// DONE but without pagination. 

const MONSTER_URL = "http://localhost:3000/monsters"
const monsterContainer = document.querySelector("#monster-container")
const form = document.querySelector("form")
form.addEventListener("submit", createMonster)

function fetchMonsters() {
  fetch(MONSTER_URL)
  .then(resp => resp.json())
  .then(monsters => {
    renderMonsters(monsters)
  })
}

function renderMonsters(monsters) {
  monsters.forEach(monster => renderOneMonster(monster))
}

function renderOneMonster(monster) {
  const monsterCard = `<div data-monster-name="${monster.name}">
    <h3>${monster.name}</h2>
    <strong><p>Age: ${monster.age}</p></strong>
    <p>Description: ${monster.description}</p>
  </div>`
  monsterContainer.innerHTML += monsterCard
}

function createMonster(event){
  event.preventDefault()
  const name = event.target[0].value
  const age = event.target[1].value
  const description = event.target[2].value

  const formData = {
    name,
    age,
    description
  }

  const formObj= {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(formData)
  }

  fetch(MONSTER_URL,formObj)
  .then(resp=>resp.json())
  .then(monster=> {
    console.log(monster)
    renderOneMonster(monster)
  })
  event.target.reset()
}





fetchMonsters();