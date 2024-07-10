import ReactDOM from 'react-dom/client';
import Home from './Home';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import './index.css';

import { NotFound } from './pages/NotFound';
import { Currencies } from './pages/Сurrencies';
import { Converter } from './pages/Converter';

const router = createHashRouter([
	{
		path: '/',
		element: <Home />,
		errorElement: <NotFound />,
		children: [
			{
				path: '/currencies',
				element: <Currencies />,
			},
			{
				path: '/converter',
				element: <Converter />,
			},
		],
	},
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<RouterProvider router={router} />
);
