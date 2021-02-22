import React, { Component } from 'react';
import { API_BASE_URL } from './config'
import Header from "semantic-ui-react/dist/commonjs/elements/Header";
import Table from "semantic-ui-react/dist/commonjs/collections/Table";
import Link from "react-router-dom/Link";

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            orders: null,
            isLoading: false
        };
    }

    componentWillMount() {
        this.getOrders();
    }

    async getOrders() {
        if (!this.state.orders) {
            try {

                this.setState({
                    isLoading: true
                });

                const response = await fetch(API_BASE_URL + '/orders', {});

                const allOrders = await response.json();

                this.setState({
                    orders: allOrders,
                    isLoading: false
                });

            } catch (err) {
                this.setState({
                    isLoading: false
                });

                console.error(err);
            }

        }
    }

    render() {
        return (
            <div>
                <Header as="h1">Orders</Header>
                <div>
                    <Table>
                        <thead>
                        <tr>
                            <th>Order Number</th>
                            <th>Date</th>
                            <th>Customer</th>
                            <th>Total</th>
                            <th>View Order</th>
                        </tr>
                        </thead>
                        <tbody>
                        {(this.state.orders.map(
                            order =>
                                <tr key={order.id}>
                                    <td>{order.id}</td>
                                    <td>{order.date}</td>
                                    <td>{order.customer_name}</td>
                                    <td>£{order.total_cost}</td>
                                    <td><Link to={'/viewOrder/' + order.id}>View Order</Link></td>
                                </tr>
                        ))}
                        </tbody>
                    </Table>
                </div>
            </div>
        );
    }
}

export default Home