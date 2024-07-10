import React from 'react';
import { StoreContext } from '../Home';
const API_KEY = import.meta.env.VITE_API_KEY;

//types
import { CodesData } from '../Home';

//styles
import Converter_styles from '../assets/styles/pages/converter.module.css';
import Global from '../assets/styles/global.module.css';

//SVG
import Clear from '../assets/img/clear.svg';

interface ConversionResult {
	base_code: string;
	target_code: string;
	value: number;
	result: number;
}

export const Converter: React.FC = () => {
	const [converterState, setConverterState] = React.useState<string>('');
	const [invalidRequest, setInvalidRequest] = React.useState<boolean>(false);
	const [correctRequest, setCorrectRequest] = React.useState<boolean>(false);

	const emptyobj = {
		base_code: 'RUB',
		target_code: 'USD',
		value: 0,
		result: 0,
	};

	const [conversionResult, setConversionResult] =
		React.useState<ConversionResult>(emptyobj);

	const codes: CodesData = React.useContext(StoreContext);

	const converterSubmit = () => {
		const value = converterState.split(' ');
		const keysOfCodes = Object.keys(codes);
		if (
			value.length === 4 &&
			!isNaN(Number(value[0])) &&
			Number(value[0]) > 0 &&
			keysOfCodes.includes(value[1]) &&
			value[2] == 'in' &&
			keysOfCodes.includes(value[3])
		) {
			async function fetchPairConversion() {
				try {
					const baseCode = value[1];
					const targetCode = value[3];
					const amount = value[0];

					const response = await fetch(
						`https://v6.exchangerate-api.com/v6/${API_KEY}/pair/${baseCode}/${targetCode}/${amount}`
					);
					const data = await response.json();
					if (data.result === 'error') {
						throw new Error(data['error-type']);
					}
					setConversionResult({
						base_code: baseCode,
						target_code: targetCode,
						value: Number(amount),
						result: data.conversion_result,
					});
					setInvalidRequest(false);
					setCorrectRequest(true);
				} catch (error) {
					alert(error);
				}
			}
			fetchPairConversion();
		} else {
			setInvalidRequest(true);
			setCorrectRequest(false);
		}
	};

	return (
		<div className={Converter_styles.converter_page}>
			<h1 className={Global.title_1}>Конвертер валют</h1>
			<div className={Converter_styles.content}>
				<form
					className={Converter_styles.converter}
					onSubmit={(event) => event.preventDefault()}
				>
					<label
						className={Converter_styles.converter_label}
						htmlFor="converter"
					>
						Введите запрос в формате <p>15 RUB in USD</p>
					</label>
					<input
						className={Converter_styles.converter_input}
						type="text"
						id="converter"
						name="converter"
						required
						autoComplete="off"
						placeholder="10.5 USD in EUR"
						onChange={(e) => setConverterState(e.target.value)}
						value={converterState}
					/>
					<span
						className={Converter_styles.converter_clear}
						onClick={() => {
							setConverterState('');
							setInvalidRequest(false);
							setConversionResult(emptyobj);
							setCorrectRequest(false);
						}}
					>
						<img src={Clear} width="35" alt="clear" />
					</span>
					{invalidRequest && (
						<span className={Converter_styles.converter_invalid}>
							Неверный формат данных!!! Смотрите на пример выше 😱😱😱
						</span>
					)}
					{correctRequest && (
						<span className={Converter_styles.converter_correct}>
							{`${conversionResult.value} ${conversionResult.base_code} это ${conversionResult.result} ${conversionResult.target_code}`}
						</span>
					)}
					<button
						onClick={converterSubmit}
						className={`${Global.button_global} ${Converter_styles.button_converter}`}
						type="button"
					>
						<span>Конвертировать</span>
					</button>
				</form>
			</div>
		</div>
	);
};
