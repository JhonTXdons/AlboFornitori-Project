import React from 'react';

import { Row, Col } from 'react-flex-proto';
import { Page, Panel, Button, Breadcrumbs,Textarea, Input, Select, Switch, Table,Tabs, Tab, TableHead, TableBody, TableRow,EditableText } from 'react-blur-admin';
import { Link,browserHistory } from 'react-router';
import { Modal } from 'react-bootstrap';

import axios from 'axios';

//FilePond - -Caricamento Documenti
import { FilePond } from 'react-filepond';
import 'filepond/dist/filepond.min.css';


import _ from 'lodash';
import star from 'public/star.png';

export class FornitoreDettaglioBando extends React.Component {

  state = {
    successModal: false,
    warningModal: false,
    dangerModal: false,
    infoModal: false,
    primaryModal: false,
    show: false,
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

getRowValue(e){

}

//handle dell'eliminazione
deleteBando(bandi){
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



  onCloseModal(modalName) {
    this.setState({ [modalName]: false });
  }

  onRenderModal(modalName) {
    this.setState({ [modalName]: true });
  }

  renderBreadcrumbs() {
    return (
      <Breadcrumbs>
        <Link to='/welcome'>
          Bandi Disponibili
        </Link>
          Dettaglio della Gara
      </Breadcrumbs>
    );
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  updatePartecipazione(){

  }

  deletePartecipazione(){

  }

  insPartecipazione(){

  }

  getRowValue(bando){
    const bandoSaved = bando;

  }

  render() {
    return (
    //  {this.renderCustomizedModals()}
    <Page actionBar={this.renderBreadcrumbs()} title="Dettaglio Gara: titolo della gara  - Sviluppo">
      <Panel title="Informazioni Generali">

        <Modal
         show={this.state.dangerModal}
         onHide={() => this.onCloseModal('dangerModal')}
        >
          <Modal.Header closeButton className="modal-header bg-danger">
              <Modal.Title style={{color:'#ffffff'}}>Elimina la gara</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          Sei sicuro di voler eliminare in maniera definitiva la tua partecipazione alla Gara ?
          </Modal.Body>
          <Modal.Footer>
              <Button type='danger' onClick={this.submit} title='Elinima' onClick={() => this.deletePartecipazione()}/>
            </Modal.Footer>
        </Modal>
        <Modal
          show={this.state.warningModal}
          onHide={() => this.onCloseModal('warningModal')}
        >
        <Modal.Header closeButton className="modal-header bg-warning">
            <Modal.Title style={{color:'#ffffff'}}>Modifica della Gara</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {/* <Modal type='warning' title='Modifica della Gara' isOpen={this.state.warningModal} onClose={e => this.onCloseModal('warningModal')}> */}
        <form>
              <div className="RegPanel">
                <div>
                  <h5>Inserire Nome della Proposta</h5>
                    <Input
                      type='text'
                      placeholder=''
                      value={this.state.nomeProposta}
                      onChange={e => this.logChangeNome(e)}/>
                </div>
                <div>
                  <h5>Inserire valore dell'offerta</h5>
                    <Input
                      type='text'
                      placeholder=''
                      value={this.state.nomeProposta}
                      onChange={e => this.logChangeNome(e)}/>
                </div>
                <div>
                        <h5>Descrizione della Proposta - Max 2000 Caratteri</h5>
                        <Textarea
                          name='textarea'
                          placeholder='inserisci la descrizione...'
                          onChange={e => this.onTextChange('desc', e)}
                          value={this.state.desc} />
                      </div>
                      <div>
                        <h5>Selezionare la documentazione della Gara</h5>
                        <FilePond
                          allowMultiple={true}/>
                      </div>
              </div>
        </form>
        {/* </Modal> */}
        </Modal.Body>
        <Modal.Footer>
            <Button type='warning' onClick={this.submit} title='Salva' onClick={() => this.updatePartecipazione()}/>
          </Modal.Footer>
          </Modal>

          <Modal
            show={this.state.infoModal}
            onHide={() => this.onCloseModal('infoModal')}
          >
          <Modal.Header closeButton className="modal-header bg-info">
              <Modal.Title style={{color:'#ffffff'}}>Inserimento nuova Proposta</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          {/* <Modal type='warning' title='Modifica della Gara' isOpen={this.state.warningModal} onClose={e => this.onCloseModal('warningModal')}> */}
          <form>
                <div className="RegPanel">
                  <div>
                    <h5>Inserire Nome della Proposta</h5>
                      <Input
                        type='text'
                        placeholder=''
                        value={this.state.nomeProposta}
                        onChange={e => this.logChangeNome(e)}/>
                  </div>
                  <div>
                    <h5>Inserire valore dell'offerta</h5>
                      <Input
                        type='text'
                        placeholder=''
                        value={this.state.nomeProposta}
                        onChange={e => this.logChangeNome(e)}/>
                  </div>
                  <div>
                          <h5>Descrizione della Proposta - Max 2000 Caratteri</h5>
                          <Textarea
                            name='textarea'
                            placeholder='inserisci la descrizione...'
                            onChange={e => this.onTextChange('desc', e)}
                            value={this.state.desc} />
                        </div>
                        <div>
                          <h5>Selezionare la documentazione della Gara</h5>
                          <FilePond
                            allowMultiple={true}/>
                        </div>
                </div>
          </form>
          {/* </Modal> */}
          </Modal.Body>
          <Modal.Footer>
              <Button type='info' onClick={this.submit} title='Partecipa' onClick={() => this.insPartecipazione()}/>
            </Modal.Footer>
            </Modal>
  <Panel title="Informazioni Relative alla Gara">
    <div>
      <ul>
        <h5><li>Nome della Gara: </li></h5>
        <h5><li>Creato da:  ,il: </li></h5>
        <h5><li>Data di Apertura: </li></h5>
        <h5><li>Data di Chiusura: </li></h5>
        <h5><li>Stato della Gara: </li></h5>
        <h5><li>Descrizione:</li></h5>
        <h5>Qui va l adescr</h5>
        <h5><li>Documentazione allegata:</li></h5>
          <ul>
            <h5><li>Nome del file 1</li></h5>
            <h5><li>Nome del file 2</li></h5>
            <h5><li>Nome del file 3</li></h5>
          </ul>
      </ul>

    </div>
    <div style={{float:'right'}}>
      <Button type='warning' title="Modifica" onClick={e => this.onRenderModal('warningModal',true)} />
    </div>
    <div style={{float:'right'}}>
      <Button type='danger' title="Elimina" onClick={e => this.onRenderModal('dangerModal',true)} />
    </div>
  </Panel>
  <Panel title="La tua proposta">
    <div>
      <ul>
        <h5><li>Nome della Proposta: </li></h5>
        <h5><li>Creato da:  ,il: </li></h5>
        <h5><li>Data di Candidatura: </li></h5>
        <h5><li>Stato della Proposta: </li></h5>
        <h5><li>Descrizione:</li></h5>
        <h5>Qui va l adescr</h5>
        <h5><li>Documentazione allegata:</li></h5>
          <ul>
            <h5><li>Nome del file 1</li></h5>
            <h5><li>Nome del file 2</li></h5>
            <h5><li>Nome del file 3</li></h5>
          </ul>
      </ul>

    </div>
    <div style={{float:'right'}}>
      <Button type='info' title="Inserisci" onClick={e => this.onRenderModal('infoModal',true)} />
    </div>
  </Panel>
      </Panel>
    </Page>
    );
  }
}
