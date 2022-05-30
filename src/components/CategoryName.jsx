import React, { Component } from "react";

class CategoryName extends Component {
	render({ name } = this.props) {
		return (
			<>
				<div className="category-name">
					<h1>{name}</h1>
				</div>
			</>
		);
	}
}

export default CategoryName;
