import React from 'react';

import { Row, Col } from 'react-flex-proto';
import { Page, Panel, Button, Breadcrumbs,Textarea, Input, Select, Switch, Table,Tabs, Tab, TableHead, TableBody, TableRow,EditableText,eventBus } from 'react-blur-admin';
import { Link,browserHistory } from 'react-router';
import { Modal } from 'react-bootstrap';

import axios from 'axios';

//DatePicker
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import HelpBlock from 'react-bootstrap/lib/HelpBlock';

import DatePicker from 'react-bootstrap-date-picker';

const spanishDayLabels = [ 'Lun', 'Mar', 'Mer', 'Gio', 'Ved', 'Sab','Dom'];
const spanishMonthLabels = ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', 'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'];

//FilePond - -Caricamento Documenti
import { FilePond } from 'react-filepond';
import 'filepond/dist/filepond.min.css';

import _ from 'lodash';
import star from 'public/star.png';

const options = {
  onRowClick: function(row) {
    alert(`You click row id: ${row.ID}`);
    browserHistory.push('/banditore-istruttoria');
  },
  onRowDoubleClick: function(row) {
    alert(`You double click row id: ${row.ID}`);
  }
};

export class BanditoreDettaglioBando extends React.Component {
  constructor(props) {
          super(props)
          this.state = {
              warningModal: false,
              dangerModal: false,
              data: [{
                ID: 1,
                Nome: 'Elemento di Test',
                IVAForn: '0000',
                Candidatura: 'in attesa',
              }],

              //modal
              ID: this.props.location.state.rowSel.ID,
              nomeBando: this.props.location.state.rowSel.Nome,
              categoria: this.props.location.state.rowSel.Categoria,
              dataCreazione: this.props.location.state.rowSel.DataCreazione,
              dataApertura: this.props.location.state.rowSel.Apertura,
              dataChiusura: this.props.location.state.rowSel.Chiusura,
              descr: this.props.location.state.rowSel.Descr,
              sogliaMax: this.props.location.state.rowSel.OffertaMassima,
              minRating: this.props.location.state.rowSel.MinRating,
              stato: this.props.location.state.rowSel.Stato,
              Raperto: false,
              Rchiuso: false,
              EsclGara: false,
              GarInvit: false,
              partecipForn: [],
          }
          this.handleChangeApertura = this.handleChangeApertura.bind(this);
          this.handleChangeChiusura = this.handleChangeChiusura.bind(this);
  }

  handleChangeApertura(date) {
    this.setState({
    dataApertura: date
    });
  }
  handleChangeChiusura(date) {
    this.setState({
    dataChiusura: date
    });
  }

  handleChangeSelect(e){
    let value = e;
    this.setState({
      categoria: value,
    });
  }


  onCloseModal(modalName) {
    this.setState({ [modalName]: false });
  }

  onRenderModal(modalName) {
    this.setState({ [modalName]: true });
  }

  onCloseModal(modalName) {
    this.setState({ [modalName]: false });
  }

  //handle per gestire la apertura e la chiusura del modal
  onRenderModal(modalName, value) {
    this.setState({ [modalName]: value });
  }

  //handle select categoria
  handleChangeSelect(e){
    let value = e;
    this.setState({
      categoria: value,
    });
  }



  //prendo il manage del campo ChangeNome
  logChangeNome(e) {
      this.setState({ nomeBando: e.target.value });
  }
  logTextChange(e){
    this.setState({ descr: e.target.value});
  }

  handleStateNascosto(e){
    this.setState({ stato: 'Nascosto'});
  }
  handleStateAperto(e){
    this.setState({ stato: 'Aperto'});
  }

  handleIsItChecked1(e){
    this.setState({condition1: e});
  }

  handleIsItChecked2(e){
    this.setState({condition2: e});
  }

  handleStateSogliaMax(e){
    this.setState({ sogliaMax: e.target.value});
  }

  logChangeDataMinRating(e) {
      this.setState({ minRating: e.target.value });
  }

  componentWillMount(){
    const MailUser = localStorage.getItem('userMail');
    this.getPartecip(MailUser);
    if(this.state.stato == 'Nascosto'){
      this.setState({
        Rchiuso : true,
      })
    }else{
      this.setState({
        Raperto : true,
      })
    }
  }

