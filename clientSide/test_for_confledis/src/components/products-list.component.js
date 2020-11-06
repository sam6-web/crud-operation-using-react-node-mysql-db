import React, { Component } from 'react'
import ProductDataService from '../services/product.service'
import { Card, CardBody,CardTitle, CardSubtitle } from 'reactstrap';
import { Link } from "react-router-dom";
import AddProductComponent from './add-product.component';

class ProductslistComponent extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            products: [],
            currentProduct: null,
            currentIndex: -1,
            searchNom: "",
            modal : false
        }
    }
    /* show modal */
     toggle = () => {
        this.setState({
            modal: !this.state.modal
        })
        console.log('state',this.state.currentProduct)
        console.log('index',this.state.currentIndex)
    }
    componentDidMount  () {
        this.retriecveProducts();
      }
    /* fetsh all product from the database */
    retriecveProducts=()=> {
    ProductDataService.getAll()
        .then(response => {
        this.setState({
            products: response.data
        });
        console.log("getdata",response.data);
        })
        .catch(e => {
        console.log(e);
        });
    }
    /* set Active product from index */
    setActiveProduct=(product, index)=> {
    this.setState({
        currentProduct: product,
        currentIndex: index
    });
    }
    /* remove all product from the database */
    removeAllProducts=()=> {
    ProductDataService.deleteAll()
        .then(response => {
        console.log(response.data);
        this.refreshList();
        })
        .catch(e => {
        console.log(e);
        });
    }
    /* refresh list of products */
    refreshList = () => {
        this.retriecveProducts();
        this.setState({
          currentProduct: null,
          currentIndex: -1
        });
      }
    
    /* search product from the database */
    onChangeSearchNom = (e) => {
        this.setState({
            searchNom: e.target.value
        });
        console.log("searchnom",this.state.searchNom)
        }
    searchNom=()=> {
    ProductDataService.findByTitle(this.state.searchNom)
        .then(response => {
        this.setState({
            products: response.data
        });
        console.log("data",response.data);
        })
        .catch(e => {
        console.log(e);
        });
    }
    /* delete product from database */
    deleteProduct = () => {    
        ProductDataService.delete(this.state.currentProduct.id)
          .then(response => {
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
      }
      
    render() {
        const { searchNom, products, currentProduct, currentIndex } = this.state;
        return (
            <div className="list row">
                <div className="col-md-12">
                <div className="input-group mb-3">
                    <input
                    type="text"
                    className="form-control"
                    placeholder="Chercher par nom..."
                    value={searchNom}
                    onChange={this.onChangeSearchNom}
                    />
                    <div className="input-group-append">
                    <button
                        className="btn btn-outline-secondary"
                        type="button"
                        onClick={this.searchNom}
                    >
                        Chercher
                    </button>
                    <AddProductComponent refreshList = { ()=> this.refreshList()} />
                    </div>
                </div>
                </div>
                
                <div className="col-md-12">
          {currentProduct ? (            
            <div>
            <Card>
                <CardBody>
                <CardTitle tag="h5"> Nom du produit :</CardTitle>
                <CardSubtitle tag="h6" className="mb-2 text-muted">{currentProduct.nom}</CardSubtitle>
                <CardTitle tag="h5">Prix unitaire :</CardTitle>
                <CardSubtitle tag="h6" className="mb-2 text-muted">{currentProduct.prix_unitaire}</CardSubtitle>
                <CardTitle tag="h5">Quantité :</CardTitle>
                <CardSubtitle tag="h6" className="mb-2 text-muted">{currentProduct.quantité}</CardSubtitle>
                <Link
                    to={"/produits/" + currentProduct.id}
                    type="button"
                    className="btn btn-primary"
                >
                    Editer
                </Link>
                </CardBody>
            </Card>
            </div>
                ) : (
                    <div>
                    <br />
                    <p>Clicker sur un produit ...</p>
                    </div>
                )}
                <div className="col-md-12">
                <h4>Liste des produits</h4>
                <ul className="list-group">
                    {
                    products  && products.map((product, index) => (
                        <li
                        className={
                            "list-group-item " +
                            (index === currentIndex ? "active" : "")
                        }
                        onClick={() => this.setActiveProduct(product, index)}
                        key={index}
                        >
                        {product.nom}
                        </li>
                    ))}
                </ul>
                <button
                    className="m-3 btn btn-sm btn-danger"
                    onClick={this.removeAllProducts}
                >
                    Supprimer tout
                </button>
                </div>
                </div>
                
            </div>
        )
    }
}
export default ProductslistComponent