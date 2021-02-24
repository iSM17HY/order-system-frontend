import React, { Component } from 'react';
import { Header, Message, Table } from 'semantic-ui-react';
import axios from "axios";
import './index.css';

require('dotenv').config()

class ViewOrder extends Component {

    constructor(props) {
        super(props);
        let currentOrder = window.location.href.charAt(window.location.href.length - 1);

        this.state = {
            order: currentOrder,
            isLoading: [],
            products: [],
            orderData: [],
            customer: [],
        };
    }

    componentWillMount() {
        this.getOrder();
    }

    async getOrder() {
        if (!this.state.orderData.length) {
            try {
                this.setState({
                    isLoading: true
                });

                axios.get(process.env.REACT_APP_API_BASE_URL + '/order?orderId=' + this.state.order)
                    .then(response => {
                        this.setState({
                            orderData: response.data.order,
                            customer: response.data.customer,
                            products: response.data.products,
                            isLoading: false
                        });
                    })


                console.log(this.state.orderData)

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
            <div className={'content'}>
                <div>
                    <Header as="h1">Order Number: {this.state.orderData['order_number']}</Header>
                    <div>
                        <Header as={'h2'} className={'table-header'}>Order</Header>
                        <Table>
                            <thead>
                            <tr>
                                <th>Order Number</th>
                                <th>Date</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>{this.state.orderData['order_number']}</td>
                                <td>{this.state.orderData['order_date']}</td>
                            </tr>
                            </tbody>
                        </Table>
                    </div>
                    <div>
                        <Header as={'h2'} className={'table-header'}>Customer</Header>
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
                                <td>{this.state.customer.id}</td>
                                <td>{this.state.customer['firstname']}</td>
                                <td>{this.state.customer['surname']}</td>
                            </tr>
                            </tbody>
                        </Table>
                    </div>
                    <div>
                        <Header as={'h2'} className={'table-header'}>Items</Header>
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
                            {this.state.products.map(
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
        );
    }
};

export default ViewOrder
