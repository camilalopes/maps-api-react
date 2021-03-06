import React, { Component } from "react";
import PropTypes from "prop-types";

class List extends Component {
  render(){
    return (
      <ul className="venue-list">
        {this.props.markers.map((marker, index) => (
          <li key={index}>
            <div role="button" tabIndex="0" className="venue-item"
              onClick={() => this.props.onClick(marker)}>
              {marker.name}
            </div>
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
