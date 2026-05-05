import { TODOS } from '../db/todos.js';
import { USERS } from '../db/users.js';



export const RESOLVERS = {
  Query: {
    getTodos: () => TODOS,
    getUsers: () => USERS,
    getUser: (parent, { id }) => {//linear search for user by id
      return USERS.find(user => user.id === parseInt(id));
    },
    getTodoByUserId: (parent, { id }) => {
      return TODOS.filter(todo => todo.userId === parseInt(id));
    },
  },

  TODO: {
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
