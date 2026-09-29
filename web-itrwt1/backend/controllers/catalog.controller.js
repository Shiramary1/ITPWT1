const fs = require('fs')
const path = require('path')

const catalogPath = path.join(__dirname, '../data/catalog.json')

function readCatalogData() {
  return JSON.parse(fs.readFileSync(catalogPath, 'utf-8')).products
}

module.exports = {
  getAllCatalogItems: (req, res) => {
    try {
      const { page = 1, pageSize = 6, category, search, sortBy } = req.query
      let products = readCatalogData()

      if (category) products = products.filter((p) => p.category === category)
      if (search) {
        const q = search.toLowerCase()
        products = products.filter((p) => p.title.toLowerCase().includes(q))
      }
      if (sortBy === 'priceAsc') products.sort((a, b) => a.price - b.price)
      if (sortBy === 'priceDesc') products.sort((a, b) => b.price - a.price)

      const totalItems = products.length
      const pg = Number.parseInt(page, 10) || 1
      const ps = Number.parseInt(pageSize, 10) || 6
      const start = (pg - 1) * ps

      res.json({ items: products.slice(start, start + ps), totalItems })
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: 'Ошибка чтения каталога' })
    }
  }
}
