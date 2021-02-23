import React, { Component } from 'react';

import { Container, Menu } from 'semantic-ui-react';

export default class Navbar extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Menu fixed="top" style={{ position: 'relative'}} fixed inverted>
                    <Container>
                        <Menu.Item as="a" header href="/">
                            Home
                        </Menu.Item>
                        <Menu.Item id="add-order" as="a" header href="/addOrder">
                            Add order
                        </Menu.Item>
                    </Container>
                </Menu>
            </div>
        );
    }
};