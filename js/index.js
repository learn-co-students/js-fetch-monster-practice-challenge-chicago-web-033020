let page = 1;
const forward = document.querySelector("#forward")
const back = document.querySelector("#back")
const form = document.querySelector("form")
const container = document.querySelector("#monster-container")

forward.addEventListener("click", move)
back.addEventListener("click", move)
form.addEventListener("submit", formDeal)

function formDeal(event){
  event.preventDefault();
  const formData = { name: event.target[0].value, age: event.target[1].value, description: event.target[2].value }
  form.reset();
  const reqObj = {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(formData)
  }

  fetch("http://localhost:3000/monsters", reqObj)
  .then(resp => resp.json())
  .then(newMonster => {
    container.innerHTML += createOneMonster(newMonster)
  })
}

function move(event){
  if (event.target.id === "forward"){
    page += 1;
    getMonsters()
  } else if (event.target.id === "back"){
      if (page === 1){
        alert("No monsters here!")
      } else {
    page -= 1;
    getMonsters()
    }
  }
}

function getMonsters(){
  fetch(`http://localhost:3000/monsters/?_limit=50&_page=${page}`)
  .then(resp => resp.json())
  .then(json => {
    if(json.length === 0){
      alert("No monsters here!")
    } else {
    renderMonsters(json)
  }
  })
}

function renderMonsters(monsters){
  allMonsters = []
  monsters.forEach(monster => {
    allMonsters.push(createOneMonster(monster))
  })
  container.innerHTML = allMonsters.join('')
}

function createOneMonster(monster){
  return `<div id="${monster.id}><h2>Name: ${monster.name}<h2><h3>Age: ${monster.age}</h3><p>Description: ${monster.description}</p></div>`
}

getMonsters()