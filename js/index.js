const monsterContainer = document.getElementById("monster-container")
const forward = document.getElementById("forward")
const back = document.getElementById("back")
const form = document.querySelector("form");

let page = 1

function main(){

getMonsters()
forward.addEventListener("click", goFoward)
back.addEventListener("click", goBack)
form.addEventListener("submit", createNewMonster);
}

function goFoward(){
  page += 1
  getMonsters()
}

function goBack(){
  if (page > 1){
    page -= 1
    getMonsters()
  } 
}
function getMonsters(){     
  fetch(`http://localhost:3000/monsters/?_limit=50&_page=${page}`)
  .then(resp => resp.json())
  .then(monsters => renderMonsters(monsters));

}

function renderMonsters(monsters){
  let p = ""
  monsters.forEach(monster => {
    p += `<p>${monster.name} age: ${monster.age}</p><p>${monster.description}</p>`  
  });
  monsterContainer.innerHTML = p
  if (monsters.length < 50){
    forward.disabled = true
  } else {
    forward.disabled = false
  }
  if (page === 1) {
    back.disabled = true
  } else {
    back.disabled = false
  }
}

function createNewMonster(event){
  event.preventDefault();

  const formData = {
    name: event.target[0].value,
    age: Number(event.target[1].value),
    description: event.target[2].value
  }

  event.target.reset();

  const reqObj = {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
      // Accept: "application/json"
    },
    body: JSON.stringify(formData)
  }
  fetch('http://localhost:3000/monsters', reqObj)
  .then(resp => resp.json())
  .then(monster => console.log(monster))
}

main()