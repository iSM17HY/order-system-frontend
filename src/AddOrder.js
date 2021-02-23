import React, { Component } from 'react';
import { API_BASE_URL } from './config';
import OrderProduct from "./OrderProduct";
import axios from 'axios';
import './index.css';
import Header from "semantic-ui-react/dist/commonjs/elements/Header";

class AddOrder extends Component {

    constructor(props) {
        super(props);
        this.state = {
            customers: [],
            products: [],
            productsAdded: 0,
            productSelectors: [],
            selectorCount: 0,
            selectorStates: {},
            showSubmit: false,
            selectedCustomer: 0,
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
            productSelectors: [...this.state.productSelectors, <OrderProduct elementIndex={this.state.selectorCount} parentCallback={this.callbackFunction} myProp={this.state.products}/>],
            selectorCount: this.state.selectorCount += 1,
            showSubmit: true,
        })

    }

    componentWillMount() {
        this.getOrderingOptions();
    }

    async getOrderingOptions() {
        if (!this.state.customers.length || !this.state.products.length) {
            try {

                axios.get(API_BASE_URL + '/orderOptions')
                    .then(response => {
                        this.setState({
                            customers: response.data.customers,
                            products: response.data.products,
                            isLoading: false
                        });
                    })

            } catch (err) {
                this.setState({
                    isLoading: false
                });
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
            <div className={'content'}>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <Header as={'h1'}>Customers</Header>
                        <select name='customer' ref = {(input)=> this.selectedCustomer = input}>
                            {this.state.customers.map(customer =>
                                <option value={customer.id}>{customer.firstname + ' ' + customer.surname}</option>
                            )}
                        </select>

                        <Header as={'h1'}>Products</Header>

                        <a onClick={this.addProductSelect}>Click here to add a product</a>
                        {this.state.productSelectors}
                    </div>

                    {this.state.showSubmit ? <button className={'submit'}>Submit Order</button> : null}
                </form>
            </div>
        );
    }
};

export default AddOrder