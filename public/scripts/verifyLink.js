const input = document.querySelector('form input')

const errorDiv = document.querySelector('#error')
const errorText = document.querySelector('#error p')
const errorTimer = document.querySelector('#error .error-timer progress')

input.addEventListener('invalid', function (e) {
  e.preventDefault()
  error('Invalid URL', true)
})

function error(message, error) {
  // Reset
  errorDiv.classList.remove('active')

  errorTimer.value = 0
  errorText.innerHTML = `<span>!</span> ${message}`
  errorDiv.classList.add('active')

  if (!error) {
    errorDiv.classList.add('not-error')
  }

  var i = setInterval(function () {
    errorTimer.value >= 100
      ? (clearInterval(i),
        errorDiv.classList.remove('active'),
        errorDiv.classList.remove('not-error'))
      : (errorTimer.value += 1)
  }, 70)
}

const copy = document.querySelector('.shorten-link .link-area .copy')
const copyInput = document.querySelector('.shorten-link input')

copy.onclick = () => {
  copyInput.select()
  document.execCommand('copy')
  error('Copied!', false)
}
