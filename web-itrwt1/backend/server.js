const express = require('express')

const homeRoutes = require('./routes/home.route')
const catalogRoutes = require('./routes/catalog.route')
const productRoutes = require('./routes/product.route')
const cartRoutes = require('./routes/cart.route')
const userRoutes = require('./routes/user.route')

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())

app.use('/api/home', homeRoutes)
app.use('/api/catalog', catalogRoutes)
app.use('/api/product', productRoutes)
app.use('/api/cart', cartRoutes)
app.use('/api/user', userRoutes)

app.get('/', (req, res) => {
  res.send('Fake API is running')
})

app.listen(PORT, () => {
  console.log(`Fake API: http://localhost:${PORT}`)
})
