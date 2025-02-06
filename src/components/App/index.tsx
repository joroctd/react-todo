import { FC } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import homeImg from '@/assets/images/home.png';
import newImg from '@/assets/images/new.png';
import Home from '@/components/Home';

const App: FC = () => {
	return (
		<BrowserRouter>
			<div className='app'>
				<nav>
					<Link to='/'>
						<img
							src={homeImg}
							alt=''
						/>
						Home
					</Link>
					<Link to='/new'>
						<img src={newImg} />
						New
					</Link>
				</nav>
				<Routes>
					<Route
						path='/'
						element={<Home />}
					/>
					<Route
						path='/new'
						element={<h1>New "List"</h1>}
					/>
				</Routes>
			</div>
			<footer>
				<hr />
				<p>Navigation icons:</p>
				<a
					href='https://www.flaticon.com/free-icons/user'
					title='user icons'>
					User icons created by venus design - Flaticon
				</a>
			</footer>
		</BrowserRouter>
	);
};

export default App;
