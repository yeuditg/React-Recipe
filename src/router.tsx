
import { createBrowserRouter } from 'react-router-dom';
import Login from './components/Login';
import LogUp from './components/LogUp';
import ShowRecipes from './components/recipes/showRecipes';
import AddRecipe from './components/addRecipe';
<<<<<<< HEAD
import Home from './components/home'
=======
import Home from './components/home';
>>>>>>> 0e4152768b3e371ad10c5b7380423d6246620152
import { useState } from 'react';
import RecipeList from './components/recipes/RecipeList';

const AppRouter = () => {
    const [loginSuccess, setLoginSuccess] = useState(false);

    const handleLoginSuccess = () => {
        setLoginSuccess(true);
    };

    const Router = createBrowserRouter([
        {
            path: "/",
            element: <Home />,
            children: [
                {
                    path: 'login',
                    element: <Login LoginSuccess={handleLoginSuccess} />,
                },
                {
                    path: 'signin',
                    element: <LogUp LoginSuccess={handleLoginSuccess} />,
                },
                {
                    path: 'showRecipes',
                    element: <ShowRecipes />,
                    children: [
                        {
                            path: 'addRecipe',
                            element: <AddRecipe />
                        },
                        {
                            path: 'RecipeList',
                            element: <RecipeList />
                        }
                    ],
                },
            ],
        },
    ]);

    return Router;
}
export default AppRouter;