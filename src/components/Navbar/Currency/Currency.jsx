import React, { Component } from "react";

// QraphQl Query Dependency
import { gql } from "@apollo/client";
import { Query } from "@apollo/react-components";

class Currency extends Component {
	render() {
		const GRAPH_CATEGORYS_CURRENCY = gql`
			{
				categories {
					products {
						prices {
							currency {
								label
								symbol
							}
							amount
						}
					}
				}
			}
		`;

		const { getCurrency, openDpDCurrency, currency } = this.props;

		return (
			<div className="currency-icon" onClick={openDpDCurrency} id="dpdcurrency">
				<i className="bx bx-dollar"></i>
				<i className="bx bx-chevron-down"></i>
				{/* Drop Down Currency */}
				<div className="dropdown-currency">
					<Query query={GRAPH_CATEGORYS_CURRENCY}>
						{({ loading, error, data }) => {
							if (loading) return <p>Loading...</p>;
							if (error) return <p>Error :(</p>;

							return data.categories[0].products[0].prices.map(
								(price, index) => (
									<div
										key={index}
										className={
											currency === price.currency.symbo ||
											currency === price.currency.label
												? "dropdown-currency-item active"
												: "dropdown-currency-item"
										}
										onClick={getCurrency}
									>
										<>{price.currency.symbol}</>
										<>{price.currency.label}</>
									</div>
								)
							);
						}}
					</Query>
				</div>
			</div>
		);
	}
}

export default Currency;
