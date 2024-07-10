import { Link, useLocation } from 'react-router-dom';

// styles
import Global from '../../assets/styles/global.module.css';
import Page_changer from '../../assets/styles/pages/components/page_changer.module.css';

export const PageChanger: React.FC = () => {
	const location = useLocation();

	return (
		<div className={Page_changer.pages_changer}>
			<Link to="/currencies">
				<button
					className={`${Global.button_global} ${Page_changer.button_pages_changer}`}
					disabled={location.pathname === '/currencies'}
				>
					<svg
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M19 5.51903C17.5176 4.25973 15.5975 3.5 13.5 3.5C8.80558 3.5 5 7.30558 5 12C5 16.6944 8.80558 20.5 13.5 20.5C15.5975 20.5 17.5176 19.7403 19 18.481M3 14H13M3 10H13"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</svg>
					<span className={Page_changer.sr_only}>Валюты</span>
				</button>
			</Link>
			<Link to="/converter">
				<button
					className={`${Global.button_global} ${Page_changer.button_pages_changer}`}
					disabled={location.pathname === '/converter'}
				>
					<svg
						fill="currentcolor"
						viewBox="0 0 1920 1920"
						xmlns="http://www.w3.org/2000/svg"
						stroke="#ffffff"
					>
						<g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
						<g
							id="SVGRepo_tracerCarrier"
							strokeLinecap="round"
							strokeLinejoin="round"
						></g>
						<g id="SVGRepo_iconCarrier">
							{' '}
							<path
								d="M1458.948 1305.626c104.637-136.95 167.527-307.187 167.527-492.388C1626.475 364.764 1261.711 0 813.238 0 364.764 0 0 364.764 0 813.238c0 448.473 364.764 813.237 813.238 813.237 185.201 0 355.547-62.89 492.496-167.527L1766.678 1920 1920 1766.678l-461.052-461.052Zm-645.71 103.986c-328.874 0-596.375-267.61-596.375-596.374 0-328.765 267.501-596.375 596.375-596.375 328.873 0 596.374 267.61 596.374 596.375s-267.501 596.374-596.374 596.374Z"
								fillRule="evenodd"
							></path>{' '}
						</g>
					</svg>
					<span className={Page_changer.sr_only}>Конвертер</span>
				</button>
			</Link>
		</div>
	);
};
