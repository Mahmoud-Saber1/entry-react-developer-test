import React, { Component } from "react";

// QraphQl Query Dependency
import { gql } from "@apollo/client";
import { Query } from "@apollo/react-components";

class NavbarMenu extends Component {
	render() {
		const GRAPH_CATEGORYS_NAME = gql`
			{
				categories {
					name
				}
			}
		`;

		const { location } = this.props;

		return (
			<div className="navbar-menu">
				<ul className="navbar-menu-list">
					{/* Navbar Menu Component */}
					<Query query={GRAPH_CATEGORYS_NAME}>
						{({ loading, error, data }) => {
							if (loading) return <p>Loading...</p>;
							if (error) return <p>Error :(</p>;
							return data.categories.map((category, index) => (
								//Active Category Add Class Active
								<li
									key={index}
									className={
										location === category.name
											? "navbar-menu-item active"
											: "navbar-menu-item"
									}
								>
									<a href={`/category/${category.name}`}>{category.name}</a>
								</li>
							));
						}}
					</Query>
				</ul>
			</div>
		);
	}
}

export default NavbarMenu;
