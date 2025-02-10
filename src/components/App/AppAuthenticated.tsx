import { FC } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { UserButton } from '@clerk/clerk-react';
import './App.css';
import homeImg from '@/assets/images/home.png';
import newImg from '@/assets/images/new.png';
import AppFooter from './AppFooter';
import Home from '@/components/Home';
import urls from '@/data/urls';

const AppUI: FC = () => {
	return (
		<>
			<div className='app'>
				<nav>
					<Link to={urls.home}>
						<img
							src={homeImg}
							alt=''
						/>
						Home
					</Link>
					<Link to={urls.new}>
						<img src={newImg} />
						New
					</Link>
					<UserButton />
				</nav>
				<Routes>
					<Route
						path={urls.home}
						element={<Home />}
					/>
					<Route
						path={urls.new}
						element={<h1>New "List"</h1>}
					/>
				</Routes>
			</div>
			<AppFooter />
		</>
	);
};

export default AppUI;
