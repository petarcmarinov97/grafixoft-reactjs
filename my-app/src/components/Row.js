import React, { Component } from 'react';
import "../styles/Row.css";

export default class Row extends Component {

    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick = () =>{
        const {onClickHandler, value} = this.props;

        onClickHandler && onClickHandler(value);
    }

  render() {
      const {className, value} = this.props;

      return <div
      className={className}
      onClick={this.handleClick}
      >{value}
      <button onClick={this.handleClick}>X</button>
      </div>;
  }
}
