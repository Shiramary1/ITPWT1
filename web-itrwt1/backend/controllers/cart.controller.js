// backend/controllers/cart.controller.js
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const cartPath = path.join(__dirname, '../data/cart.json');

function readCartData() {
  const raw = fs.readFileSync(cartPath, 'utf-8');
  return JSON.parse(raw).items; // возвращает массив items
}

function writeCartData(items) {
  fs.writeFileSync(cartPath, JSON.stringify({ items }, null, 2), 'utf-8');
}

module.exports = {
  // GET /api/cart
  getCartItems: (req, res) => {
    try {
      const items = readCartData();
      // Вот здесь мы больше не отправляем строку, а возвращаем JSON
      res.json({ items });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Ошибка чтения корзины' });
    }
  },

  // POST /api/cart  — добавление
  addToCart: (req, res) => {
    try {
      const items = readCartData();
      const { product, quantity } = req.body;
      if (!product || typeof quantity !== 'number') {
        return res.status(400).json({ message: 'Неверные данные' });
      }
      const newItem = {
        id: uuidv4(),
        product,
        quantity
      };
      items.push(newItem);
      writeCartData(items);
      // Возвращаем обновлённый массив items
      res.status(201).json({ items });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Ошибка добавления в корзину' });
    }
  },

  // PUT /api/cart/:id — обновление количества
  updateCartItem: (req, res) => {
    try {
      const items = readCartData();
      const { id } = req.params;
      const { quantity } = req.body;
      const idx = items.findIndex(i => i.id === id);
      if (idx === -1) return res.status(404).json({ message: 'Элемент не найден' });
      items[idx].quantity = quantity;
      writeCartData(items);
      res.json({ items });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Ошибка обновления корзины' });
    }
  },

  // DELETE /api/cart/:id — удаление элемента
  removeCartItem: (req, res) => {
    try {
      let items = readCartData();
      const { id } = req.params;
      items = items.filter(i => i.id !== id);
      writeCartData(items);
      res.json({ items });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Ошибка удаления элемента' });
    }
  },

  // DELETE /api/cart — очистить всю корзину
  clearCart: (req, res) => {
    try {
      writeCartData([]);
      res.json({ items: [] });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Ошибка очистки корзины' });
    }
  }
};
