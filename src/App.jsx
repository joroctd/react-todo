import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import homeImg from './assets/images/home.png';
import newImg from './assets/images/new.png';
import Home from './component/Home';

function App() {
	return (
		<BrowserRouter>
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
					element={<h1>New List</h1>}
				/>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
