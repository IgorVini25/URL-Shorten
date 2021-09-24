const { reset } = require('nodemon')
const mysql = require('mysql')
const con = require('../db/config')
const { all } = require('../route')

// Make a Query
async function dbQuery(query) {
  return await new Promise(function (resolve, reject) {
    con.query(query, (err, result) => {
      if (err) reject(err)

      resolve(result)
    })
  })
}

// Generate code Function
const letters = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'o',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z'
]
function generateCode() {
  let code = ''
  for (var i = 0; i < 6; i++) {
    const numberOrLetter = Math.floor(Math.random() * 2)

    if (numberOrLetter == 0) {
      const number = Math.floor(Math.random() * 10)
      code += number.toString()
    } else {
      const sortLetter = Math.floor(Math.random() * 26)
      const sortCase = Math.floor(Math.random() * 2)
      const letter =
        sortCase == 0 ? letters[sortLetter] : letters[sortLetter].toUpperCase()
      code += letter
    }
  }
  return code
}

module.exports = {
  async createLink(req, res) {
    // If user try send a link without frontend, block this
    const link = req.body.url

    const urlCode = generateCode()

    const verifyCodes = await dbQuery('SELECT urlCode FROM global')
    verifyCodes.forEach(codes => {
      if (codes.urlCode == urlCode) {
        generateCode()
      }
    })

    createShortenLink(urlCode, link)

    function createShortenLink(code, link) {
      dbQuery(
        `INSERT INTO global (urlCode, redirect) VALUES ('${code}', '${link}')`
      )
    }
    res.render('index', { shortenUrl: true, code: urlCode })
  },

  async redirect(req, res) {
    const code = req.params.code

    const links = await dbQuery('SELECT urlCode, redirect FROM global')
    let i = 0
    links.forEach(function (link) {
      if (link.urlCode == code) {
        res.render('codeRedirect', { redirect: link.redirect })
      } else {
        i++
        if (i == links.length) {
          res.render('redirect', {
            message: `Error, this code(${code}) dont exists`,
            redirect: '/'
          })
        }
      }
    })
  }
}
