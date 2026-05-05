export const TYPEDEFS = `
    type User {
        id: ID!
        name: String!
        email: String!
        todos: [TODO]
    }

    type TODO {
        id: ID!
        title: String!
        description: String
        completed: Boolean!
        user: User
    }

    type Query {
        getTodos: [TODO]
        getUsers: [User]
        getUser(id: ID!): User
        getTodoByUserId(id: ID!): [TODO]
    }
`;