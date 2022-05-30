import React, { Component } from "react";
import { Cards, CategoryName } from "../../components";

// Connect to Redux store and map state to props for this component
import { connect } from "react-redux";
import { setLocation } from "../../stateManagemnt/GlobalActions";

class CategoryPage extends Component {
	// Get the location from the URL
	getLocathion = () => {
		const path = window.location.pathname;
		const page = path.split("/").pop();
		return page;
	};

	// Set the location in the Redux store
	componentDidMount() {
		const location = this.getLocathion();
		this.props.setLocation(location);
	}

	componentDidUpdate(prevState) {
		if (prevState.location !== this.props.location) {
			this.props.setLocation(this.props.location);
		}
	}

	render() {
		const { location } = this.props;
		return (
			<>
				<div className="container categorys">
					{/* Category Name */}
					<CategoryName name={location} />
					{/* Card's Cpmonent */}
					<div className="cards">
						<Cards />
					</div>
				</div>
			</>
		);
	}
}

// Connect to Location State In The Store
const mapStateToProps = (state) => {
	return {
		location: state.location,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		setLocation: (location) => dispatch(setLocation(location)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryPage);
