import React, { Component } from "react";

class Color extends Component {
	render() {
		const { color, activeColor, handelColor, attributes } = this.props;
		return (
			<>
				{/* Color */}
				<div className="cart-price">
					{attributes.map((item) =>
						item.id === "Color" ? (
							<h2>
								<span>{item.id} : </span>
								<span>{color}</span>
							</h2>
						) : null
					)}
				</div>
				{/* Color INfo */}
				<div className="radio-buttons-colors" onChange={handelColor}>
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
			</>
		);
	}
}

export default Color;
