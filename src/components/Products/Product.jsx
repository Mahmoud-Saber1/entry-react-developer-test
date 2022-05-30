import React, { Component } from "react";
import "./Product.css";
import LeftProductSide from "./LeftProductSide";

// Connect to Redux store and map state to props for this component
import { connect } from "react-redux";
import { addToCart, removeFromCart } from "../../stateManagemnt/GlobalActions";

class Product extends Component {
	// Get Page location
	getLocation = () => {
		const path = window.location.pathname;
		const page = path.split("/").pop();
		return page;
	};

	ChangeCartButton = (e) => {
		const button1 = document.getElementById("addToCart");
		const button2 = document.getElementById("removeFromCart");
		if (e.target.id === "addToCart") {
			button1.style.display = "none";
			button2.style.display = "block";
		} else {
			button1.style.display = "block";
			button2.style.display = "none";
		}
	};

	render() {
		// Get Data From Product Page
		const { product } = this.props;
		return (
			<>
				{/* Product */}
				<div className="product">
					{product.categories[0].products.map((category) => {
						// Find products by category id
						return category.id === this.getLocation() ? (
							<div className="product-items" key={category.id}>
								<div className="product-item-left">
									<div className="product-item-left-img">
										<img src={category.gallery[0]} alt="product1" />
									</div>
									<div className="product-item-left-img-pdp">
										{category.gallery.map((image, index) => {
											return <img src={image} alt="product1" key={index} />;
										})}
									</div>
								</div>
								<div className="product-item-right">
									<div className="product-item-right-price">
										<LeftProductSide category={category} />
									</div>
									<button
										className="add-toCart-btn active"
										id="addToCart"
										onClick={(e) => {
											this.props.addToCart(category);
											this.ChangeCartButton(e);
										}}
									>
										Add to Cart
									</button>
									<button
										className="remove-fromCart-btn"
										id="removeFromCart"
										onClick={(e) => {
											this.props.removeFromCart(category);
											this.ChangeCartButton(e);
										}}
									>
										Remove From Cart
									</button>
									{/* Description */}
									<div className="product-item-right-description">
										<p>{category.description}</p>
									</div>
								</div>
							</div>
						) : null;
					})}
				</div>
			</>
		);
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		addToCart: (product) => dispatch(addToCart(product)),
		removeFromCart: (product) => dispatch(removeFromCart(product)),
	};
};

export default connect(null, mapDispatchToProps)(Product);
