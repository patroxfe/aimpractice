const circlesContainer = document.querySelector('.circles')
const circles = document.querySelectorAll('.circle')
const hitCount = document.querySelector('.hits-count')
const missCount = document.querySelector('.miss-count')
const leftCount = document.querySelector('.left-count')
const scoreboard = document.querySelector('.score-aim')
const playBtn = document.querySelector('.play-btn')
const staticCircle = document.querySelector('.static')
const stopWatch = document.querySelector('.stopwatch')

const levelContainer = document.querySelector('.choose-level-container')
const levels = document.querySelectorAll('.level')

const popupShadow = document.querySelector('.popup-shadow')
const resultsAimContainer = document.querySelector('.results-aim')
const resultsTime = document.querySelector('.results-time')
const resultsHits = document.querySelector('.results-hits')
const resultsMiss = document.querySelector('.results-miss')
const resultsAccuracy = document.querySelector('.results-accuracy')
const resultsScore = document.querySelector('.results-score')

let clicks = 0
let hit = 0
let miss = 0
let accuracy = 0
let score

let countTime
let minutes = 0
let seconds = 0

const watchTime = () => {
	countTime = setInterval(() => {
		seconds++
		stopWatch.textContent = `${seconds}s`
	}, 1000)
}

const pointCount = () => {
	score = (hit * 953 - miss * 195) / seconds
}

const chooseLevel = e => {
	e.target.classList.add('active')
	levelContainer.style.display = 'none'
	scoreboard.style.display = 'block'
	playBtn.style.display = 'block'
}

const startGame = () => {
	playBtn.style.display = 'none'
	circlesContainer.style.display = 'block'
	staticCircle.style.display = 'block'
	hit = 0
	clicks = 0
	hitCount.textContent = '0'
	leftCount.textContent = '0'
}

const startCircle = e => {
	const topPosition = Math.floor(Math.random() * 100)
	const leftPosition = Math.floor(Math.random() * 100)

	e.stopPropagation()
	hit++
	counting()
	hitCount.textContent = `${hit}`
	e.target.style.display = 'none'

	const newCircle = document.createElement('div')
	newCircle.classList.add('circle')
	circlesContainer.append(newCircle)
	newCircle.style.top = `${topPosition}%`
	newCircle.style.left = `${leftPosition}%`

	levels.forEach(level => {
		if (level.classList.contains('easy') && level.classList.contains('active')) {
			newCircle.style.width = '50px'
			newCircle.style.height = '50px'
			staticCircle.style.width = '50px'
			staticCircle.style.height = '50px'
			counting()
			showResults()
		} else if (level.classList.contains('medium') && level.classList.contains('active')) {
			newCircle.style.width = '35px'
			newCircle.style.height = '35px'
			staticCircle.style.width = '35px'
			staticCircle.style.height = '35px'
			counting()
			showResults()
		} else if (level.classList.contains('hard') && level.classList.contains('active')) {
			newCircle.style.width = '20px'
			newCircle.style.height = '20px'
			staticCircle.style.width = '20px'
			staticCircle.style.height = '20px'
			counting()
			showResults()
		}
	})
	newCircle.addEventListener('click', startCircle)
	document.body.addEventListener('click', missCounting)
	counting()
}

const missCounting = () => {
	miss++
	missCount.textContent = `${miss}`
	counting()
	showResults()
}

const counting = () => {
	clicks = hit + miss
	leftCount.textContent = `${clicks}`
}

const showResults = () => {
	if (clicks == 75) {
		pointCount()
		accuracy = (hit / clicks) * 100

		resultsAimContainer.style.display = 'block'
		popupShadow.style.display = 'block'
		circlesContainer.style.display = 'none'
		staticCircle.style.display = 'none'
		scoreboard.style.display = 'none'
		clearInterval(countTime)

		resultsTime.textContent = `${stopWatch.textContent}`
		resultsMiss.textContent = `${miss}`
		resultsHits.textContent = `${hit}`
		resultsAccuracy.textContent = `${accuracy.toFixed()}%`

		if (score < 0) {
			resultsScore.textContent = 'Too much miss/time'
		} else {
			resultsScore.textContent = `${score.toFixed()}`
		}
	}
}

playBtn.addEventListener('click', watchTime)
playBtn.addEventListener('click', startCircle)
playBtn.addEventListener('click', startGame)
circles.forEach(circle => circle.addEventListener('click', startCircle))
levels.forEach(level => level.addEventListener('click', chooseLevel))
