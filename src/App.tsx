import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Nav from './pages/Nav'
import Navbar from './components/Navbar'
import Gravity from './pages/Gravity'
import Raycasting from './pages/Raycasting'
import Cullular_automat from './pages/Cullular_automat'
import Roy_algorithm from './pages/Roy_algorithm'
import GA from './pages/GA'
import Ant_alg from './pages/Ant_alg'
import { Provider } from 'react-redux'
import { store } from './store/store'

function App() {
	return (
		<Provider store={store}>
			<BrowserRouter>
				<Navbar />
				<Routes>
					<Route path="/" element={<Nav />} />
					<Route path="/gravity" element={<Gravity />} />
					<Route path="/genetic_algorithm" element={<GA />} />
					<Route path="/raycasting" element={<Raycasting />} />
					<Route path="/cullular_automat_3d" element={<Cullular_automat />} />
					<Route path="/roy_algorithm" element={<Roy_algorithm />} />
					<Route path="/ant_algorithm" element={<Ant_alg />} />
				</Routes>
			</BrowserRouter>
		</Provider>
	)
}

export default App
