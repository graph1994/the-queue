import React, { Component } from 'react'
import { graphql, gql } from 'react-apollo'

class CreateItem extends Component {

  state = {
    description: '',
    completed: false
  }

  render() {
    return (
      <div>
      <header className="header">
        <h1>The Queue</h1>
        <input className="new-todo"
          onChange={(e) => this.setState({ description: e.target.value })}
          placeholder="What needs to be done?"
          autoFocus />
      </header>
        <button
          onClick={() => this._createItem()}
        >
          Submit
        </button>
      </div>
    )
  }

  _createItem = async () => {
    const { description, completed } = this.state
    await this.props.createItemMutation({
      variables: {
        description,
        completed
      }
    })
  }

}

const CREATE_ITEM_MUTATION = gql`
  mutation CreateItemMutation($description: String!, $completed: Boolean!) {
    createItem(
      description: $description,
      completed: $completed,
    ) {
      id
      createdAt
      completed
      description
    }
  }
`
export default graphql(CREATE_ITEM_MUTATION, { name: 'createItemMutation' })(CreateItem)
