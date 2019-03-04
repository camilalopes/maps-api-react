import React, { Component } from "react";
import PropTypes from "prop-types";

class List extends Component {
  render(){
    return (
      <ul>
        {this.props.markers.map((marker, index) => (
          <li key={index}>
            {marker.name}
            <button type="button" onClick={() => this.props.onClick(marker)}>click </button>
          </li>))}
      </ul>
    );
  }
}

List.propTypes = {
  markers: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired
}

export default List;
