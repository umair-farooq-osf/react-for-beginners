import React, { Component } from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';

class App extends Component {
    state = {
        fishes: {},
        orders: {}
    };

    addFish = (fish) => {
        console.log("adding fish");
    }

    render () {
        return (
            <div className="catch-of-the-day">
                <div className="menu">
                    <Header tagline="Fresh Seafood Market" />
                </div>
                <Order />
                <Inventory addFish={this.addFish} />
            </div>
        );
    }
}

export default App;