  //------- FUNZIONI ------------------------------------------------
  //funzione per prendere i dettagli del bando e metterlo nella lista sopra ai bottoni modifica e elimina
  getPartecip(MailUser){
    let self = this;
    axios.post('/api/allFornOfBand', {
      Mail: MailUser,
    })
    .then( (response) => {
      //const res = response.clone();
      if (response.status >= 400) {
        throw new Error("Bad response from server");
      }
      return response;
    }).then(function (result){
      //console.log("risultato" + result);
      if (result.data.length != 0) {                                                 //diverso da null se ricevo una risposta altrimenti do un alert di reinserimento dati
         //omettiamo il controllo del valore della variabile userToken andando a resettarla per assicurarci che sia il primo accesso
          console.log('i dati letti sono: '+result.data);          //controllo che abbia settato il token
          //inserisco i valori del fornitore in un array che utilizzero poi nei campi di visualizzazione del medesimo
          self.setState({
            partecipForn: result.data
          });
      }else {
        alert("Non ci sono bandi attivi al momento! Verrai notificato in caso di nuovi bandi in arrivo");
      }
    }).catch(function (error) {
      console.log(error);
    });
  }

  //funzione per prendere i dettagli del bando e metterlo nella lista sopra ai bottoni modifica e elimina
  getBandoInfo(){
    let self = this;
    event.preventDefault(); //non ricarico la pagina una volta fatto il submit
    fetch("/api/updateBando", {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(this.state.ID)
    }).then(function(response) {
        if (response.status >= 400) {
          throw new Error("Bad response from server");
          //alert("c'è stato un errore nel salvataggio del bando");
        }
        return response.json();
    }).then(function(data) {
        console.log(data)
        if(data.affectedRows == 1){                               //controllo che la query del bando sia avvenuta con successo
            //inserisco i campi inseriti da andrea per il display del bando
        }else{
           eventBus.addNotification('error','Abbiamo riscontrato problemi nella modifica del bando, riprovare!');
        }
    }).catch(function(err) {
        console.log(err)
    });
  }

  //aggiorno il bando dopo aver dato conferma nel modal
updateBando(){
  let self = this;
    const MailUser = self.state.MailUser;
    event.preventDefault(); //non ricarico la pagina una volta fatto il submit
    var data = {
      ID: self.props.location.state.rowSel.ID,
      nome: this.state.nomeBando,
      categoria: this.state.categoria,
      descr: this.state.descr,
      dataApertura: this.state.dataApertura.substring(0, this.state.dataApertura.indexOf('T')),
      dataChiusura: this.state.dataChiusura.substring(0, this.state.dataChiusura.indexOf('T')),
      sogliaMax: this.state.sogliaMax,
      minRating: this.state.minRating,
      stato: this.state.stato,
      mailBand: MailUser,
    }
    console.log(data)
    fetch("/api/updateBando", {
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
           eventBus.addNotification('success', 'Bando modificato Correttamente')
           //self.allBandiBanditore(MailUser);
           self.onRenderModal('warningModal',false);              //tolgo il modal una volta che ho aggiornato la lista dei banditori
        }else{
           eventBus.addNotification('error','Abbiamo riscontrato problemi nella modifica del bando, riprovare!');
        }
    }).catch(function(err) {
        console.log(err)
    });
}

