import React, { Component } from "react";
import { Product } from "../../components";

// GraphQl Query Dependencies
import { Query } from "@apollo/react-components";
import { gql } from "@apollo/client";

class ProductPage extends Component {
	render() {
		// GraphQl Query
		const ALL_CATEGORIES = gql`
			{
				categories {
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
				<div className="container categorys product">
					<Query query={ALL_CATEGORIES}>
						{({ loading, error, data }) => {
							if (loading) return <div>Loading...</div>;
							if (error) return <div>Error :(</div>;
							return <Product product={data} />;
						}}
					</Query>
				</div>
			</>
		);
	}
}

export default ProductPage;
