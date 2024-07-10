import React from 'react';
import { Outlet } from 'react-router-dom';

import { PageChanger } from './pages/components/PageChanger';

const API_KEY = import.meta.env.VITE_API_KEY;

export interface CodesData {
	[index: string]: string;
}

export const StoreContext = React.createContext({});

const Home: React.FC = () => {
	const [codes, setCodes] = React.useState<CodesData>({});

	React.useEffect(() => {
		async function fetchCodes() {
			try {
				const response = await fetch(
					`https://v6.exchangerate-api.com/v6/${API_KEY}/codes`
				);
				const data = await response.json();
				if (data.result === 'error') {
					throw new Error(data['error-type']);
				}

				const codesObj = data.supported_codes.reduce(
					(result: object, value: string[]) => ({
						...result,
						[value[0]]: value[1],
					}),
					{}
				);
				setCodes(codesObj);
			} catch (error) {
				alert(error);
			}
		}
		fetchCodes();
	}, []);

	return (
		<div className="container">
			<PageChanger />
			<StoreContext.Provider value={codes}>
				<Outlet />
			</StoreContext.Provider>
		</div>
	);
};

export default Home;
