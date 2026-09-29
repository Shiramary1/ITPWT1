const fs = require('fs')
const path = require('path')

const productPath = path.join(__dirname, '../data/product.json')

module.exports = {
  getProductById: (req, res) => {
    try {
      const data = JSON.parse(fs.readFileSync(productPath, 'utf-8'))
      const product = data.products.find((item) => item.id === req.params.id)

      if (!product) {
        return res.status(404).json({ message: 'Товар не найден' })
      }

      res.json({ product, related: data.related || [] })
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: 'Ошибка чтения данных продукта' })
    }
  }
}
