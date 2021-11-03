const shortenLinkArea = document.createElement('div')
shortenLinkArea.classList.add('shorten-link')
shortenLinkArea.innerHTML = `
  <h3>Here is your Shorten Link</h3>
  <div class="link-area">
    <div class="link"></div>
    <div class="copy">
      <img src="/img/copy.svg" alt="Copy Shorten Link" />
    </div>
  </div>
  <input
    type="text"
    class="sr-only"
  />
`

const form = document.querySelector('form')
form.addEventListener('submit', async e => {
  e.preventDefault()

  const apiResponse = await fetch('/', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({ url: document.querySelector('form input').value })
  }).then(res => res.json())

  shortenLinkArea.querySelector(
    '.link'
  ).innerText = `localhost:3000/r/${apiResponse.url}`
  shortenLinkArea
    .querySelector('.sr-only')
    .setAttribute('value', `localhost:3000/r/${apiResponse.url}`)
  document.querySelector('main').appendChild(shortenLinkArea)
  document.querySelector('main p').remove()
  document.querySelector('main').innerHTML += `
  <p>
    Made with <span>❤</span> by
    <a href="https://github.com/IgorVini25" target="_blank">IgorVini25</a>
  </p>
  `

  const copy = document.querySelector('.shorten-link .link-area .copy')
  const copyInput = document.querySelector('.shorten-link input')

  copy.onclick = () => {
    copyInput.select()
    document.execCommand('copy')
    error('Copied!', false)
  }
})
