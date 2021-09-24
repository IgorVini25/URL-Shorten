const { reset } = require('nodemon')

module.exports = {
  async open(req, res) {
    res.render('index', { shortenUrl: false })
  }
}
