import React, { Component } from "react";

class MiniLeft extends Component {
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
			<>
				<div className="mini-cart-left-section" key={id}>
					{/* Name & Brand*/}
					<div className="mini-cart-name">
						<h1>{id}</h1>
						<span>{brand}</span>
					</div>
					{/* Price */}
					<div className="mini-cart-price">
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
					{/* Size */}
					<div className="mini-cart-price" style={{ margin: "2px 0 3px" }}>
						{attributes.map((item) =>
							item.id === "Size" || item.id === "Capacity" ? (
								<h2>
									<span>{item.id} : </span>
									<span>{size}</span>
								</h2>
							) : (
								""
							)
						)}
					</div>
					{/* Size INfo */}
					<div
						className="mini-radio-buttons"
						style={{ margin: "0px 0 2px" }}
						onChange={this.handleChange}
					>
						{/* Loop To Prices */}
						{attributes.map((item) => {
							return item.id === "Size" || item.id === "Capacity"
								? item.items.map((item, index) => {
										return (
											<label className="custom-radio" key={index}>
												<input type="radio" name="radio" value={item.value} />
												{/* Add Class Active When item Selected */}
												<span
													className={
														activePrice === item.value
															? "radio-btn active"
															: "radio-btn"
													}
												>
													<div className="hobbies-icon">
														<h3>{item.id}</h3>
													</div>
												</span>
											</label>
										);
								  })
								: null;
						})}
					</div>
					{/* Color */}
					<div className="mini-cart-price">
						{attributes.map((item) =>
							item.id === "Color" ? (
								<h2>
									<span>{item.id} : </span>
									<span>{color}</span>
								</h2>
							) : (
								""
							)
						)}
					</div>
					{/* Color INfo */}
					<div
						className="mini-radio-buttons-colors"
						onChange={this.handelColor}
					>
						{attributes.map((item) => {
							return item.id === "Color"
								? item.items.map((item) => {
										return (
											<label className="custom-radio" key={item.id}>
												<input
													id={item.id}
													type="radio"
													name="radio"
													value={item.value}
												/>
												<span
													className={
														activeColor === item.value
															? "radio-btn-color active"
															: "radio-btn-color"
													}
													style={{ background: item.value }}
												>
													<div className="hobbies-icon"></div>
												</span>
											</label>
										);
								  })
								: "";
						})}
					</div>
				</div>
			</>
		);
	}
}

export default MiniLeft;
