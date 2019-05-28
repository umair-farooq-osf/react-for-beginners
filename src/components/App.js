import React, { Component } from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import Fish from './Fish';
import sampleFishes from '../sample-fishes';
import base from '../base';

class App extends Component {
    state = {
        fishes: {},
        order: {}
    };

    componentDidMount() {
        const { params } = this.props.match;
        const localStorageOrder = localStorage.getItem(params.storeId);

        if (localStorageOrder) {
            this.setState({ order: JSON.parse(localStorageOrder) });
        }

        this.ref = base.syncState(`${params.storeId}/fishes`, {
            context: this,
            state: 'fishes'
        });
    }

    componentDidUpdate() {
        const { params } = this.props.match;
        localStorage.setItem(params.storeId, JSON.stringify(this.state.order));
    }

    componentWillUnmount() {
        base.removeBinding(this.ref);
    }

    addFish = (fish) => {
        const fishes = { ...this.state.fishes };
        fishes[`fish${Date.now()}`] = fish;
        this.setState({ fishes });
    }

    updateFish = (key, fish) => {
        const fishes = { ...this.state.fishes };
        fishes[key] = fish;
        this.setState({ fishes: fishes });
    }

    loadSampleFishes = () => {
        this.setState({
            fishes: sampleFishes
        });
    }

    addToOrder = key => {
        const order = {...this.state.order};

        order[key]
            ? order[key]++
            : order[key] = 1;

        this.setState({ order });
    }

    render () {
        return (
            <div className="catch-of-the-day">
                <div className="menu">
                    <Header tagline="Fresh Seafood Market" />
                    <ul className="fishes">
                        {Object.keys(this.state.fishes).map(key => {
                            return (
                                <Fish
                                    key={key}
                                    id={key}
                                    details={this.state.fishes[key]}
                                    addToOrder={this.addToOrder}
                                />
                            );
                        })}
                    </ul>
                </div>
                <Order
                    fishes={this.state.fishes}
                    order={this.state.order}
                />
                <Inventory
                    fishes={this.state.fishes}
                    addFish={this.addFish}
                    updateFish={this.updateFish}
                    loadSampleFishes={this.loadSampleFishes}
                />
            </div>
        );
    }
}

export default App;