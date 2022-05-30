import React, { Component } from "react";
import { Size, Color } from "../Products/LeftSideInfo";

class LeftSide extends Component {
	state = {
		size: "" || this.props.size,
		activePrice: "" || this.props.size,
		color: "" || this.props.color,
		activeColor: "" || this.props.color,
	};

	handleChange = (e) => {
		this.setState({
			size: e.target.value,
			activePrice: e.target.value,
		});
	};

	handelColor = (e) => {
		this.setState({
			color: e.target.id,
			activeColor: e.target.value,
		});
	};

	render({ item, currency } = this.props) {
		const { size, color, activePrice, activeColor } = this.state;
		const { attributes, id, brand, prices } = item;

		return (
			<div className="cart-left-section" key={id}>
				{/* Name & Brand*/}
				<div className="cart-name">
					<h1>{id}</h1>
					<span>{brand}</span>
				</div>
				{/* Price */}
				<div className="cart-price">
					<h2>
						<span>
							{/* Filter Price By Currency */}
							{prices
								.filter(
									(price) =>
										price.currency.label === currency ||
										price.currency.symbol === currency
								)
								.map((price) => (
									<span key={price.currency.label}>
										{price.currency.symbol + " "}
										{(price.amount * item.count).toFixed(2)}
									</span>
								))}
						</span>
					</h2>
				</div>
				<Size
					size={size}
					attributes={attributes}
					activeSize={activePrice}
					handleChange={this.handleChange}
				/>
				{/* Color Component */}
				<Color
					color={color}
					attributes={attributes}
					activeColor={activeColor}
					handelColor={this.handelColor}
				/>
			</div>
		);
	}
}

export default LeftSide;
