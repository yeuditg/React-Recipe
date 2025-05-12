import { createBrowserRouter } from 'react-router-dom';
import Login from './Login';
import LogUp from './LogUp';
import ShowRecipes from './ShowRecipes';
import AddRecipe from './AddRecipe';
import Home from './Home'
import { useState } from 'react';
import EditRecipe from './EditRecipe';
import FilterRecipes from './FilterRecipe';

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
                        path:"/showRecipes/editRecipe/:id",
                        element: <EditRecipe />
                    },
                    {
                        path: 'filterRecipes',
                        element: <FilterRecipes />
                    },
                ],
            },
        ],
    },
]);

return Router;
}
export default AppRouter;
