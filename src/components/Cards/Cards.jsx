/* eslint-disable react-hooks/rules-of-hooks */
import React, { Component } from "react";
import { gql } from "@apollo/client";
import { Query } from "@apollo/react-components";
import "./Cards.css";

// Connect to Redux store and map state to props for this component
import { connect } from "react-redux";
import { addToCart } from "../../stateManagemnt/GlobalActions";

class Cards extends Component {
	// Add To Cart Function
	addToCart = (product) => {
		this.props.addToCart(product);
	};

	render() {
		const { location, currency } = this.props;

		const ALL_CATEGORIES = gql`
			{
				categories {
					name
					products {
						id
						category
						description
						brand
						inStock
						gallery
						prices {
							currency {
								label
								symbol
							}
							amount
						}
						attributes {
							id
							type
							items {
								value
								id
							}
						}
					}
				}
			}
		`;

		return (
			<>
				{/* Card */}
				<Query query={ALL_CATEGORIES}>
					{({ loading, error, data }) => {
						if (loading) return <p className="loading">Loading...</p>;
						if (error) return <p className="error">Error :(</p>;
						// Filter products by category
						const products = data.categories.filter(
							(category) => category.name === location
						);
						return (
							<>
								{products[0].products.map((product) => (
									<div className="card" key={product.id}>
										<div className="card-img">
											<img src={product.gallery[0]} alt={product.description} />
										</div>
										<div className="card-content">
											<h3>
												<a href={`/pdp/${product.id}`}>{product.brand}</a>
											</h3>
											<p>
												{/* Filter Price By Currency */}
												{product.prices
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
											</p>
										</div>
										{/* Add To Cart Button */}
										<div className="card-btn">
											<button className="btn">
												<i
													className="bx bxs-cart-add"
													onClick={() => this.addToCart(product)}
												></i>
											</button>
										</div>
									</div>
								))}
							</>
						);
					}}
				</Query>
			</>
		);
	}
}

// Connect to Location State In The Store
const mapStateToProps = (state) => {
	return {
		location: state.location,
		currency: state.currency.currency,
		cart: state.cart,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		addToCart: (product) => dispatch(addToCart(product)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Cards);
