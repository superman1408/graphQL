export const TYPEDEFS = `
    type User {
        id: ID!
        name: String!
        email: String!
        todos: [Todo]
    }

    type Todo {
        id: ID!
        title: String!
        description: String
        completed: Boolean!
        user: User
    }

    type Query {
        getTodos: [Todo]
        getUsers: [User]
        getUser(id: ID!): User
        getTodosByUserId(userId: ID!): [Todo]
    }

    type Mutation {

    // Mutations for creating, updating, and deleting todos and users

        createTodo(
            title: String!
            description: String
            completed: Boolean!
            userId: ID!
        ): Todo

        createUser(
            name: String!
            email: String!
        ): User

        updateTodo(
            id: ID!
            title: String
            description: String
            completed: Boolean
        ): Todo

        deleteTodo(
            id: ID!
        ): Boolean

    }
`;
