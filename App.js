// Importing React library and necessary hooks
import React, { useState, useEffect } from 'react';

// Defining the functional component named App
function App() {
  // Using useState hook to manage state for posts and error
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  // Using useEffect hook to fetch posts when component mounts
  useEffect(() => {
    fetchPosts();
  }, []);

  // Function to fetch posts from an API
  const fetchPosts = () => {
    // Fetching data from JSONPlaceholder API
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => {
        // Handling errors if response is not OK
        if (!response.ok) {
          throw new Error('Failed to fetch');
        }
        // Parsing response to JSON
        return response.json();
      })
      // Updating state with fetched posts
      .then(data => setPosts(data))
      // Handling errors and updating error state
      .catch(error => setError(error.message));
  };

  // Returning JSX to render the component
  return (
    <div>
      {/* Conditional rendering based on the presence of error */}
      {error ? (
        <p>Error: {error}</p>
      ) : (
        // Mapping over posts array to render each post
        <ul>
          {posts.map(post => (
            <li key={post.id}>
              <h3>{post.title}</h3>
              <p>{post.body}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// Exporting the App component as the default export
export default App;