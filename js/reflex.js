const startingArea = document.querySelector('.starting')
const waitingArea = document.querySelector('.waiting')
const clickArea = document.querySelector('.click')
const timeResult = document.querySelector('.time')
const resultsUl = document.querySelector('.results-ul')
const popupShadow = document.querySelector('.popup-shadow')
const resultsBox = document.querySelector('.results')
const avgResult = document.querySelector('.avg-result')
const guide = document.querySelector('.guide')
const guideCount = document.querySelector('.guide-count')

let count = 0
let countTime
let detectSpam = 0

let countArray = []

const reset = () => {
	clearInterval(countTime)
	count = 0
	startingArea.style.display = 'flex'
	waitingArea.style.display = 'none'
	clickArea.style.display = 'none'
}

const waiting = () => {
	startingArea.style.display = 'none'
	waitingArea.style.display = 'flex'
}

const showGreen = () => {
	waitingArea.style.display = 'none'
	clickArea.style.display = 'flex'

	countTime = setInterval(() => {
		count++
	}, 1)
}

const getRandomDelay = (min, max) => {
	return Math.floor(Math.random() * (max - min + 1)) + min
}

const startGame = () => {
	setTimeout(showGreen, getRandomDelay(3000, 5000))
}

const calculateAverage = () => {
	let sum = 0
	for (let i = 0; i < countArray.length; i++) {
		sum += countArray[i]
	}
	return sum / countArray.length
}

const guiding = () => {
	if (countArray.length == 0) {
		guideCount.textContent = '5'
	} else if (countArray.length == 1) {
		guideCount.textContent = '4'
	} else if (countArray.length == 2) {
		guideCount.textContent = '3'
	} else if (countArray.length == 3) {
		guideCount.textContent = '2'
	} else if (countArray.length == 4) {
		guideCount.textContent = '1'
	} else {
		guide.style.display = 'none'
	}
}

const openResults = () => {
	const newTime = document.createElement('li')
	newTime.innerHTML = `Time nr. ${countArray.length}: <span>${count}ms</span>`
	resultsUl.append(newTime)

	if (countArray.length == 5) {
		resultsBox.style.display = 'block'
		popupShadow.style.display = 'block'
		avg = calculateAverage()
		avgResult.textContent = `${avg.toFixed()}ms`

		if (avg <= 220) {
			avgResult.style.color = 'lime'
		} else if (avg <= 400) {
			avgResult.style.color = 'orange'
		} else {
			avgResult.style.color = 'red'
		}
	}
}

waitingArea.addEventListener('click', () => {
	detectSpam++

	if (detectSpam >= 3) {
		location.reload()
	}
})

clickArea.addEventListener('click', () => {
	clearInterval(countTime)
	detectSpam = 0
	count = count * 3
	timeResult.textContent = `${count}ms`
	countArray.push(count)

	if (count <= 220) {
		timeResult.style.color = 'lime'
	} else if (count <= 400) {
		timeResult.style.color = 'orange'
	} else {
		timeResult.style.color = 'red'
	}

	guiding()
	openResults()
	reset()
})

startingArea.addEventListener('click', () => {
	waiting()
	startGame()
})
