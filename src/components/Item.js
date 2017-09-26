import React, { Component } from 'react'
import { timeDifferenceForDate } from '../utils'

var divStyle = {
  fontSize: '8pt'
};

class Item extends Component {

  render() {
    return (
      <div>
        <li className="">
          <div className="view">
            <input className="toggle" type="checkbox" onClick={() => this._checkOff()}/>
            <label>{this.props.item.description}</label>
            <button className="destroy"></button>
            <span style={divStyle}>{timeDifferenceForDate(this.props.item.createdAt)}</span>
          </div>
        </li>
      </div>
    )
  }
}

export default Item
