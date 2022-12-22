import NavBar from "./components/NavBar";
import Mix from "./pages/Mix";
import Play from "./pages/Play";
import How from "./pages/How";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
	return (
		<div className="App" id="app">
			<NavBar />
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Mix />} />
					<Route path="/mix" element={<Mix />} />
					<Route path="/play" element={<Play />} />
					<Route path="/how" element={<How />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
