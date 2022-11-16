import NavBar from "./components/NavBar";
import Mix from "./pages/Mix";
import Play from "./pages/Play";
import Explore from "./pages/Explore";

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
	return (
		<div className="App">
			<NavBar />

			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Mix />} />
					<Route path="/mix" element={<Mix />} />
					<Route path="/play" element={<Play />} />
					<Route path="/explore" element={<Explore />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
