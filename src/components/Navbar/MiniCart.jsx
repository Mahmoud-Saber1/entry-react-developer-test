import React, { Component } from "react";
import TotalPrice from "../Cart/TotalPrice";
import MiniLeft from "./MiniInfo/MiniLeft";

// Connect to Redux store and map state to props for this component
import { connect } from "react-redux";
import { addToCart, removeFromCart } from "../../stateManagemnt/GlobalActions";

class MiniCart extends Component {
	// Redirect to the Cart Page Using Router Dom
	redirectToCart = () => {
		const location = this.props.location;
		if (location === "cart") {
			window.location.reload();
		} else {
			window.location.href = "/cart";
		}
	};

	render() {
		const { currency, cart, sizeItem, colorItem } = this.props;

		return (
			<>
				{cart.length === 0 ? (
					<div className="cart-empty" key={cart.id}>
						<h2>Your Cart is Empty</h2>
						<a href="/">
							<i className="bx bx-left-arrow-alt"></i>
							Back To Shop
						</a>
					</div>
				) : (
					<>
						{cart.map((item) => (
							<div className="mini-cart-container" key={item.id}>
								{/* MiniCart Left */}
								<MiniLeft
									item={item}
									currency={currency}
									size={sizeItem}
									color={colorItem}
								/>
								{/* MiniCart Right */}
								<div className="mini-cart-right-section" key={item.id}>
									{/* MiniCart Contnet */}
									<div className="mini-cart-content">
										{/* MiniCart Add Button */}
										<div className="mini-cart-content-add">
											<button onClick={() => this.props.addToCart(item)}>
												+
											</button>
										</div>
										{/* MiniCart Quntity */}
										<div className="mini-cart-content-qty">
											<h3>{item.count}</h3>
										</div>
										{/* MiniCart Remove Button */}
										<div className="mini-cart-content-remove">
											<button onClick={() => this.props.removeFromCart(item)}>
												-
											</button>
										</div>
									</div>
									{/* MiniCart Image */}
									<div className="mini-cart-image">
										<img src={item.gallery[0]} alt="" />
									</div>
								</div>
							</div>
						))}
						<div className="mini-cart-total-container">
							<div className="mini-cart-total-content">
								{/* Checkout Button */}
								<TotalPrice cart={cart} currency={currency} tax={0} />
								<div className="mini-cart-total-checkout">
									<div className="mini-cart-checkout">
										<button>ORDER NOW</button>
									</div>
									<div className="mini-cart-view-bag">
										<button onClick={this.redirectToCart}>VIEW BAG</button>
									</div>
								</div>
							</div>
						</div>
					</>
				)}
			</>
		);
	}
}

// Connect to Location State In The Store
const mapStateToProps = (state) => {
	return {
		currency: state.currency.currency,
		cart: state.cart.cartItems,
		location: state.location,
		sizeItem: state.sizeItem.size,
		colorItem: state.colorItem.color,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		addToCart: (prdouct) => dispatch(addToCart(prdouct)),
		removeFromCart: (prdouct) => dispatch(removeFromCart(prdouct)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(MiniCart);
