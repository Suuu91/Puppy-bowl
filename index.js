const main = document.querySelector(`main`)

const getPuppyData = async() => { 
  const response = await fetch(`https://fsa-puppy-bowl.herokuapp.com/api/2409-ftb-et-web-ft/players`)
  const responseJson = await response.json()
  const allPuppies = responseJson.data.players
  return allPuppies
}

const showAllPuppy = async() => {
  const puppyList = await getPuppyData()
  const puppyLIs = puppyList.map((singlePuppy) => {
    return `
        <li class = IDs> ${singlePuppy.id}</li> 
        <li>${singlePuppy.name}</li>
        <br>
      `
  })
  const ul = document.createElement(`ul`)
  ul.innerHTML = puppyLIs.join(``)
  main.replaceChildren(ul)

  const LIs = document.querySelectorAll(`.IDs`)
  LIs.forEach((singlePuppyli) => {
    singlePuppyli.addEventListener(`click`, (event) => {
      showSinglePuppy(event.target.innerHTML)
      console.log(event.target.innerHTML)
    })
  })
}

const showSinglePuppy =async (puppyID) => {
  const response = await fetch(`https://fsa-puppy-bowl.herokuapp.com/api/2409-ftb-et-web-ft/players/${puppyID}`)
  const responseJson = await response.json()
  const singlePuppyData = responseJson.data.player
  console.log(singlePuppyData)

  main.innerHTML =`
    <img src="${singlePuppyData.imageUrl}"/>
    <h3>ID: ${singlePuppyData.id}</h3>
    <h3>Name: ${singlePuppyData.name}</h3>
    <h3>Breed: ${singlePuppyData.breed}</h3>
    <h3>Team: ${singlePuppyData.team.name}</h3>
    <button> Return </button>
  `
  const button = document.querySelector(`button`)
  button.addEventListener(`click`,() => {
    showAllPuppy()
  })
}

showAllPuppy()