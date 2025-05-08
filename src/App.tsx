<<<<<<< HEAD
import { RouterProvider } from 'react-router-dom';
import './App.css';
import AppRouter from './router';

function App() {
  return (
    <>
      <RouterProvider router={AppRouter()} />
    </>
  );
}

export default App;
=======
import { Link, RouterProvider } from 'react-router-dom'
import './App.css'
import AppRouter from './router'

function App() {
  return <>
    <RouterProvider router={AppRouter()} />
  </>
}

export default App
>>>>>>> 0e4152768b3e371ad10c5b7380423d6246620152
