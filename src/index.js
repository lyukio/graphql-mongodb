const { ApolloServer, gql } = require('apollo-server')

// Toda request é POST e no mesmo endpoint (/graphql)

// Query -> Obter informações (GET)
// Mutation -> Manipular dados (POST/PUT/PATCH/DELETE)
// Scalar Types -> String, Int, Boolean, Float e ID 

// O tipo ID serve para umas paradas de cache que o GraphQL faz. E não importa se é string ou number

const typeDefs = gql`
    type User {
        id: ID!
        name: String!
        email: String!
        cpf: String
        createdAt: String!
    }

    type Workspace {
        id: ID!
        title: String!
        createdAt: String!
    }

    type GameSet {
        id: ID!
        workspace: Workspace!
        user: User!
        status: String
        score: Int
        createdAt: String!
    }

    type Query {
        hello: String
        users: [User!]!
        workspaces: [Workspace!]!
        gameSets: [GameSet!]!
        getUserByEmail(email: String!): User!
    }

    type Mutation {
        createUser(name: String!, email: String!, cpf: String): User!
    }
`;

const users = [
    { id: "1", name: "Will do mal", email: "willdomal@domal.com", createdAt: "2021-12-16" },
    { id: "2", name: "Will do mal 2", email: "willdomal2@domal.com", createdAt: "2021-12-16" },
    { id: "3", name: "Will do mal 3", email: "willdomal3@domal.com", createdAt: "2021-12-16" },
]
const workspaces = [
    { id: "1", title: "ws do Will do mal", createdAt: "2021-12-16" },
    { id: "2", title: "segunda ws do Will do mal", createdAt: "2021-12-16" },
]

const resolvers = {
    Query: {
        hello: () => "Hello world",
        users: () => users,
        workspaces: () => workspaces,
        gameSets: () => [
            { id: "1", workspace: workspaces[0], user: users[0], status: "finished", score: 0, createdAt: "2021-12-16" },
            { id: "1", workspace: workspaces[1], user: users[1], status: "finished", score: 2000, createdAt: "2021-12-16" },
            { id: "1", workspace: workspaces[1], user: users[2], status: "in progress", score: 4000, createdAt: "2021-12-16" }
        ],

        getUserByEmail: (_, args) => users.find(user => user.email === args.email)
    },
    Mutation: {
        createUser: (_, args) => {
            const user = {
                id: String(Math.random()),
                name: args.name,
                email: args.email,
                cpf: args.cpf,
                createdAt: new Date()
            }
            
            users.push(user)
            return user
        }

    }
};

const server = new ApolloServer({ typeDefs, resolvers })
server.listen().then(({ url }) => console.log(`💙 Server started at ${url}`))