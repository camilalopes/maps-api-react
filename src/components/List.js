import React, { Component } from "react";
import PropTypes from "prop-types";

class List extends Component {

  render(){
    return (
      <ul>
        {this.props.markers.map((marker, index) => (
          <li key={index}>
            {marker.name}
          </li>))}
      </ul>
    );
  }
}

List.propTypes = {
  markers: PropTypes.array,
}

export default List;
