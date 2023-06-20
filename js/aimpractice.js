const popupShadow = document.querySelector('.popup-shadow')
const popupFirst = document.querySelector('.first')
const popupSecond = document.querySelector('.second')
const popupThird = document.querySelector('.third')
const btns = document.querySelectorAll('.btn')
const xmark = document.querySelectorAll('#close')

const showPopup = e => {
	clearPreviousPopup()

	const btnContent = e.target.textContent

	popupShadow.style.display = 'block'

	if (btnContent === 'How to play') {
		popupFirst.classList.toggle('active')
	} else if (btnContent === 'Sensitivity') {
		popupSecond.classList.toggle('active')
	} else if (btnContent === 'FAQ') {
		popupThird.classList.toggle('active')
	}
}

const clearPreviousPopup = () => {
	popupFirst.classList.remove('active')
	popupSecond.classList.remove('active')
	popupThird.classList.remove('active')
	popupShadow.style.display = 'none'
}



btns.forEach(btn => btn.addEventListener('click', showPopup))
xmark.forEach(xmarkus => xmarkus.addEventListener('click', clearPreviousPopup))
window.addEventListener('click', e => {
	if (e.target === popupShadow) {
		clearPreviousPopup()
	} else {
		false
	}
})



