import React, { Component } from 'react'
import ProductDataService from '../services/product.service'

class ProductComponent extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            currentProduct: {
                id: null,
                nom: "",
                prix_unitaire: "",
                published: false
              },
              message: ""
        }
    }
    componentDidMount() {
    this.getProduct(this.props.match.params.id);
  }

  onChangeNom = (e) => {
    const nom = e.target.value;

    this.setState(function(prevState) {
      return {
        currentProduct: {
          ...prevState.currentProduct,
          nom: nom
        }
      };
    });
  }

  onChangePrix_unitaire = (e) => {
    const prix_unitaire = e.target.value;
    
    this.setState(prevState => ({
      currentProduct: {
        ...prevState.currentProduct,
        prix_unitaire: prix_unitaire
      }
    }));
  }
  onChangeQuantité = (e) => {
    const quantité = e.target.value;
    
    this.setState(prevState => ({
      currentProduct: {
        ...prevState.currentProduct,
        quantité: quantité
      }
    }));
  }

  getProduct = (id) => {
    ProductDataService.get(id)
      .then(response => {
        this.setState({
          currentProduct: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }



  updateProduct = ()=> {
    ProductDataService.update(
      this.state.currentProduct.id,
      this.state.currentProduct
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "Modification enregistré!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteProduct = () => {    
    ProductDataService.delete(this.state.currentProduct.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/produits')
      })
      .catch(e => {
        console.log(e);
      });
  }

    render() {
        const {currentProduct} = this.state
        return (
            <div>
                {currentProduct ? (
                <div className="edit-form">
                    <h4>Produit : {currentProduct.id} </h4>
                    <form>
                    <div className="form-group">
                        <label htmlFor="nom">Nom : </label>
                        <input
                        type="text"
                        className="form-control"
                        id="nom"
                        value={currentProduct.nom}
                        onChange={this.onChangeNom}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="prix_unitaire">Prix unitaire : </label>
                        <input
                        type="text"
                        className="form-control"
                        id="prix_unitaire"
                        value={currentProduct.prix_unitaire}
                        onChange={this.onChangePrix_unitaire}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="prix_unitaire">Quantité : </label>
                        <input
                        type="text"
                        className="form-control"
                        id="prix_unitaire"
                        value={currentProduct.quantité}
                        onChange={this.onChangeQuantité}
                        />
                    </div>
                    </form>
                    <button
                    className="btn btn-danger"
                    type="button"
                    onClick={()=>this.deleteProduct()}
                    >
                    Supprimer  
                    </button>

                    <button
                    type="button"
                    className="btn btn-success"
                    onClick={ () => this.updateProduct()}
                    >
                    Modifier  
                    </button>
                    <p>{this.state.message}</p>
                </div>
                ) : (
                <div>
                </div>
                )}
            </div>
        )
    }
}
export default ProductComponent