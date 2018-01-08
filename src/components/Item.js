import React, { Component } from 'react'
import { graphql, gql, compose } from 'react-apollo'
import { timeDifferenceForDate } from '../utils'

var divStyle = {
  fontSize: '8pt'
};

class Item extends Component {

  state = {
    description: this.props.item.description,
    completed: this.props.item.completed,
    id: this.props.item.id,
  }

  render() {
    return (
      <div>
        <li className="">
          <div className="view">
            <input className="toggle" type="checkbox" onClick={this._checked} defaultChecked={this.state.completed}/>
            <label>{this.props.item.description}</label>
            <button className="destroy" onClick={this._deleteItem}></button>
            <span style={divStyle}>{timeDifferenceForDate(this.props.item.createdAt)}</span>
          </div>
        </li>
      </div>
    )
  }

  _checked = (target) => {
    this.setState({completed: !this.props.item.completed}, () => this._updateItem(target));
  }

  _updateItem = async (target) => {
      const { description, completed, id } = this.state
      await this.props.updateItemMutation({
        variables: {
          id,
          completed,
          description,
        }
      })
    }

  _deleteItem = (target) => {
    const { id } = this.state
    this.props.deleteItemMutation({
      variables: {
        id
      }
    })
    console.log(this.props);
  }
}


const UPDATE_ITEM_MUTATION = gql`
  mutation updateItem($id: ID!, $completed: Boolean!, $description: String!) {
    updateItem(id: $id, completed: $completed, description: $description) {
      id: id,
      completed: completed,
      description: description
    }
  }
`

const DELETE_ITEM_MUTATION = gql`
  mutation deleteItem($id: ID!) {
    deleteItem(id: $id) {
      id: id
    }
  }
`

export default compose ( 
  graphql(UPDATE_ITEM_MUTATION, {name: 'updateItemMutation'}),
  graphql(DELETE_ITEM_MUTATION, {name: 'deleteItemMutation'}),
)(Item)
