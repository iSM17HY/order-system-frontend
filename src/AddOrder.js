import React, { Component } from 'react';
import { API_BASE_URL } from './config';
import OrderProduct from "./OrderProduct";
import axios from 'axios';

class AddOrder extends Component {

    constructor(props) {
        super(props);
        this.state = {
            orderingOptions: null,
            productsAdded: 0,
            productSelectors: [],
            selectorCount: 0,
            selectorStates: {}
        };
    }

    callbackFunction = (selectKey, data) => {

        let currentSelectorValues = this.state.selectorStates;
        let selectToEdit = currentSelectorValues[selectKey]

        if (typeof selectToEdit === 'undefined') {
            currentSelectorValues[selectKey] = {
                productId: data.productId,
                quantity: data.quantity
            }
        } else {
            currentSelectorValues[selectKey].productId = data.productId;
            currentSelectorValues[selectKey].quantity = data.quantity;
        }

        this.setState({
            selectorStates: currentSelectorValues
        });
    }

    addProductSelect = () => {
        this.setState({
            productSelectors: [...this.state.productSelectors, <OrderProduct elementIndex={this.state.selectorCount} parentCallback={this.callbackFunction} myProp={this.state.orderingOptions}/>],
            selectorCount: this.state.selectorCount += 1
        })

    }

    componentWillMount() {
        this.getOrderingOptions();
    }

    async getOrderingOptions() {
        if (!this.state.orderingOptions) {
            try {

                const response = await fetch(API_BASE_URL + '/orderOptions', {});
                const orderOptions = await response.json();

                this.setState({
                    orderingOptions: orderOptions,
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

    handleSubmit(event) {
        event.preventDefault();

        let postData = {
            customerId: this.selectedCustomer,
            products: this.state.selectorStates
        }

        axios.post(API_BASE_URL + '/addOrder', postData);

        window.location.href = '/';
    }

    render() {

        return (
            <form onSubmit={this.handleSubmit}>
                <div>
                    <h1>Customers</h1>
                    <p>Customers</p>
                    <select name='customer' ref = {(input)=> this.selectedCustomer = input}>
                        {this.state.orderingOptions.customers.map(
                            customer =>
                                <option value={customer.id}>{customer.firstname + ' ' + customer.surname}</option>
                        )}
                    </select>

                    <p>Products</p>

                    <a onClick={this.addProductSelect}>Add a product to the order</a>
                    {this.state.productSelectors}
                </div>

                <button>Add Order</button>
            </form>
        );
    }
};

export default AddOrder