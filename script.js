let currentlyPlaying = true

let doorImage1 = document.getElementById('door1')
let doorImage2 = document.getElementById('door2')
let doorImage3 = document.getElementById('door3')

let beachDoorPath = "https://content.codecademy.com/projects/chore-door/images/beach.svg"
let spaceDoorPath = "https://content.codecademy.com/projects/chore-door/images/space.svg"
let botDoorPath = "https://content.codecademy.com/projects/chore-door/images/robot.svg"

let numClosedDoors = 3 // number of doors in the game
let openDoor1, openDoor2, openDoor3
let closedDoorPath = "https://content.codecademy.com/projects/chore-door/images/closed_door.svg"

let startButton = document.getElementById('start')

const isBot = door => door.src === botDoorPath

const isClicked = door => !(door.src === closedDoorPath)

const playDoor = door => {
  numClosedDoors--
  if (numClosedDoors === 0) {
    gameOver('win')
  } else if (isBot(door)) {
    gameOver()
  }
}

const randomChoreDoorGenerator = () => {
  let choreDoor = Math.floor(Math.random() * numClosedDoors)
  if (choreDoor === 0) {
    openDoor1 = botDoorPath
    openDoor2 = beachDoorPath
    openDoor3 = spaceDoorPath
  } else if (choreDoor === 1) {
    openDoor2 = botDoorPath
    openDoor1 = beachDoorPath
    openDoor3 = spaceDoorPath
  } else if (choreDoor === 2) {
    openDoor3 = botDoorPath
    openDoor1 = beachDoorPath
    openDoor2 = spaceDoorPath
  }
}

doorImage1.onclick = () => {
  if (isClicked(doorImage1)) return  // if the same door is clicked again, we won't decrease the numCloseDoors
  if (currentlyPlaying && !isClicked(doorImage1)) {
    doorImage1.src = openDoor1
    playDoor(doorImage1)
  }
}

doorImage2.onclick = () => {
  if (isClicked(doorImage2)) return
  if (currentlyPlaying && !isClicked(doorImage2))  {
    doorImage2.src = openDoor2
    playDoor(doorImage2)
  }
}

doorImage3.onclick = () => {
  if (isClicked(doorImage3)) return 
  if (currentlyPlaying && !isClicked(doorImage3)) {
    doorImage3.src = openDoor3
    playDoor(doorImage3)
  }
}

const startRound = () => {
  doorImage1.src = closedDoorPath
  doorImage2.src = closedDoorPath
  doorImage3.src = closedDoorPath
  numClosedDoors = 3
  startButton.innerHTML = "Good luck!"
  currentlyPlaying = true
  randomChoreDoorGenerator()
}

startButton.onclick = () => {
  if (currentlyPlaying === false) startRound()
}

const gameOver = status => {
  if (status === 'win') {
    startButton.innerHTML = 'You win! Play again?'
  } else {
    startButton.innerHTML = 'Game over! Play again?'
  }
  currentlyPlaying = false
}

startRound()