//cancellazione del bando
deleteBando(){
  let self = this;
    axios.post('/api/deleteBando', {
      BandSel: self.props.location.state.rowSel,
    })
    .then( (response) => {
      //const res = response.clone();
      if (response.status >= 400) {
        throw new Error("Bad response from server");
      }
      return response;
    }).then(function (result){
      //elimino il bando e torno indietro di una pagina
      //console.log("risultato" + result);
      if (result.data.length != 0) {                                                 
        eventBus.addNotification('success','Non sono riuscito ad eliminare il bando!'); 
        browserHistory.push('/banditore-pannel');
      }else {
        eventBus.addNotification('error','Non sono riuscito ad eliminare il bando!');
      }
      //torno indietro di una pagina
    }).catch(function (error) {
      console.log(error);
    });
}

  renderBreadcrumbs() {
    return (
      <Breadcrumbs>
        <Link to='/banditore-pannel'>
          Pannello Banditore
        </Link>
          Dettaglio del Bando
      </Breadcrumbs>
    );
  }

  //-----------------------------------CORPO DELLA PAGINA ( FRONT-END )-----------------------

  render() {

    const LabelISOString = new Date().toISOString();

    let dataB = [];
    if(this.state.data.length != 0){
       dataB = this.state.partecipForn; //provvedo ad evitare che la pagina vada in errore perche' al primo render lo state non e' settato
    }

    return (
    //  {this.renderCustomizedModals()}
    <Page actionBar={this.renderBreadcrumbs()} title="Dettaglio Offerta: Titolo della Gara  - Sviluppo">
          <Panel>

            <Modal
             show={this.state.dangerModal}
             onHide={() => this.onCloseModal('dangerModal')}
            >
              <Modal.Header closeButton className="modal-header bg-danger">
                  <Modal.Title style={{color:'#ffffff'}}>Elimina la gara</Modal.Title>
              </Modal.Header>
              <Modal.Body>
              Sei sicuro di voler eliminare in maniera definitiva il bando: "id bando" ?
              </Modal.Body>
              <Modal.Footer>
                  <Button type='danger' onClick={this.submit} title='Elinima' onClick={() => this.deleteBando()}/>
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
                      <h5>Inserire della Gara</h5>
                        <Input
                          type='text'
                          placeholder=''
                          value={this.state.nomeBando}
                          onChange={e => this.logChangeNome(e)}/>
                    </div>
                    {/*<div>
                      <h5>Selezionare la Categoria della Gara</h5>
                        <Select
                          label="Categoria"
                          placeholder='Categoria della Gara'
                          isSearchable={true}
                          options={[
                              { value: 1, label: 'Canone di noleggio apparecchi bagni' },
                              { value: 2, label: 'Disinfestazione e derattizzazione' },
                              { value: 3, label: 'Fornitura di Beni' },
                              { value: 4, label: 'Impianti Antincendio' },
                              { value: 5, label: 'Impianti Elettrici e Speciali' },
                              { value: 6, label: 'Impianti Idrici e Fognari' },
                              { value: 7, label: 'Impianti Meccanici' },
                              { value: 8, label: 'Impianti di Sicurezza' },
                              { value: 9, label: 'Insegne' },
                              { value: 10, label: 'Lavori Edili' },
                              { value: 11, label: 'Manutenzione verde' },
                              { value: 12, label: 'Marketing' },
                              { value: 13, label: 'Materiale di consumo bagni' },
                              { value: 14, label: 'Materiale di consumo pulizie' },
                              { value: 15, label: 'Noleggio Compattatori' },
                              { value: 16, label: 'Porte Automatiche' },
                              { value: 17, label: 'Recupero e smaltimento rifiuti' },
                              { value: 18, label: 'Scale mobili e Ascensori' },
                              { value: 19, label: 'Segnaletica' },
                              { value: 20, label: 'Servizi (generico)' },
                              { value: 21, label: 'Servizi Autospurgo' },
                              { value: 22, label: 'Servizi di Pulizie' },
                              { value: 23, label: 'Servizi di Vigilanza e Portierato' },
                              { value: 24, label: 'Alimentari' },
                            ]}
                            ref={(input) => this.selectVal = input}
                            onChange={(e) => this.handleChangeSelect(e)}
                            />
                          </div>*/}
                        <div>
                        <h5>Selezionare lo stato del bando</h5>
                          <Row>
                            <Input
                              type='radio'
                              name='firstSet'
                              label='Nascosto'
                              onChange={e => {handleStateNascosto(e)}}
                              defaultChecked = {this.state.Raperto}
                              valueSelected = {this.state.Rchiuso} />
                            <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                            <Input
                              type='radio'
                              name='firstSet'
                              label='Aperto'
                              onChange={e => {handleStateAperto(e)}}
                              defaultChecked = {this.state.Rchiuso}
                              valueSelected = {this.state.Rchiuso} />
                          </Row>
                          </div>
                          <div>
                            <Row>
                              <Input
                                type='checkbox'
                                onValidate={e => true}
                                label='Gara con esclusione tramite Rating'
                                onChange={e => { this.handleIsItChecked() }}
                                defaultChecked = {this.state.EsclGara} />
                              <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                              {/*Questo input si attiva se la checkbox sopra viene selezionata*/}
                              <Input
                                type='text'
                                disabled={true}
                                label='Rating minimo'
                                placeholder='1 a 100'
                                value={this.state.minRating}
                                onChange={e => this.logChangeDataMinRating(e)} />
                            </Row>

                            <Row>
                              {/*Questa check fa in modo che il bando sia sotto invito del banditore solo per alcune aziende*/}
                              <Input
                                type='checkbox'
                                onValidate={e => true}
                                label='Gara con invito'
                                onChange={e => { this.handleIsItChecked() }}
                                defaultChecked = {this.state.GarInvit} />
                              <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                              {/*Questo input si attiva se la checkbox sopra viene selezionata*/}

                            </Row>
                          </div>
                          <div>
                            <h5>Descrizione della Gara - Max 300 Caratteri</h5>
                            <Textarea
                              name='textarea'
                              placeholder='inserisci la descrizione...'
                              onChange={e => this.onTextChange('desc', e)}
                              value={this.state.descr} />
                          </div>
                          <Row>
                            <FormGroup>
                              <ControlLabel>Data Apertura dela Gara</ControlLabel>
                                <DatePicker
                                  weekStartsOn={1}
                                  dayLabels={spanishDayLabels}
                                  monthLabels={spanishMonthLabels}
                                  onChange={this.handleChangeApertura}
                                  placeholder="..."
                                  value={this.state.dataApertura} />
                            </FormGroup>
                              <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                            <FormGroup>
                              <ControlLabel>Data Chiusura della Gara</ControlLabel>
                              <DatePicker
                                weekStartsOn={1}
                                dayLabels={spanishDayLabels}
                                monthLabels={spanishMonthLabels}
                                onChange={this.handleChangeChiusura}
                                placeholder="..."
                                value={this.state.dataChiusura} />
                            </FormGroup>
                          </Row>
                          <Input
                            type='text'
                            label='Soglia massima di Proposta'
                            placeholder='...'
                            value={this.state.sogliaMax}
                            onChange={e => this.logChangeSogliaMax(e)}/>
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
                <Button type='warning' onClick={this.submit} title='Salva' onClick={() => this.updateBando()}/>
              </Modal.Footer>
              </Modal>
      <Panel title="Informazioni generali">
        <div>
            <ul>
              <h5><li>Nome della Proposta: </li>{this.state.nomeBando}</h5>
              <h5><li>Creato da:    ,il:  {this.state.dataCreazione}</li> </h5>
              <h5><li>Data di Candidatura:   {this.state.stato}</li></h5>
              <h5><li>Stato della Proposta:   {this.state.stato}</li></h5>
              <h5><li>Descrizione: </li></h5>
              <h5>{this.state.descr}</h5>
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
    <div>
      <Panel title ="Riepilogo Fornitori aderenti al bando">
        <div>
          <BootstrapTable className="bordered" options={ options }  data={ dataB }>
            <TableHeaderColumn className="black-muted-bg" dataField='ID' editable={false} width='90' isKey={true} dataSort={ true } dataAlign='center'>ID</TableHeaderColumn>
            <TableHeaderColumn className="black-muted-bg" dataField='Nome' filter={ { type: 'TextFilter', delay: 1000 }} dataAlign='center' dataSort={ true }>NOME FORNITORE</TableHeaderColumn>
            <TableHeaderColumn className="black-muted-bg" dataField='IVAForn' filter={ { type: 'TextFilter', delay: 1000 }} dataAlign='center' dataSort={ true }>P.IVA</TableHeaderColumn>
            <TableHeaderColumn className="black-muted-bg" dataField='Candidatura' filter={ { type: 'TextFilter', delay: 1000 }} dataAlign='center' dataSort={ true }>STATO CANDIDATURA</TableHeaderColumn>
          </BootstrapTable>
        </div>
      </Panel>
    </div>
          </Panel>
    </Page>
    );
  }
}
