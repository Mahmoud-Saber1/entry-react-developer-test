import React, { Component } from "react";

class Size extends Component {
	render() {
		const { size, activeSize, handleChange, attributes } = this.props;
		return (
			<>
				{/* Size */}
				<div className="cart-price" style={{ margin: "25px 0 10px" }}>
					{attributes.map((item) =>
						item.id === "Size" || item.id === "Capacity" ? (
							<h2>
								<span>{item.id} : </span>
								<span>{size}</span>
							</h2>
						) : null
					)}
				</div>
				{/* Size INfo */}
				<div
					className="radio-buttons"
					style={{ margin: "0px 0 25px" }}
					onChange={handleChange}
				>
					{/* Loop To Prices */}

					{attributes.map((item) => {
						return item.id === "Size" || item.id === "Capacity"
							? item.items.map((item) => {
									return (
										<label
											htmlFor={item.id}
											className="custom-radio"
											key={item.id}
										>
											<input
												id={item.id}
												type="radio"
												name="radio"
												value={item.value}
											/>
											<span
												className={
													activeSize === item.value
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
			</>
		);
	}
}

export default Size;
