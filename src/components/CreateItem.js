import React, { Component } from 'react'
import { graphql, gql } from 'react-apollo'
import { GC_USER_ID }  from '../constants'
class CreateItem extends Component {

  state = {
    description: '',
    completed: false
  }

  render() {
    return (
      <div>
        <input className="new-todo"
          onChange={(e) => this.setState({ description: e.target.value })}
          value={this.state.description}
          onKeyPress={this._createItem}
          placeholder="What needs to be done?"
          autoFocus />
      </div>
    )
  }

  _createItem = async (target) => {
    if(target.charCode===13) {
      const { description, completed } = this.state
      const postedById = localStorage.getItem(GC_USER_ID)
      console.log(postedById)
      await this.props.createItemMutation({
        variables: {
          description,
          completed,
          postedById
        }
      })
      this.props.sendData({description, completed, postedById})
      this.setState({description: ""})
    }
  }

}

const CREATE_ITEM_MUTATION = gql`
  mutation CreateItemMutation($description: String!, $completed: Boolean!, $postedById: ID!) {
    createItem(
      description: $description,
      completed: $completed,
      postedById: $postedById
    ) {
      id
      createdAt
      completed
      description
      postedBy {
    	  id
    	}
    }
  }
`
export default graphql(CREATE_ITEM_MUTATION, { name: 'createItemMutation' })(CreateItem)
