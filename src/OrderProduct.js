import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';
import './index.css';

class OrderProduct extends Component {

    constructor(props) {
        super(props);
        this.state = {
            total: this.props.myProp[0]['price'],
            productSelectId: 1,
        };
    }

    sendBackData = (e) => {

        let selectState = {
            productId: this.productSelect.value,
            quantity: this.quantitySelect.value
        }

        this.setState({
            total: (this.props.myProp[this.productSelect.value]['price'] * this.quantitySelect.value).toFixed(2)
        })

        console.log(this.productSelect.value)

        this.props.parentCallback(this.props.elementIndex, selectState)
    }


    render() {

        let quantity = Array.from({length: 50}, (_, i) => i + 1);

        return (
            <Table>
            <thead>
            <tr>
                <td>Product</td>
                <td>Quantity</td>
                <td>total</td>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>
                    <select className={'product-select'} defaultValue={this.state.productSelectId} onChange={this.sendBackData} ref = {(input)=> this.productSelect = input}>
                        {this.props.myProp.map(
                            product =>
                                <option value={product.id}>{product.product_name}</option>
                        )}
                    </select>
                </td>
                <td>
                    <select className={'quantity-select'} onChange={this.sendBackData} ref = {(input)=> this.quantitySelect = input}>
                        {quantity.map(( index) => {
                            return <option value={index}>{index}</option>
                        })}
                    </select>
                </td>
                <td>
                    £{this.state.total}
                </td>
            </tr>
                </tbody>
            </Table>
        );
    }
};

export default OrderProduct