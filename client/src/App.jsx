import { gql } from "@apollo/client";
import { useQuery, useMutation } from "@apollo/client/react";

const GET_TODOS = gql`
  query {
    getTodos {
      id
      title
      completed
      user {
        name
      }
    }
  }
`;

const DELETE_TODO = gql`
  mutation DeleteTodo($id: ID!) {
    deleteTodo(id: $id)
  }
`;

const TOGGLE_TODO = gql`
  mutation ToggleTodo($id: ID!) {
    toggleTodo(id: $id) {
      id
    }
  }
`;

function App() {
  const { loading, error, data, refetch } = useQuery(GET_TODOS);
  const [deleteTodo] = useMutation(DELETE_TODO);
  const [toggleTodo] = useMutation(TOGGLE_TODO);

  if (loading) return <h1>Loading...</h1>;

  if (error) {
    console.log(error);
    return <h1>Error loading data</h1>;
  }


  const handleDelete = async (id) => {    console.log("Delete todo with id:", id);
    // Here you would typically call a mutation to delete the todo from the server
    // deleteTodo({ variables: { id } });
    await deleteTodo({ variables: { id } });
    refetch(); // Refetch the todos after deletion to update the UI
  };

  const handleToggle = async (id) => {
    console.log("Toggle todo with id:", id);
    await toggleTodo({ variables: { id } });
    refetch(); // Refetch the todos after toggling to update the UI
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>GraphQL Todos</h1>

      {data.getTodos.map((todo) => (
        <div
          key={todo.id}
          style={{
            border: "1px solid gray",
            padding: "10px",
            marginBottom: "10px",
          }}
        >
          <h3>{todo.title}</h3>

          <p>
            Completed:
            {todo.completed ? " ✅ Yes" : " ❌ No"}
          </p>

          <p>User: {todo.user?.name}</p>

          <button style={{ marginRight: "10px" }} onClick={() => handleToggle(todo.id)}>
            Toggle Complete
          </button>
          <button onClick={() => handleDelete(todo.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default App;