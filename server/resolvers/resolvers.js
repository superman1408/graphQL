import { create } from 'domain';
import { TODOS } from '../db/todos.js';
import { USERS } from '../db/users.js';
import fs from 'fs';
import path from 'path';



export const RESOLVERS = {

  Query: {
    getTodos: () => TODOS,
    getUsers: () => USERS,
    getUser: (parent, { id }) => {//linear search for user by id
      return USERS.find(user => user.id === parseInt(id));
    },
    getTodosByUserId: (parent, { id }) => {
      return TODOS.filter(todo => todo.userId === parseInt(id));
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
      fs.writeFileSync(
        './db/todos.json',
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
      fs.writeFileSync(
        './db/users.json',
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

