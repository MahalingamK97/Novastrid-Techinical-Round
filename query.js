const db = require('./src/models/index.js')

const query = async () => {
    const users = await db.User.findOne()
    console.log(users)
}
query();