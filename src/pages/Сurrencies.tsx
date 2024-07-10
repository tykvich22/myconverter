import React from 'react';
import { StoreContext } from '../Home';
const API_KEY = import.meta.env.VITE_API_KEY;

//types
import { CodesData } from '../Home';

//styles
import Currencies_styles from '../assets/styles/pages/currencies.module.css';
import Global from '../assets/styles/global.module.css';

//SVG
import Coin from '../assets/img/coin.svg';
import Down_Arrow from '../assets/img/down_arrow.svg';

export const Currencies: React.FC = () => {
	const [currenciesData, setCurrenciesData] = React.useState<
		[string, number][] | []
	>([]);
	const [baseCurrency, setBaseCurrency] = React.useState<string>(
		localStorage.getItem('baseCurrency') || 'RUB'
	);

	const codes: CodesData = React.useContext(StoreContext);

	const [isLoaded, setIsLoaded] = React.useState<boolean>(false);
	const [listOpen, setListOpen] = React.useState<boolean>(false);

	const listRef = React.useRef<HTMLDivElement>(null);

	const baseCurrencyHandler = (value: string) => {
		setBaseCurrency(value);
		setListOpen(false);
		localStorage.setItem('baseCurrency', value);
	};

	React.useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (listRef.current && !event.composedPath().includes(listRef.current)) {
				setListOpen(false);
			}
		};

		window.addEventListener('click', handleClickOutside);

		return () => window.removeEventListener('click', handleClickOutside);
	}, []);

	React.useEffect(() => {
		async function fetchExchangeRate() {
			try {
				setIsLoaded(false);
				const response = await fetch(
					`https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${baseCurrency}`
				);
				const data = await response.json();
				if (data.result === 'error') {
					throw new Error(data['error-type']);
				}
				const currencies_data: [string, number][] = Object.entries(
					data.conversion_rates
				);
				const baseCode: string = data.base_code;
				setBaseCurrency(baseCode);
				setCurrenciesData(currencies_data);
				setIsLoaded(true);
			} catch (error) {
				alert(error);
			}
		}
		fetchExchangeRate();
	}, [baseCurrency]);

	return (
		<div className={Currencies_styles.currencies_page}>
			<h1 className={Global.title_1}>Курс валют</h1>
			{isLoaded ? (
				<div className={Currencies_styles.content}>
					<div className={Currencies_styles.base_currency}>
						<h2
							className={`${Global.title_2} ${Currencies_styles.title_inside}`}
						>
							Базовая валюта:
						</h2>
						<div ref={listRef}>
							<span
								className={Currencies_styles.base_currency_value}
								onClick={() => setListOpen(!listOpen)}
							>
								<img src={Coin} width="25" alt="coin" />
								<p>{baseCurrency}</p>
								<img src={Down_Arrow} width="15" alt="open" />
							</span>
							{listOpen && (
								<div className={Currencies_styles.base_currency_list}>
									{currenciesData
										.filter((_, index) => index > 0)
										.map((item) => (
											<span
												className={Currencies_styles.base_currency_list_item}
												onClick={() => baseCurrencyHandler(item[0])}
												key={item[0]}
											>
												<p>{item[0]}</p>
											</span>
										))}
								</div>
							)}
						</div>
					</div>
					<div className={Currencies_styles.currencies}>
						<h2
							className={`${Global.title_2} ${Currencies_styles.title_inside}`}
						>
							Курс:
						</h2>
						<div className={Currencies_styles.currencies_list}>
							{currenciesData.map((item) => (
								<div
									className={Currencies_styles.currencies_list_item}
									key={item[0]}
								>
									<p>{`${item[0]}:`}</p>
									<p>{codes[item[0]]}</p>
									<p>{item[1]}</p>
								</div>
							))}
						</div>
					</div>
				</div>
			) : (
				<div className={Currencies_styles.download}>
					<h2>Загрузка страницы...</h2>
				</div>
			)}
		</div>
	);
};
