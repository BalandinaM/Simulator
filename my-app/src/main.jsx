import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
	createBrowserRouter,
	RouterProvider,
} from 'react-router-dom';
import Root from './parts/root/root';
import ErrorPage404 from './error-page-404';
import { Provider } from 'react-redux';
import { store } from './app/store';
import Login from './parts/login/login';
import SignUp from './parts/signUp/signUp';
import SimulatorPage from './parts/simulatorPage/simulatorPage';
import Home from './components/home/home';

const router = createBrowserRouter([
	{
		path: "/",
		element: <Root />,
		errorElement: <ErrorPage404 />,
		children: [
			{
				path: "/simulator",
				element: <SimulatorPage />,
			},
			{
				path: "/home",
				element: <Home />,
			},
			{
				path: "/login",
				element: <Login />,
			},
			{
				path: "/signup",
				element: <SignUp />,
			},
		],
	},
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
			<RouterProvider router={router}/>
		</Provider>
  </StrictMode>
)
