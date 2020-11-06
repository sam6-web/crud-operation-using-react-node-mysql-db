import React, { Component } from 'react'
import ProductDataService from '../services/product.service'
import {    Button,
            Modal,
            ModalHeader,
            ModalBody,
            ModalFooter,
            Form,
            FormGroup,
            Label,
            Input
        } from 'reactstrap';
class AddProductComponent extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            modal : false,
            id: null,
            nom: "",
            prix_unitaire: "",
            quantité :"",

        }
    }
    toggle = () => {
        this.setState({
            modal: !this.state.modal
        })
    }
    onChangeNom = (e) =>{
        this.setState({
            nom : e.target.value
        })
        console.log("nom",this.state.nom)
    }
    onChangePrix_unitaire = (e) =>{
        this.setState({
            prix_unitaire : e.target.value
        })
        console.log("prix_unitaire",this.state.prix_unitaire)

    }
    onChangeQuantité = (e) =>{
        this.setState({
            quantité : e.target.value
        })
        console.log("quantité",this.state.quantité)

    }
    saveProduct=()=> {
        var data = {
          nom: this.state.nom,
          prix_unitaire: this.state.prix_unitaire,
          quantité: this.state.quantité
        };
    ProductDataService.create(data)
    .then(response => {
      this.setState({
        id: response.data.id,
        nom: response.data.nom,
        prix_unitaire: response.data.prix_unitaire,
        quantité: response.data.quantité
      });
      console.log(response.data);
      this.props.refreshList()
    })
    .catch(e => {
      console.log(e);
    });
}
newProduct = () => {
    this.setState({
      id: null,
      nom: "",
      prix_unitaire: "",
      quantité:"",
    });
  }


    render() {
        return (
            <div className="submit-form">
                <div>
                    <Button color="danger" onClick={this.toggle}>Ajouter</Button>
                    <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
                    <ModalBody>
                        <Form>
                        <FormGroup>
                            <Label>Nom du produit</Label>
                            <Input 
                            type="text"
                            className="form-control"
                            id="nom"
                            required
                            value={this.state.nom}
                            onChange={this.onChangeNom}
                            name="nom"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label>Prix</Label>
                            <Input 
                            type="text"
                            className="form-control"
                            id="prix_unitaire"
                            required
                            value={this.state.prix_unitaire}
                            onChange={this.onChangePrix_unitaire}
                            name="prix_unitaire"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label>Quantité</Label>
                            <Input 
                            type="text"
                            className="form-control"
                            id="quantité"
                            required
                            value={this.state.quantité}
                            onChange={this.onChangeQuantité}
                            name="quantité"
                            />
                        </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.saveProduct}>Enregistrer</Button>{' '}
                        <Button color="secondary" onClick={this.toggle}>Annuler</Button>
                    </ModalFooter>
                    </Modal>
                </div>
            </div>
        )
    }
}
export default AddProductComponent

