import React, { Component } from 'react';

import { Row, Col } from 'react-flex-proto';
import { Page, Panel, Button, Breadcrumbs, Input, Select, Switch, Table, Tabs, Tab, TableHead, TableBody, TableRow, EditableText } from 'react-blur-admin';
import { Link, browserHistory } from 'react-router';
import { Modal } from 'react-bootstrap';

import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

import 'node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';

import axios from 'axios';


import _ from 'lodash';
import star from 'public/star.png';

export class AdminPannel extends React.Component {
  constructor(props) {
          super(props)
          this.state = {
              banditori: [],
              categorie: [],
              primaryModal: false,
              warningModal: false, //associare la query di update
              dangerModal: false, //associare la query di delete

              primaryModal2: false,
              warningModal2: false, //associare la query di update
              dangerModal2: false, //associare la query di delete
          }

  }

        componentDidMount() {

              //prendo tutti i banditori
              let self = this;
              axios.get('/api/visBanditori')
              .then( (response) => {
                //const res = response.clone();
                if (response.status >= 400) {
                  throw new Error("Bad response from server");
                }
                return response;
              }).then(function (result){
                if (result.data.length != 0) {                                                 //diverso da null se ricevo una risposta altrimenti do un alert di reinserimento dati
                    //omettiamo il controllo del valore della variabile userToken andando a resettarla per assicurarci che sia il primo accesso
                    console.log('i dati letti sono: '+result.data);          //controllo che abbia settato il token
                    //inserisco i valori del fornitore in un array che utilizzero poi nei campi di visualizzazione del medesimo
                    self.setState({
                      banditori: result.data
                    });
                }else {
                  alert("Non ci sono informazioni relative a questo utente o ci sono errori del server");
                }
              }).catch(function (error) {
                console.log(error);
              });

              //prendo tutte le categorie
              axios.get('/api/visCategorie')
              .then( (response) => {
                //const res = response.clone();
                if (response.status >= 400) {
                  throw new Error("Bad response from server");
                }
                return response;
              }).then(function (result){
                if (result.data.length != 0) {                                                 //diverso da null se ricevo una risposta altrimenti do un alert di reinserimento dati
                    //omettiamo il controllo del valore della variabile userToken andando a resettarla per assicurarci che sia il primo accesso
                    console.log('i dati letti sono: '+result.data);          //controllo che abbia settato il token
                    //inserisco i valori del fornitore in un array che utilizzero poi nei campi di visualizzazione del medesimo
                    self.setState({
                      categorie: result.data
                    });
                }else {
                  alert("Non ci sono informazioni relative a questo utente o ci sono errori del server");
                }
              }).catch(function (error) {
                console.log(error);
              });
          }

      //handle della Modifica
      handleEdit(event) {
        //Edit functionality
      /*  event.preventDefault()
        var data = {
            name: this.state.name,
            email: this.state.email,
            id: this.state.id
        }
        fetch("/users/edit", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(function(response) {
            if (response.status >= 400) {
                throw new Error("Bad response from server");
            }
            return response.json();
        }).then(function(data) {
            console.log(data)
            if (data === "success") {
                this.setState({
                    msg: "User has been edited."
                });
            }
        }).catch(function(err) {
            console.log(err)
        }); */
    }

