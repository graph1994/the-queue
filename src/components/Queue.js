import React, { Component } from 'react'
import Item from './Item'
import CreateItem from './CreateItem'
import { graphql, gql } from 'react-apollo'

class Queue extends Component {

  constructor() {
    super();
    this.state = { items: [] };
  }

  setItems(items) {
    this.setState({ items: items})
  }

  render() {

    if (this.props.allItemsQuery && this.props.allItemsQuery.loading) {
      return <div>Loading</div>
    }

    if (this.props.allItemsQuery && this.props.allItemsQuery.error) {
      return <div>Error</div>
    }

    let items = this.props.allItemsQuery.allItems.slice(0).reverse()
    return (
      <div>
        <CreateItem sendData={this.itemCreated}/>
    			<section className="main">
    				<ul className="todo-list">
              {items.map(item => (
                <Item key={item.id} item={item}/>
              ))}
            </ul>
          </section>
      </div>
    )
  }

  itemCreated = (item) => {
    this.props.allItemsQuery.refetch()
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
