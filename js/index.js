const MONSTERS_URL = "http://localhost:3000/monsters"
let pageNo = 0
let maxId = 1001

document.addEventListener("DOMContentLoaded", e => {
    const form = document.querySelector('form')
    const monsterContainer = document.getElementById('monster-container')

    renderMonsters()
        
    function renderMonsters(keyword = null) {
        if (keyword === 'forward') {
            pageNo++
        }
        else if (keyword === 'back') {
            pageNo--
        }
        fetch(`${MONSTERS_URL}/?_limit=50&_page=${pageNo}`)
        .then(resp => resp.json())
        .then(monsters => 
            monsters.forEach(
                monster => monsterContainer.innerHTML += renderMonster(monster)
            )
        )
    }

    function renderMonster(monsterObj) {
        return `<div class='monster' id=${monsterObj.id}><h1>#${monsterObj.id}: ${monsterObj.name}</h1><h2>Age: ${monsterObj.age}</h2><p>${monsterObj.description}</p><button class='delete'>Delete ${monsterObj.name}</button></div>`
    }
    
    function deleteMonster(event) {
        // console.log(event.target.parentNode)
        const configObj = {method: 'DELETE'}
        fetch(`${MONSTERS_URL}/${event.target.parentNode.id}`, configObj)
        .then(resp => resp.json())
        .then(json => event.target.parentNode.remove())
    }

    form.addEventListener('submit', e => {
        e.preventDefault()

        const configObj = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"            
            },
            body: JSON.stringify(
                {
                    name: document.getElementById('name').value,
                    age: document.getElementById('age').value,
                    description: document.getElementById('description').value,
                }
            )
        }

        fetch(MONSTERS_URL, configObj)
        .then(resp => resp.json())
        .then(newMonster => {
            console.log(newMonster)
            monsterContainer.innerHTML += renderMonster(newMonster)
            maxId++
            })
        }
    )

    document.addEventListener("click",
        e => {
            if (e.target.id === 'back' && pageNo > 0) {
                monsterContainer.innerHTML = ""
                renderMonsters('back') 
            }
            else if (e.target.id === 'forward' && pageNo < maxId - 50) {
                monsterContainer.innerHTML = ""
                renderMonsters('forward')
            }
            else if (e.target.className === 'delete') {
                deleteMonster(e)
            }
        }
    )

    }
)