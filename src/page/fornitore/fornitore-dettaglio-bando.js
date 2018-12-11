import React from 'react';

import { Row, Col } from 'react-flex-proto';
import { Page, Panel, Button, Breadcrumbs,Textarea, Input, Select, Switch, Table,Tabs, Tab, TableHead, TableBody, TableRow,EditableText,eventBus } from 'react-blur-admin';
import { Link,browserHistory } from 'react-router';
import { Modal } from 'react-bootstrap';

import axios from 'axios';

//FilePond - -Caricamento Documenti
import { FilePond } from 'react-filepond';
import 'filepond/dist/filepond.min.css';


import _ from 'lodash';
import star from 'public/star.png';

export class FornitoreDettaglioBando extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      successModal: false,
      warningModal: false,
      dangerModal: false,
      infoModal: false,
      primaryModal: false,
      show: false,
      IdBando: this.props.location.state.rowBandoSel.IdBando,
      NomeBando: this.props.location.state.rowBandoSel.NomeBando,
      Categoria: this.props.location.state.rowBandoSel.NomeCat,
      DataCreazione: this.props.location.state.rowBandoSel.DataCreazione.substring(0, this.props.location.state.rowBandoSel.DataCreazione.indexOf('T')),
      DataApertura: this.props.location.state.rowBandoSel.DataApertura.substring(0, this.props.location.state.rowBandoSel.DataApertura.indexOf('T')),
      DataChiusura: this.props.location.state.rowBandoSel.DataChiusura.substring(0, this.props.location.state.rowBandoSel.DataChiusura.indexOf('T')),
      SogliaMax: this.props.location.state.rowBandoSel.SogliaMax,
      DescrizioneBando: this.props.location.state.rowBandoSel.Descr,
      Titolo: '',
      Descrizione: '',    //descrizione offerta
      Offerta: '',
      MailUser: '',
      ActionsPartecipa: true,
      ActionsPartecipazione: true,
      ActionsInserimento: false,
      PartecipCorr: [],
      PartecipCorrUpdate: [],
    }
  }

  componentWillMount(){

    const MailUser = localStorage.getItem('userMail');
    this.setState({MailUser:MailUser,
                  PartecipCorrUpdate: this.state.PartecipCorr});
    this.getPartecipazione();
    //qui controllo se c'è una partecipazione esistente se si blocco il pulsante di inserimento
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

  onTextChange(e){
    if(e.currentTarget.id == 'ModificaDescrizione'){
      this.setState( PartecipCorrUpdate =>
        { Descrizione : e.currentTarget.value });
    }else{
      this.setState({ Descrizione : e.currentTarget.value });
    }
  }

  logChangeOfferta(e){
    if(e.currentTarget.id == 'ModificaOfferta'){
      this.setState( PartecipCorrUpdate =>
        { Offerta : e.currentTarget.value });
    }else{
      this.setState({ Offerta : e.currentTarget.value });
    }

  }

  logChangeTitolo(e){
    if(e.currentTarget.id == 'ModificaTitolo'){
      this.setState( PartecipCorrUpdate =>
        { Titolo : e.currentTarget.value });
    }else{
      this.setState({ Titolo : e.currentTarget.value });
    }
  }

  handleShow() {
    this.setState({ show: true });
  }

  updatePartecipazione(){
    let self = this;
    const MailUser =  localStorage.getItem('userMail');
    event.preventDefault(); //non ricarico la pagina una volta fatto il submit
    var data = {
      IdBando: this.state.IdBando,
      Titolo: this.state.Titolo,
      Descrizione: this.state.Descrizione,    //descrizione offerta
      Offerta: this.state.Offerta,
      MailBand: MailUser,
    }
    console.log(data)
    fetch("/api/updatePartecip", {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    }).then(function(response) {
        if (response.status >= 400) {
          throw new Error("Bad response from server");
          //alert("c'è stato un errore nel salvataggio del bando");
        }
        return response.json();
    }).then(function(data) {
        console.log(data)
        if(data.affectedRows == 1){                               //controllo che la registrazione del bando sia avvenuta con successo se si
           eventBus.addNotification('success', 'Proposta modificata Correttamente')
           self.getPartecipazione();
           self.onRenderModal('warningModal',false);              //tolgo il modal una volta che ho aggiornato la lista dei banditori
        }else{
           eventBus.addNotification('error','Abbiamo riscontrato problemi nella registrazione del bando, riprovare!');
        }
    }).catch(function(err) {
        console.log(err)
    });
  }

  deletePartecipazione(){
    let self = this;
    const MailUser = localStorage.getItem('userMail');
    event.preventDefault(); //non ricarico la pagina una volta fatto il submit
    var data = {
      IdBando: this.state.IdBando,
      MailBand: MailUser,
    }
    console.log(data)
    fetch("/api/deletePartecip", {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    }).then(function(response) {
        if (response.status >= 400) {
          throw new Error("Bad response from server");
          //alert("c'è stato un errore nel salvataggio del bando");
        }
        return response.json();
    }).then(function(data) {
        console.log(data)
        if(data.affectedRows == 1){                               //controllo che la registrazione del bando sia avvenuta con successo se si
           eventBus.addNotification('success', 'Bando eliminato Correttamente')
           self.allBandiBanditore(MailUser);
           self.onRenderModal('dangerModal',false);              //tolgo il modal una volta che ho aggiornato la lista dei banditori
        }else{
           eventBus.addNotification('error','Abbiamo riscontrato problemi nella registrazione del bando, riprovare!');
        }
    }).catch(function(err) {
        console.log(err)
    });
  }

  insPartecipazione(){
    let self = this;
    const MailUser = localStorage.getItem('userMail');
    event.preventDefault(); //non ricarico la pagina una volta fatto il submit
    var data = {
      NomeBando: this.state.NomeBando,
      Categoria: this.state.Categoria,
      DataCreazione: this.state.DataCreazione,//.substring(0, this.state.DataCreazione.indexOf('T')),
      DataApertura: this.state.DataApertura,//substring(0, this.state.DataApertura.indexOf('T')),
      DataChiusura: this.state.DataChiusura,//substring(0, this.state.DataChiusura.indexOf('T')),
      SogliaMax: this.state.SogliaMax,
      Titolo: this.state.Titolo,
      Descrizione: this.state.Descrizione,    //descrizione offerta
      Offerta: this.state.Offerta,
      MailBand: MailUser,
    }
    console.log(data)
    fetch("/api/insPartecip", {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    }).then(function(response) {
        if (response.status >= 400) {
          throw new Error("Bad response from server");
          //alert("c'è stato un errore nel salvataggio del bando");
        }
        return response.json();
    }).then(function(data) {
        console.log(data)
        if(data.affectedRows == 1){                               //controllo che la registrazione del bando sia avvenuta con successo se si
           eventBus.addNotification('success', 'Bando Inserito Correttamente')
           self.allBandiBanditore(MailUser);
           self.onCloseModal('infoModal');              //tolgo il modal una volta che ho aggiornato la lista dei banditori
           self.setState({ActionsPartecipazione: false,
                          ActionsInserimento: true})         //abilito i bottoni per la modifica
           this.getPartecipazione();
        }else{
           eventBus.addNotification('error','Abbiamo riscontrato problemi nella registrazione del bando, riprovare!');
        }
    }).catch(function(err) {
        console.log(err)
    });
  }

  getPartecipazione(){
    let self = this;
    const MailUser = localStorage.getItem('userMail');
    var data = {
      IdBando: this.state.IdBando,
      MailForn: MailUser,
    }
    console.log(data)
    fetch("/api/getProposta", {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    }).then(function(response) {
        if (response.status >= 400) {
          throw new Error("Bad response from server");
          //alert("c'è stato un errore nel salvataggio del bando");
        }
        return response.json();
    }).then(function(data) {
        console.log(data)
        if(data.length != 0){                               //controllo che la registrazione del bando sia avvenuta con successo se si
           //tolgo il modal una volta che ho aggiornato la lista dei banditori
           data[0].DataIscr = data[0].DataIscr.substring(0, data[0].DataIscr.indexOf('T'));
           self.setState({PartecipCorr: data[0],
                          ActionsInserimento: true,     //abilito i bottoni per la modifica
                          ActionsPartecipa: false,      //abilito i bottoni per la modifica
                          ActionsPartecipazione: false, //abilito i bottoni per la modifica
                          PartecipCorrUpdate: data[0]}) //aggiorno i valori dei campi del modal update        
            //modifico l'aspetto dei bottoni nella pagina se trovo la proposta
           self.setState({ActionsInserimento: true,     
                            ActionsPartecipa: false,
                            ActionsPartecipazione: false,
                          PartecipCorrUpdate: data[0]})
        }else{
           eventBus.addNotification('error','Abbiamo riscontrato problemi nella registrazione del bando, riprovare!');
        }
    }).catch(function(err) {
        console.log(err)
    });
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
                      id='ModificaTitolo'
                      type='text'
                      placeholder=''
                      value={this.state.PartecipCorrUpdate.Titolo}
                      onChange={e => this.logChangeTitolo(e)}/>
                </div>
                <div>
                  <h5>Inserire valore dell'offerta</h5>
                    <Input
                      id='ModificaOfferta'
                      type='text'
                      placeholder=''
                      value={this.state.PartecipCorrUpdate.Offerta}
                      onChange={e => this.logChangeOfferta(e)}/>
                </div>
                <div>
                        <h5>Descrizione della Proposta - Max 2000 Caratteri</h5>
                        <Textarea
                          id='ModificaDescrizione'
                          name='textarea'
                          placeholder='inserisci la descrizione...'
                          onChange={e => this.onTextChange(e)}
                          value={this.state.PartecipCorrUpdate.Descr} />
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
                        value={this.state.Titolo}
                        onChange={e => this.logChangeTitolo(e)}/>
                  </div>
                  <div>
                    <h5>Inserire valore dell'offerta</h5>
                      <Input
                        type='text'
                        placeholder=''
                        value={this.state.Offerta}
                        onChange={e => this.logChangeOfferta(e)}/>
                  </div>
                  <div>
                          <h5>Descrizione della Proposta - Max 2000 Caratteri</h5>
                          <Textarea
                            name='textarea'
                            placeholder='inserisci la descrizione...'
                            onChange={e => this.onTextChange(e)}
                            value={this.state.Descrizione} />
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
        <h5><li>Nome della Gara: {this.state.NomeBando}</li></h5>
        <h5><li>Data di Creazione: {this.state.DataCreazione} </li></h5>
        <h5><li>Data di Apertura: {this.state.DataApertura} </li></h5>
        <h5><li>Data di Chiusura: {this.state.DataChiusura}</li></h5>
        <h5><li>Categoria della Gara: {this.state.Categoria}</li></h5>
        <h5><li>Soglia della Gara: {this.state.SogliaMax}</li></h5>

        <h5><li>Descrizione: </li></h5>
        <h5> </h5>
        <h5><li>Documentazione allegata:</li></h5>
          <ul>
            <h5><li>Nome del file 1</li></h5>
            <h5><li>Nome del file 2</li></h5>
            <h5><li>Nome del file 3</li></h5>
          </ul>
      </ul>

    </div>
    <div style={{float:'right'}}>
      <Button type='warning' title="Modifica" disabled={this.state.ActionsPartecipazione} onClick={e => this.onRenderModal('warningModal',true)} />
    </div>
    <div style={{float:'right'}}>
      <Button type='danger' title="Elimina" disabled={this.state.ActionsPartecipazione} onClick={e => this.onRenderModal('dangerModal',true)} />
    </div>
  </Panel>
  <Panel title="La tua proposta">
    <div>
      <ul>
        <h5><li>Nome della Proposta: {this.state.PartecipCorr.Titolo} </li></h5>
        <h5><li>Creato il: {this.state.PartecipCorr.DataIscr}</li></h5>
        <h5><li>Offerta proposta: {this.state.PartecipCorr.Offerta}</li></h5>
        <h5><li>Descrizione:  </li></h5>
        <h5>{this.state.PartecipCorr.Descrizione}</h5>
        <h5><li>Documentazione allegata:</li></h5>
          <ul>
            <h5><li>Nome del file 1</li></h5>
            <h5><li>Nome del file 2</li></h5>
            <h5><li>Nome del file 3</li></h5>
          </ul>
      </ul>

    </div>
    <div style={{float:'right'}}>
      <Button type='info' title="Inserisci" disabled={this.state.ActionsInserimento} onClick={e => this.onRenderModal('infoModal',true)} />
    </div>
  </Panel>
      </Panel>
    </Page>
    );
  }
}