    //handle dell'eliminazione
    insertBanditore(){
    /*var data = {
        id: bandi.ID
    }
    fetch("/users/delete", {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    }).then(function(response) {
        if (response.status >= 400) {
          throw new Error("Bad response from server");
        }
        return response.json();
    }).then(function(data) {
        if(data === "success"){
           this.setState({msg: "User has been deleted."});
        }
    }).catch(function(err) {
        console.log(err)
    });*/
}

deleteBanditore(){

}

updateBanditore(){

}

//Handle role Banditore
logChangeRole(e){
    this.setState({ Ruolo: 'Banditore'});

}

onCloseModal(modalName) {
  this.setState({ [modalName]: false });
}

//handle per gestire la apertura e la chiusura del modal
onRenderModal(modalName, value) {
  this.setState({ [modalName]: value });
}
  render() {
    let banditori = [];
    let categorie = [];

    if(this.state.banditori.length != 0){
      banditori = this.state.banditori; //provvedo ad evitare che la pagina vada in errore perche' al primo render lo state non e' settato
    }
    if(this.state.categorie.length != 0){
      categorie = this.state.categorie; //provvedo ad evitare che la pagina vada in errore perche' al primo render lo state non e' settato
    }
    return (
      <Page title="Admin Pannel Svicom Albo Fornitori - Sviluppo">
        <Modal
         show={this.state.dangerModal}
         onHide={() => this.onCloseModal('dangerModal')}
        >
          <Modal.Header closeButton className="modal-header bg-danger">
              <Modal.Title style={{color:'#ffffff'}}>Elimina il Banditore</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <h5>Inserire ID da modificare</h5>
                <Input
                  type='text'
                  placeholder=''
                  value={this.state.ID}
                  onChange={e => this.logChangeNome(e)}/>
            </div>
          Sei sicuro di voler eliminare in maniera definitiva il Banditore ?
          </Modal.Body>
          <Modal.Footer>
              <Button type='danger' onClick={this.submit} title='Elinima' onClick={() => this.deleteBando()}/>
            </Modal.Footer>
        </Modal>
        <Modal
          show={this.state.primaryModal}
          onHide={() => this.onCloseModal('primaryModal')}
        >
        <Modal.Header closeButton className="modal-header bg-primary">
            <Modal.Title style={{color:'#ffffff'}}>Inserimento nuovo Banditore</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {/* <Modal type='warning' title='Modifica della Gara' isOpen={this.state.warningModal} onClose={e => this.onCloseModal('warningModal')}> */}
          <form>
                <div className="RegPanel">
                  <div>
                    <h5>Inserire nome del banditore</h5>
                      <Input
                        type='text'
                        placeholder=''
                        value={this.state.nome}
                        onChange={e => this.logChangeNome(e)}/>
                  </div>
                  <div>
                   <h5>Inserire l'email</h5>
                    <Input
                      type='text'
                      placeholder=''
                      value={this.state.email}
                      onChange={e => this.logChangeNome(e)}/>
                  </div>
                </div>
          </form>
        {/* </Modal> */}
        </Modal.Body>
        <Modal.Footer>
            <Button type='primary' title='Salva Ruolo' onClick={e => {this.insertBanditore(e)}}/>
          </Modal.Footer>
          </Modal>
          <Modal
            show={this.state.warningModal}
            onHide={() => this.onCloseModal('warningModal')}
          >
          <Modal.Header closeButton className="modal-header bg-warning">
              <Modal.Title style={{color:'#ffffff'}}>Inserimento nuovo Banditore</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          {/* <Modal type='warning' title='Modifica della Gara' isOpen={this.state.warningModal} onClose={e => this.onCloseModal('warningModal')}> */}
            <form>
                  <div className="RegPanel">
                    <div>
                      <h5>Inserire ID da modificare</h5>
                        <Input
                          type='text'
                          placeholder=''
                          value={this.state.ID}
                          onChange={e => this.logChangeNome(e)}/>
                    </div>
                    <div>
                      <h5>Inserire nome del banditore</h5>
                        <Input
                          type='text'
                          placeholder=''
                          value={this.state.nome}
                          onChange={e => this.logChangeNome(e)}/>
                    </div>
                    <div>
                     <h5>Inserire l'email</h5>
                      <Input
                        type='text'
                        placeholder=''
                        value={this.state.email}
                        onChange={e => this.logChangeNome(e)}/>
                    </div>
                  </div>
            </form>
          {/* </Modal> */}
          </Modal.Body>
          <Modal.Footer>
              <Button type='warning' title='Modifica' onClick={e => {this.updateBanditore(e)}}/>
            </Modal.Footer>
            </Modal>

            <Modal
             show={this.state.dangerModal2}
             onHide={() => this.onCloseModal('dangerModal2')}
            >
              <Modal.Header closeButton className="modal-header bg-danger">
                  <Modal.Title style={{color:'#ffffff'}}>Elimina il Banditore</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div>
                  <h5>Inserire ID da modificare</h5>
                    <Input
                      type='text'
                      placeholder=''
                      value={this.state.ID}
                      onChange={e => this.logChangeNome(e)}/>
                </div>
              Sei sicuro di voler eliminare in maniera definitiva il Banditore ?
              </Modal.Body>
              <Modal.Footer>
                  <Button type='danger' onClick={this.submit} title='Elinima' onClick={() => this.deleteCategoria()}/>
                </Modal.Footer>
            </Modal>
            <Modal
              show={this.state.primaryModal2}
              onHide={() => this.onCloseModal('primaryModal2')}
            >
            <Modal.Header closeButton className="modal-header bg-primary">
                <Modal.Title style={{color:'#ffffff'}}>Inserimento nuovo Categoria</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            {/* <Modal type='warning' title='Modifica della Gara' isOpen={this.state.warningModal} onClose={e => this.onCloseModal('warningModal')}> */}
              <form>
                    <div className="RegPanel">
                      <div>
                        <h5>Inserire nome della Categoria</h5>
                          <Input
                            type='text'
                            placeholder=''
                            value={this.state.nome}
                            onChange={e => this.logChangeNome(e)}/>
                      </div>
                    </div>
              </form>
            {/* </Modal> */}
            </Modal.Body>
            <Modal.Footer>
                <Button type='info' title='Salva Categoria' onClick={e => {this.insertCategoria(e)}}/>
              </Modal.Footer>
              </Modal>
              <Modal
                show={this.state.warningModal2}
                onHide={() => this.onCloseModal('warningModal2')}
              >
              <Modal.Header closeButton className="modal-header bg-warning">
                  <Modal.Title style={{color:'#ffffff'}}>Modifica Categoria</Modal.Title>
              </Modal.Header>
              <Modal.Body>
              {/* <Modal type='warning' title='Modifica della Gara' isOpen={this.state.warningModal} onClose={e => this.onCloseModal('warningModal')}> */}
                <form>
                      <div className="RegPanel">
                        <div>
                          <h5>Inserire ID da modificare</h5>
                            <Input
                              type='text'
                              placeholder=''
                              value={this.state.ID}
                              onChange={e => this.logChangeNome(e)}/>
                        </div>
                        <div>
                          <h5>Inserire nome della Categoria</h5>
                            <Input
                              type='text'
                              placeholder=''
                              value={this.state.nome}
                              onChange={e => this.logChangeNome(e)}/>
                        </div>
                      </div>
                </form>
              {/* </Modal> */}
              </Modal.Body>
              <Modal.Footer>
                  <Button type='warning' title='Modifica' onClick={e => {this.updateCategoria(e)}}/>
                </Modal.Footer>
                </Modal>
        <Row>
          <Tabs align='top'
          startTab={1}>
          <Tab title="INSERIMENTO BANDITORI">
            <Panel title="Pagina dove vengono visualizzate tutte le funzioni relative all'admin">
              <div className ="Titolo del bando">
                <Panel title="Lista Banditori">
                  <div style={{float:'right'}}>
                        <Button type='danger' title="Elimina" onClick={e => this.onRenderModal('dangerModal', true)} />
                  </div>
                  <div style={{float:'right'}}>
                        <Button type='warning' title="Modifica" onClick={e => this.onRenderModal('warningModal', true)} />
                  </div><div style={{float:'left'}}>
                        <Button type='info' title="Inserisci" onClick={e => this.onRenderModal('primaryModal',true)} />
                  </div>
                  <BootstrapTable className="bordered"  data={ banditori }>
                    <TableHeaderColumn className="black-muted-bg" dataField='ID' editable={false} width='90' isKey={true} dataSort={ true } dataAlign='center'>ID</TableHeaderColumn>
                    <TableHeaderColumn className="black-muted-bg" dataField='Nome' filter={ { type: 'TextFilter', delay: 1000 }} dataAlign='center' dataSort={ true }>NOME</TableHeaderColumn>
                    <TableHeaderColumn className="black-muted-bg" dataField='email' filter={ { type: 'TextFilter', delay: 1000 }} dataAlign='center' dataSort={ true }>E-MAIL</TableHeaderColumn>
                    <TableHeaderColumn className="black-muted-bg" dataField='Ruolo' filter={ { type: 'TextFilter', delay: 1000 }} dataAlign='center' dataSort={ true }>RUOLO</TableHeaderColumn>
                  </BootstrapTable>
                </Panel>
              </div>
        </Panel>
          </Tab>
          <Tab title = "INSERIMENTO CATEGORIE">
            <Panel title="Lista Categorie">
            <div style={{float:'left'}}>
                  <Button type='info' title="Inserisci" onClick={e => this.onRenderModal('primaryModal2',true)} />
            </div>
              <div style={{float:'right'}}>
                    <Button type='warning' title="Modifica" onClick={e => this.onRenderModal('warningModal2',true)} />
              </div>
              <div style={{float:'right'}}>
                    <Button type='danger' title="Elimina" onClick={e => this.onRenderModal('dangerModal2',true)} />
              </div>
              <BootstrapTable className="bordered" data={ categorie }>
                <TableHeaderColumn className="black-muted-bg" dataField='ID' width='90' isKey={true} dataSort={ true } dataAlign='center'>ID</TableHeaderColumn>
                <TableHeaderColumn className="black-muted-bg" dataField='Nome' filter={ { type: 'TextFilter', delay: 1000 }} dataAlign='center' dataSort={ true }>NOME DELLA CATEGORIA</TableHeaderColumn>
              </BootstrapTable>
            </Panel>
          </Tab>
        </Tabs>
        </Row>
      </Page>
    );
  }
}
