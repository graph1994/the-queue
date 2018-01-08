import React, { Component } from 'react'
import Item from './Item'
import CreateItem from './CreateItem'
import { graphql, gql, compose } from 'react-apollo'

class Queue extends Component {

  constructor() {
    super();
    this.state = { items: [], completedItems: []  };
  }

  setItems(items) {
    this.setState({ items: items})
  }

  render() {

    if (this.props.allItemsQuery && this.props.allItemsQuery.loading) {
      return <div>Loading</div>
    }

    if (this.props.completedItemsQuery && this.props.completedItemsQuery.loading) {
      return <div>Loading</div>
    }

    if (this.props.allItemsQuery && this.props.allItemsQuery.error) {
      return <div>Error</div>
    }

    let items = this.props.allItemsQuery.allItems.slice(0).reverse()
    let completedItems = this.props.completedItemsQuery.allItems.slice(0).reverse()
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
          <section>
            <h3>Whats been acomplished?</h3>
            <ul className="todo-list">
                {completedItems.map(item => (
                  <Item key={item.id} item={item}/>
                ))}
            </ul>
          </section>
      </div>
    )
  }

  itemCreated = (item) => {
    this.props.allItemsQuery.refetch();
    this.props.completedItemsQuery.refetch();
  }

  itemChanged = (item) => {
    this.props.allItemsQuery.refetch();
    this.props.completedItemsQuery.refetch();
  }

}

const NONCOMPLETED_ITEMS_QUERY = gql`
  query nonCompletedItemsQuery {
    allItems(filter: { completed: false }) {
      id
      createdAt
      description
      completed
    }
  }
`

const COMPLETED_ITEMS_QUERY = gql`
  query completedItemsQuery {
    allItems(filter: { completed: true }) {
      id
      createdAt
      description
      completed
    }
  }
`

export default compose (
  graphql(COMPLETED_ITEMS_QUERY, { name: 'completedItemsQuery' }),
  graphql(NONCOMPLETED_ITEMS_QUERY, { name: 'allItemsQuery' }) 
) (Queue)

