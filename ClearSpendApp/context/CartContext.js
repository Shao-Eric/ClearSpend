import React from 'react';
import { Snackbar } from 'react-native-paper';

export const CartContext = React.createContext()

export default class Cart extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            addItem: (item) => this.addItem(item),
            removeItem: (item) => this.removeItem(item),
            listOfItems: [],
            snackVisible: false,
            text: ""
        }
    }

    addItem(item) {
        this.setState({ listOfItems: [...this.state.listOfItems, item], snackVisible: true, text: "Added Item To Cart" })
    }

    removeItem(item) {
        let items = this.state.listOfItems
        items = items.filter(i => i != item)
        this.setState({ listOfItems: items, text: "Removed Item From Cart", snackVisible: true })
    }

    render() {
        return (
            <CartContext.Provider value={this.state}>
                <Snackbar
                    duration={500}
                    visible={this.state.snackVisible}
                    onDismiss={() => this.setState({ snackVisible: false })}
                >
                    {this.state.text}
                </Snackbar>
                {this.props.children}
            </CartContext.Provider>
        )
    }
}