import React, { Component } from "react";
import "./Cart.css";
import LeftSide from "./LeftSide";
import TotalPrice from "./TotalPrice";

// Connect to Redux store and map state to props for this component
import { connect } from "react-redux";
import { addToCart, removeFromCart } from "../../stateManagemnt/GlobalActions";

class Cart extends Component {
	constructor(props) {
		super(props);
		this.state = {
			slideIndex: 0,
		};
	}
	// Get the location from the URL
	getLocathion = () => {
		const path = window.location.pathname;
		const page = path.split("/").pop();
		return page;
	};

	// Get Tax Function
	getTax = () => {
		const { cart, currency } = this.props;
		const inStock = cart.filter((item) => item.inStock);

		const tax = inStock.reduce(
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
							return (total = parseFloat(total) + totalPrice).toFixed(2);
						}
					),
			0
		);
		return ((tax * 21) / 100).toFixed(2);
	};

	// Redirect to the Cart Page Using Router Dom
	redirectToCart = () => {
		const location = this.getLocathion();
		if (location === "cart") {
			window.location.reload();
		} else {
			window.location.href = "/cart";
		}
	};

	componentDidMount() {
		// Update Tax State
		this.setState({ tax: this.getTax() });
	}

	componentDidUpdate(prevProps) {
		// Update Tax State
		if (prevProps.cart !== this.props.cart) {
			this.setState({ tax: this.getTax() });
		}
	}

	// privousImage Handeling Function By Id

	previousImage = (n) => {
		const { slideIndex } = this.state;
		const slides = document.querySelectorAll(".image-slider-item");
		// Check if itemid equal to the current item id

		if (slideIndex === 0) {
			this.setState({ slideIndex: slides.length - 1 });
		}
		this.setState({ slideIndex: slideIndex - n });

		// Change Image
		slides.forEach((slide) => {
			slide.classList.remove("active");
		});
		slides[this.state.slideIndex].classList.add("active");

		// If there is the last image
		if (this.state.slideIndex === slides.length - 1) {
			this.setState({ slideIndex: 0 });
		}
	};

	// nextImage Handeling
	nextImage = (n) => {
		const { slideIndex } = this.state;
		const slides = document.querySelectorAll(".image-slider-item");

		if (slideIndex === slides.length - 1) {
			this.setState({ slideIndex: 0 });
		}
		this.setState({ slideIndex: slideIndex + n });

		// Change Image
		slides.forEach((slide) => {
			slide.classList.remove("active");
		});
		slides[this.state.slideIndex].classList.add("active");

		// If there is the last image
		if (this.state.slideIndex === slides.length - 1) {
			this.setState({ slideIndex: 0 });
		}
	};

	render() {
		const { currency, cart, sizeItem, colorItem } = this.props;

		return (
			<>
				{/* Cart */}
				<div className="cart">
					{
						// If cart is empty
						cart.length === 0 ? (
							<div className="cart-empty">
								<h2>Your Cart is Empty</h2>
								<p>
									You have no items in your cart. To buy one or more items,
									click on the "Add to Cart" button next to the item.
								</p>
								<a href="/">
									<i className="bx bx-left-arrow-alt"></i>
									Back To Shop
								</a>
							</div>
						) : (
							// If cart is not empty
							<>
								{/* Loop Cart */}
								{cart.map((item, index) => (
									<div className="cart-contianer" key={item.id}>
										{/* Cart Left Section */}
										<LeftSide
											item={item}
											currency={currency}
											color={colorItem}
											size={sizeItem}
										/>
										{/* Cart Right Section */}
										<div className="cart-right-section">
											{/* Right Cart COntent */}
											<div className="cart-right-content">
												{/* Add Button */}
												<div className="cart-right-content-add">
													<button onClick={() => this.props.addToCart(item)}>
														+
													</button>
												</div>
												{/* Quantity */}
												<div
													className="cart-right-content-quantity"
													key={index}
												>
													<h3>{item.count}</h3>
												</div>
												{/* Remove Button */}
												<div className="cart-right-content-remove">
													<button
														onClick={() => this.props.removeFromCart(item)}
													>
														-
													</button>
												</div>
											</div>
											{/* image Slider */}
											<div className="cart-images">
												<div className="image-slider-container">
													<div className="image-slider">
														{item.gallery.map((image, index) => (
															<div
																className={
																	"image-slider-item " +
																	(index === 0 ? "active" : "")
																}
																key={index}
															>
																<img src={image} alt="" />
															</div>
														))}
													</div>
													{/* slider Buttons */}
													<div className="image-slider-buttons">
														<button
															onClick={() => this.previousImage(-1)}
															className="image-slider-button-left"
														>
															<i className="bx bx-chevron-left"></i>
														</button>
														<button
															onClick={() => this.nextImage(1)}
															className="image-slider-button-right"
														>
															<i className="bx bx-chevron-right"></i>
														</button>
													</div>
												</div>
											</div>
										</div>
									</div>
								))}
								{/* Total Container */}
								<div className="cart-total-container">
									<div className="cart-total-content">
										{this.getLocathion() === "cart" ? (
											<>
												{/* Tax */}
												<div className="cart-total-tax">
													<h2>
														<span>Tax 21% : </span>
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
															{this.getTax()}
														</span>
													</h2>
												</div>
												{/* Quntity */}
												<div className="cart-total-quantity">
													<h2>
														<span>Quantity : </span>
														<span>
															{
																// Calc Quantity
																cart.reduce((total, item) => {
																	return total + item.count;
																}, 0)
															}
														</span>
													</h2>
												</div>
											</>
										) : null}
										{/* Total */}
										<TotalPrice
											cart={cart}
											currency={currency}
											tax={this.getTax()}
										/>

										{/* Checkout Button */}
										<div className="cart-total-checkout">
											<div className="cart-checkout">
												<button>ORDER NOW</button>
											</div>
											{this.getLocathion() !== "cart" ? (
												<div className="cart-view-bag">
													<button onClick={this.redirectToCart}>
														VIEW BAG
													</button>
												</div>
											) : null}
										</div>
									</div>
								</div>
							</>
						)
					}
				</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
