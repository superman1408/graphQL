import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";

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

function App() {
  const { loading, error, data } = useQuery(GET_TODOS);

  if (loading) return <h1>Loading...</h1>;

  if (error) {
    console.log(error);
    return <h1>Error loading data</h1>;
  }

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
        </div>
      ))}
    </div>
  );
}

export default App;