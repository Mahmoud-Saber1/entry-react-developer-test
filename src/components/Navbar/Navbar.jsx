import React, { Component } from "react";
import "./Navbar.css";
import images from "../../images/";

// Connect to Redux store and map state to props for this component
import { connect } from "react-redux";
import { setCurrency, setQuantity } from "../../stateManagemnt/GlobalActions";
import MiniCart from "./MiniCart";
import NavbarMenu from "./NavbarMenu/NavbarMenu";
import Currency from "./Currency/Currency";

class Navbar extends Component {
	state = {
		overlay: false,
	};

	openDpDCurrency = () => {
		const dpdcurrency = document.getElementById("dpdcurrency");
		dpdcurrency.classList.toggle("dpdcurrency-open");

		const close = document.querySelector(".dropdown-currency-item.active");
		close.addEventListener("click", () => {
			dpdcurrency.classList.remove("dpdcurrency-open");
		});

		// Remove DpdCart When Dropdown Currency is open
		const dpdCart = document.getElementById("dpdCart");
		if (dpdCart.classList.contains("dpdcart-open")) {
			dpdCart.classList.remove("dpdcart-open");
		}
		if (!dpdCart.classList.contains("dpdcart-open")) {
			this.setState({ overlay: false });
		}
	};

	// Cart Show & Hide
	dpdCart = () => {
		const dpdCart = document.getElementById("dpdCart");
		dpdCart.classList.toggle("dpdcart-open");
		if (dpdCart.classList.contains("dpdcart-open")) {
			this.setState({ overlay: !this.state.overlay });
		} else {
			this.setState({ overlay: !this.state.overlay });
		}

		// Remove DpdCurreny Dropdown menu When Cart Dropdown menu is open
		const dpdcurrency = document.getElementById("dpdcurrency");
		if (dpdcurrency.classList.contains("dpdcurrency-open")) {
			dpdcurrency.classList.remove("dpdcurrency-open");
		}
	};

	// Get Currency from the Dropdown and set it in the Redux store
	getCurrency = (e) => {
		const currency = e.target.lastChild.data;
		this.props.setCurrency(currency);
		this.openDpDCurrency();
	};

	// Get Quntity From the Cart State
	getQuantity = (cart) => {
		let quantity = 0;
		if (cart) {
			cart.forEach((item) => {
				quantity += item.count;
			});
		}

		return quantity;
	};

	// Update the currency in the Redux store
	componentDidMount() {
		const currency = this.props.currency;
		this.props.setCurrency(currency);
		const cart = this.props.cart;
		const quantity = this.getQuantity(cart);
		this.props.setQuantity(quantity);
	}

	// Update the currency in the Redux store
	componentDidUpdate(prevProps) {
		const currency = this.props.currency;
		if (prevProps.currency !== currency) {
			this.props.setCurrency(String(currency));
		}
		const cart = this.props.cart;
		const quantity = this.getQuantity(cart);
		if (prevProps.cart !== cart) {
			this.props.setQuantity(quantity);
		}
	}

	render() {
		const { location, quantity } = this.props;

		return (
			<>
				{/* Custom Navbar */}
				<nav className="navbar">
					<div className="container">
						{/* Navbar Menu Component */}
						<NavbarMenu location={location} />
						<div className="box">
							{/* Navbar Logo Component */}
							<div className="navbar-logo">
								<a href="/category/all">
									<img src={images[1]} alt="logo" />
								</a>
							</div>
							{/* Navbar Icons & Drop Downs */}
							<div className="navbar-icons">
								{/* Currency Icons Component */}
								<Currency
									openDpDCurrency={this.openDpDCurrency}
									getCurrency={this.getCurrency}
									currency={this.props.currency}
								/>
								{/* Cart Icon Component */}
								<div className="cart-icon" onClick={this.dpdCart}>
									<div>
										<i className="bx bx-cart"></i>
										<span
											className={
												quantity > 0
													? "cart-count cart-count-show"
													: "cart-count"
											}
										>
											{quantity}
										</span>
									</div>
								</div>
								{quantity > 0 ? (
									<>
										<div className="mini-cart" id="dpdCart">
											<MiniCart />
										</div>
										{this.state.overlay && <div className="overlay"></div>}
									</>
								) : null}
							</div>
						</div>
					</div>
				</nav>
			</>
		);
	}
}

// Connect to Location State In The Store
const mapStateToProps = (state) => {
	return {
		location: state.location,
		currency: state.currency.currency,
		quantity: state.quantity,
		cart: state.cart.cartItems,
	};
};

// Connect to Dispatch Action In The Store
const mapDispatchToProps = (dispatch) => {
	return {
		setCurrency: (currency) => dispatch(setCurrency(currency)),
		setQuantity: (quantity) => dispatch(setQuantity(quantity)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
