const fs = require('fs')
const path = require('path')

const homePath = path.join(__dirname, '../data/homeProducts.json')

function readHomeData() {
  return JSON.parse(fs.readFileSync(homePath, 'utf-8'))
}

module.exports = {
  getHome: (req, res) => {
    try {
      const products = readHomeData()
      res.json({ products })
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: 'Ошибка чтения данных главной страницы' })
    }
  }
}
