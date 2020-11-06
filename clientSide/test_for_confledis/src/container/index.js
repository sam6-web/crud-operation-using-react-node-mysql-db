import React, { Component } from 'react'
import { Switch, Route } from "react-router-dom";
import ProductComponent from '../components/product.component';
import ProductslistComponent from '../components/products-list.component';

class Index extends Component {
    render() {
        return (
        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/produits"]} component={ProductslistComponent} />
            <Route path="/produits/:id" component={ProductComponent} />
          </Switch>
        </div>
        )
    }
}
export default Index