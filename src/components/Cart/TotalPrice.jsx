import React, { Component } from "react";

class TotalPrice extends Component {
	// Get Total PRice Function
	getTotalPrice = () => {
		const { cart, currency, tax } = this.props;
		// Check item inStock or not

		const totalPriceTax = cart.reduce(
			(total, item) =>
				// Filter Prices By Currency
				item.prices
					.filter(
						(price) =>
							price.currency.label === currency ||
							price.currency.symbol === currency
					)
					.map((price) =>
						// Calc Total Price
						{
							let totalPrice = 0;
							totalPrice += price.amount * item.count;
							// Sum All Prices
							return (total = parseFloat(total) + totalPrice - tax).toFixed(2);
						}
					),
			0
		);
		return totalPriceTax;
	};

	render({ cart, currency } = this.props) {
		return (
			<div className="cart-total-total">
				<h2>
					<span>Total : </span>
					{/* Total Price Items */}
					<span>
						{cart[0].prices
							.filter(
								(price) =>
									price.currency.label === currency ||
									price.currency.symbol === currency
							)
							.map((price) => (
								<>{price.currency.symbol + " "}</>
							))}
						{
							// Calc Total Price
							this.getTotalPrice()
						}
					</span>
				</h2>
			</div>
		);
	}
}

export default TotalPrice;
