const express = require('express')
const {graphqlHTTP} = require('express-graphql')
const cors = require('cors')
const schema = require('./schema')

const Users = [{id: 1, username: "Anton", age: 12, content: [{id: 1, title: "wewq", content: "awdaw"}]}]

const app = express()
app.use(cors())

const createUser = (input) => {
    const id = new Date().getTime()
    return {
        id, ...input
    }
}

const root = {
    getAllUsers: () => Users,
    getUser: ({id}) => Users.find(user => user.id === id),
    createUser: ({input}) => {
        const user = createUser(input)
        Users.push(user)
        return user
    }
}

app.use('/graphql', graphqlHTTP({
    graphiql: true,
    schema,
    rootValue: root,

}))

app.listen(5000, () => console.log('Successfully start'))