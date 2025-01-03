import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Home from './component/Home';

function App() {
	return (
		<BrowserRouter>
			<nav>
				<Link to='/'>Home</Link>
				<Link to='/new'>New</Link>
			</nav>
			<Routes>
				<Route
					path='/'
					element={<Home />}
				/>
				<Route
					path='/new'
					element={<h1>---New List---</h1>}
				/>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
