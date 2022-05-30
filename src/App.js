import React from "react";

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { CartPage, CategoryPage, ProductPage } from "./Pages";
import { Navbar } from "./components";

class App extends React.Component {
	render() {
		return (
			<>
				<Navbar />
				<BrowserRouter>
					<Routes>
						<Route path="/" element={<Navigate to="/category/all" replace />} />
						<Route path="/category/:category" element={<CategoryPage />} />
						<Route path="/cart" element={<CartPage />} exact />
						<Route path="/pdp/:id" element={<ProductPage />} exact />
					</Routes>
				</BrowserRouter>
			</>
		);
	}
}

export default App;
