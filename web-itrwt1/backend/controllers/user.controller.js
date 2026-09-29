const fs = require('fs')
const path = require('path')
const { v4: uuidv4 } = require('uuid')
const bcrypt = require('bcrypt')

const userPath = path.join(__dirname, '../data/user.json')

function readUserData() {
  return JSON.parse(fs.readFileSync(userPath, 'utf-8'))
}

function writeUserData(data) {
  fs.writeFileSync(userPath, JSON.stringify(data, null, 2), 'utf-8')
}

module.exports = {
  getUser: (req, res) => {
    try {
      const { benefits = [] } = readUserData()
      res.json({ benefits })
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: 'Ошибка чтения данных пользователя' })
    }
  },

  createUser: async (req, res) => {
    try {
      const { firstName, lastName, gender, email, password } = req.body
      if (!firstName || !lastName || !gender || !email || !password) {
        return res.status(400).json({ message: 'Заполните все поля' })
      }

      const data = readUserData()
      const users = data.users || []

      if (users.some((user) => user.email.toLowerCase() === email.toLowerCase())) {
        return res.status(400).json({ message: 'Пользователь с таким email уже существует' })
      }

      const hashedPassword = await bcrypt.hash(password, 10)
      const newUser = {
        id: uuidv4(),
        firstName,
        lastName,
        gender,
        email,
        password: hashedPassword
      }

      users.push(newUser)
      writeUserData({ benefits: data.benefits || [], users })

      res.status(201).json({
        id: newUser.id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email
      })
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: 'Ошибка регистрации пользователя' })
    }
  }
}
