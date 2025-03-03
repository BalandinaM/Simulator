import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
	createBrowserRouter,
	RouterProvider,
} from 'react-router-dom';
// import Root, {loader as rootLoader} from './parts/root/root';
import Root from './parts/root/root';
import ErrorPage404 from './error-page-404';
import { Provider } from 'react-redux';
import { store } from './app/store';
import Login from './parts/login/login';
import SignUp from './parts/signUp/signUp';
import SimulatorPage, {loader as simulatorLoader} from './parts/simulatorPage/simulatorPage';
import Home from './parts/home/home';
import NewWordPage, {action as newWordAction} from './parts/newWord/newWordPage';
import TableAllWords, {loader as tableWordsLoader} from './parts/tableAllWords/tableAllWords';

// Использование данных, полученных загрузчиком в React Router

const router = createBrowserRouter([
	{
		path: "/",
		element: <Root />,
		errorElement: <ErrorPage404 />,
		//loader: rootLoader,
		children: [
			{
				path: "/simulator",
				element: <SimulatorPage />,
				loader: simulatorLoader,
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
			{
				path: "/newWord",
				element: <NewWordPage />,
				action: newWordAction,
			},
			{
				path: "/listWords",
				element: <TableAllWords />,
				loader: tableWordsLoader,
			}
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
