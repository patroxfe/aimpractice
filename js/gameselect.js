const animations = document.querySelectorAll('.animation')
const selectMode = document.querySelector('.select-mode-box')

const clearAnimations = () => {
	animations.forEach(animation => {
		animation.style.display = 'none'
	})
	selectMode.style.display = 'block'
}
setTimeout(clearAnimations, 4650)