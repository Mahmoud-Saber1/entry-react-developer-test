import React, { Component } from "react";
import { Cart, CategoryName } from "../../components";

class CartPage extends Component {
	render() {
		return (
			<>
				<div className="categorys container">
					{/* Category Name Component */}
					<CategoryName name="Cart" />

					{/* Cart Component */}
					<Cart />
				</div>
			</>
		);
	}
}

export default CartPage;
