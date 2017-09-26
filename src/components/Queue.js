import React, { Component } from 'react'
import Item from './Item'
import { graphql, gql } from 'react-apollo'

class Queue extends Component {

  render() {

    if (this.props.allItemsQuery && this.props.allItemsQuery.loading) {
      return <div>Loading</div>
    }

    if (this.props.allItemsQuery && this.props.allItemsQuery.error) {
      return <div>Error</div>
    }

    const itemsToRender = this.props.allItemsQuery.allItems
    return (
      <div>
    			<section className="main">
    				<ul className="todo-list">
              {itemsToRender.map(item => (
                <Item key={item.id} item={item}/>
              ))}
            </ul>
          </section>
      </div>
    )
  }

}

const ALL_ITEMS_QUERY = gql`
  query allItemsQuery {
    allItems {
      id
      createdAt
      description
      completed
    }
  }
`

export default graphql(ALL_ITEMS_QUERY, { name: 'allItemsQuery' }) (Queue)
