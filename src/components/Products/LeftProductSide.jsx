import React, { Component } from "react";

// Connect to Redux store and map state to props for this component
import { connect } from "react-redux";
import { setSize, setColor } from "../../stateManagemnt/GlobalActions.js";
import { Color, Size } from "./LeftSideInfo";

class LeftSide extends Component {
	state = {
		size: "",
		activePrice: "",
		color: "",
		activeColor: "",
	};

	// Set Size to state and dispatch action to redux store
	handleChange = (e) => {
		this.setState({ size: e.target.value, activePrice: e.target.value });
		this.props.setSize(e.target.value);
	};

	handelColor = (e) => {
		this.setState({
			color: e.target.id,
			activeColor: e.target.value,
		});
		this.props.setColor(e.target.id);
	};

	// Update the state when the component is mounted
	componentDidMount() {
		const sizeItem = this.props.sizeItem;
		const colorItem = this.props.colorItem;
		this.setState({
			size: sizeItem,
			activePrice: sizeItem,
			color: colorItem,
			activeColor: colorItem,
		});
	}

	// Update the state when the component is updated
	componentDidUpdate(prevProps) {
		if (this.props.size !== prevProps.size) {
			this.setState({
				size: this.props.size,
				activePrice: this.props.size,
			});
		}
		if (this.props.color !== prevProps.color) {
			this.setState({
				color: this.props.color,
				activeColor: this.props.color,
			});
		}
	}

	render({ category } = this.props) {
		const { size, color, activeColor, activePrice } = this.state;
		const { currency, colorItem } = this.props;
		console.log(colorItem);
		const { attributes, id, brand, prices } = category;

		return (
			<div className="cart-left-section" key={id}>
				{/* Name & Brand*/}
				<div className="cart-name">
					<h1>{id}</h1>
					<span>{brand}</span>
				</div>
				{/* Size Component */}
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
				{/* Price */}
				<div className="cart-price">
					<h2>
						<span>Price : </span>
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
										{price.amount}
									</span>
								))}
						</span>
					</h2>
				</div>
			</div>
		);
	}
}

// Connect to Location State In The Store
const mapStateToProps = (state) => {
	return {
		currency: state.currency.currency,
		sizeItem: state.sizeItem.size,
		colorItem: state.colorItem.color,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		setSize: (sizeItem) => dispatch(setSize(sizeItem)),
		setColor: (colorItem) => dispatch(setColor(colorItem)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(LeftSide);
