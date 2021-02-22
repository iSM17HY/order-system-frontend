import React, { Component } from 'react';
import { Header, Message, Table } from 'semantic-ui-react';
import { API_BASE_URL } from './config'

class ViewOrder extends Component {

    constructor(props) {
        super(props);
        let currentOrder = window.location.href.charAt(window.location.href.length - 1);

        this.state = {
            order: currentOrder,
            isLoading: null,
            orderData: null,
        };
    }

    componentWillMount() {
        this.getOrder();
    }

    async getOrder() {
        if (!this.state.orderData) {
            try {

                this.setState({
                    isLoading: true
                });

                const response = await fetch(API_BASE_URL + '/order?orderId=' + this.state.order, {});

                const order = await response.json();

                this.setState({
                    order: order,
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
                <div>
                    <div>
                        <Header as="h1">Orders</Header>
                        <div>
                            <Table>
                                <thead>
                                <tr>
                                    <th>Order Number</th>
                                    <th>Date</th>
                                </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{this.state.orderData.order.order_number}</td>
                                        <td>{this.state.orderData.order.order_date}</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </div>
                        <div>
                            <Table>
                                <thead>
                                <tr>
                                    <th>Customer Number</th>
                                    <th>First Name</th>
                                    <th>Family Name</th>
                                </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{this.state.orderData.customer.id}</td>
                                        <td>{this.state.orderData.customer.firstname}</td>
                                        <td>{this.state.orderData.customer.surname}</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </div>
                        <div>
                            <Table>
                                <thead>
                                <tr>
                                    <th>Item Number</th>
                                    <th>Description</th>
                                    <th>Quantity</th>
                                    <th>Price (per unit)</th>
                                    <th>Sub Total</th>
                                </tr>
                                </thead>
                                <tbody>
                                {this.state.orderData.products.map(
                                    product =>
                                        <tr id={product.id} key={product.id}>
                                            <td>{product.id}</td>
                                            <td>{product.product_name}</td>
                                            <td>{product.quantity}</td>
                                            <td>£{product.product_cost}</td>
                                            <td>£{product.quantity * product.product_cost}</td>
                                        </tr>
                                )}
                                </tbody>
                            </Table>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

export default ViewOrder
