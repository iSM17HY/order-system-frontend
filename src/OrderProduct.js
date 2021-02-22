import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';

class OrderProduct extends Component {

    sendBackData = (e) => {

        let selectState = {
            productId: this.productSelect.value,
            quantity: this.quantitySelect.value
        }

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
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>
                    <select className={'product-select'} onChange={this.sendBackData} ref = {(input)=> this.productSelect = input}>
                        {this.props.myProp.products.map(
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
            </tr>
            </tbody>
        </Table>
        );
    }
};

export default OrderProduct