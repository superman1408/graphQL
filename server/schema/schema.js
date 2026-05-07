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

        toggleTodo(
            id: ID!
        ): Todo

        deleteTodo(
            id: ID!
        ): Boolean

    }
`;
