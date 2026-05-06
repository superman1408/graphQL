import { TODOS } from '../db/todos.js';
import { USERS } from '../db/users.js';
import fs from 'fs';



export const RESOLVERS = {

  Query: {
    getTodos: () => TODOS,
    getUsers: () => USERS,
    getUser: (parent, { id }) => {//linear search for user by id
      return USERS.find(user => user.id === parseInt(id));
    },
    getTodosByUserId: (parent, { userId }) => {
      return TODOS.filter(todo => todo.userId === parseInt(userId));
    },
  },


  Mutation: {
    createTodo: (parent, { title, description, completed, userId }) => {
      const newTodo = {
        id: TODOS.length + 1, // Simple ID generation based on array length
        title,
        description,
        completed,
        userId: parseInt(userId) // Ensure userId is an integer
      };
      TODOS.push(newTodo);

      const todosPath = new URL('../db/todos.json', import.meta.url);

      fs.writeFileSync(
        todosPath,
        JSON.stringify(TODOS, null, 2)
      );
      return newTodo;
    },

    createUser: (parent, { name, email }) => {
      const newUser = {
        id: USERS.length + 1, // Simple ID generation based on array length
        name,
        email
      };
      USERS.push(newUser);

      const usersPath = new URL('../db/users.json', import.meta.url);
      fs.writeFileSync(
        usersPath,
        JSON.stringify(USERS, null, 2)
      );
      return newUser;
    },
  },


  Todo: {
    user: (todos) => {
      return USERS.find(user => user.id === todos.userId);
    }
  },


  User: {
    todos: (user) => {
      return TODOS.filter(todo => todo.userId === user.id);
    }
  }
};




// mutation {
//   createTodo(
//     title: "Learn GraphQL"
//     description: "Practice mutation"
//     completed: false
//     userId: "3"
//   ) {
//     id
//     title
//     completed
//     user {
//       name
//     }
//   }
// }



// mutation {
//   createUser(
//     name: "Rahul"
//     email: "rahul@test.com"
//   ) {
//     id
//     name
//     email
//   }
// }