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

// this handles when the forward button is clicked
function goFoward(){
  // update the master page number setting and fetch the next page of data
  page += 1
  getMonsters()
}

// this handles when the back button is clicked
function goBack(){
  // update the master page number setting and fetch the previous page of data
  // master page number is not updated when at page 1
  if (page > 1){
    page -= 1
    getMonsters()
  } 
}

// get data based on page number
function getMonsters(){     
  fetch(`http://localhost:3000/monsters/?_limit=50&_page=${page}`)
  .then(resp => resp.json())
  .then(monsters => renderMonsters(monsters));

}

// this renders all monsters
function renderMonsters(monsters){
  let p = ""
  monsters.forEach(monster => {
    p += `<p>${monster.name} age: ${monster.age}</p><p>${monster.description}</p>`  
  });
  monsterContainer.innerHTML = p

  // disable the forward button when in last page
  if (monsters.length < 50){
    forward.disabled = true
  } else {
    forward.disabled = false
  }
  // disable the back button when in first page
  if (page === 1) {
    back.disabled = true
  } else {
    back.disabled = false
  }
}

// create new monster
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