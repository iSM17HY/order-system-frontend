import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

import Navbar from './Navbar';
import Home from './Home'
import Switch from "react-router-dom/Switch";
import Link from "react-router-dom/Link";
import AddOrder from "./AddOrder";
import ViewOrder from "./ViewOrder";

export default function App() {
    return (
        <Router>
            <div>
                <Navbar>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/addOrder">Add Order</Link>
                        </li>
                        <li>
                            <Link to="/viewOrder/:orderId">View Order</Link>
                        </li>
                    </ul>
                </Navbar>
                <Switch>
                    <Route path="/addOrder">
                        <AddOrder />
                    </Route>
                    <Route path="/" exact>
                        <Home />
                    </Route>
                    <Route path="/viewOrder/:orderId">
                        <ViewOrder />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}