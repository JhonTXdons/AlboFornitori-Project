import React from 'react';

import { Row, Col } from 'react-flex-proto';
import { Page, Panel,  Button, Breadcrumbs,Textarea, Input, Select, Switch, Table, Tabs, Tab, TableHead, TableBody, TableRow, EditableText,eventBus } from 'react-blur-admin';
import { Link, browserHistory } from 'react-router';
import { Modal } from 'react-bootstrap';

//Notifiche

import axios from 'axios';

//DatePicker
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import HelpBlock from 'react-bootstrap/lib/HelpBlock';

import DatePicker from 'react-bootstrap-date-picker';

const spanishDayLabels = [ 'Lun', 'Mar', 'Mer', 'Gio', 'Ved', 'Sab','Dom'];
const spanishMonthLabels = ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', 'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'];

function dateFormatter(cell, row) {
  if (typeof cell !== 'object') {
   cell = new Date(cell);
 }
  return `${('0' + cell.getDate()).slice(-2)}/${('0' + (cell.getMonth() + 1)).slice(-2)}/${cell.getFullYear()}`;
}

function priceFormatter(cell, row) {
  return `${cell} &euro;`;
}

function ratingFormatter(cell, row) {
  if(cell == 0){
    return 'LIBERO';
  }
  else{
    if(cell<=19 && cell>=1){
      return (<img src={star}/>);
    }
    else{
      if(cell<=39 && cell>=20){
        return <div><img src={star}/><img src={star}/></div>;
      }
      else{
        if(cell<=59 && cell>=40){
          return <div><img src={star}/><img src={star}/><img src={star}/></div>;
        }
        else{
          if(cell<=79 && cell>=60){
            return <div><img src={star}/><img src={star}/><img src={star}/><img src={star}/></div>;
          }
          else{
            if(cell<=100 && cell>=80){
              return <div><img src={star}/><img src={star}/><img src={star}/><img src={star}/><img src={star}/></div>;
            }
      }
    }
  }
}
}
}
//FilePond - -Caricamento Documenti
import { FilePond } from 'react-filepond';
import 'filepond/dist/filepond.min.css';

import _ from 'lodash';
import star from 'public/star.png';

const options = {
  onRowClick: function(row) {
    alert(`You click row id: ${row.ID}`);
    browserHistory.push({
      pathname: '/banditore-dettaglio-bando',
      state: { rowSel: row }
    });
    },
    onRowDoubleClick: function(row) {
      alert(`You double click row id: ${row.ID}`);
    }
};

const options2 = {
  onRowClick: function(row) {
    //questa funzione gestisce il click nella tabella della lista dei bandi
    //alert(`You click row id: ${row.ID}`);
    browserHistory.push({
      pathname: '/banditore-istruttoria',
      state: { rowSel: row }
    });
  },
  onRowDoubleClick: function(row) {
    alert(`You double click row id: ${row.ID}`);
  }
};


export class BanditorePannel extends Modal {
  constructor(props) {
          super(props)
          this.state = {
              data: [],
              bandi: [],
              allBandi: [],
              show: false,
              currentRow: [],
              primaryModal: false,
              condition1: false, //vcheckbox gara con esclusione
              condition2: false,  //checkbox gara con invito
              RatMinEnab:true,

              //modal
              nomeBando: 'Nessun Titolo Disponibile',
              categoria: 1,
              descr: 'Nessuna Descrizione Disponibile',
              dataCreazione: new Date().toISOString(),
              dataApertura: new Date().toISOString(),
              dataChiusura: new Date().toISOString(),
              sogliaMax: 0,
              minRating: 0,
              stato: 'Nascosto',
              garaConEsclusione: false,

          }
          this.handleChangeApertura = this.handleChangeApertura.bind(this);
          this.handleChangeChiusura = this.handleChangeChiusura.bind(this);
          this.insertBando = this.insertBando.bind(this);
  }

  handleChangeApertura(value,formattedValue) {
    this.setState({
      dataApertura: value,
    });
  }

  //handle dataChiusura
  handleChangeChiusura(value,formattedValue) {
    this.setState({
      dataChiusura: value,
    });
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

  handleIsItCheckedEsclusione(e){
    this.setState({
      condition1: e,
      RatMinEnab:false,
    });

  }

  handleIsItCheckedInvito(e){
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
    this.setState({MailUser:MailUser});
    this.allFornOfBand(MailUser);
    this.allBandiBanditore(MailUser);
  }

  //funzione per il salvataggio del bando
  insertBando(event){
    let self = this;
    const MailUser = self.state.MailUser;
    event.preventDefault(); //non ricarico la pagina una volta fatto il submit
    var data = {
      nome: this.state.nomeBando,
      categoria: this.state.categoria,
      descr: this.state.descr,
      dataCreazione: this.state.dataCreazione.substring(0, this.state.dataCreazione.indexOf('T')),
      dataApertura: this.state.dataApertura.substring(0, this.state.dataApertura.indexOf('T')),
      dataChiusura: this.state.dataChiusura.substring(0, this.state.dataChiusura.indexOf('T')),
      sogliaMax: this.state.sogliaMax,
      minRating: this.state.minRating,
      stato: this.state.stato,
      mailBand: MailUser,
    }
    console.log(data)
    fetch("/api/insBando", {
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
           self.onRenderModal('primaryModal',false);              //tolgo il modal una volta che ho aggiornato la lista dei banditori
        }else{
           eventBus.addNotification('error','Abbiamo riscontrato problemi nella registrazione del bando, riprovare!');
        }
    }).catch(function(err) {
        console.log(err)
    });

  }

   //richiamo l'endpoint che mi restituisce tutti i fornitori che hanno aderito ai bandi del banditore corrente
   allFornOfBand(MailUser) {
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
            data: result.data
          });
      }else {
      }
    }).catch(function (error) {
      console.log(error);
    });
  }

  //richiamo l'endpoint che mi restituisce tutti i bandi di un banditore
  allBandiBanditore(MailUser) {
    let self = this;
    axios.post('/api/allBandiBanditore', {
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
            allBandi: result.data
          });
      }else {
        eventBus.addNotification('warning','Non hai inserito nessuna Gara!');
      }
    }).catch(function (error) {
      console.log(error);
    });
  }

  render() {
    let dataB = [];
    if(this.state.data.length != 0){
       dataB = this.state.data; //provvedo ad evitare che la pagina vada in errore perche' al primo render lo state non e' settato
    }
    let AllBandi = [];
    if(this.state.allBandi.length != 0){
      AllBandi = this.state.allBandi; //provvedo ad evitare che la pagina vada in errore perche' al primo render lo state non e' settato
    }
    let condition = true;
    const LabelISOString = new Date().toISOString();
    return (
      <Page title="Banditore Pannel Svicom Albo Fornitori - Sviluppo">
        <Row>
          <Tabs align='top'
          startTab={1}>
          <Tab title="PANNELLO BANDITORE">
            <Panel title="Pagina dove vengono visualizzate tutte le funzioni relative al Banditore">
              <Modal
                show={this.state.primaryModal}
                onHide={() => this.onCloseModal('primaryModal')}
              >
              <Modal.Header closeButton className="modal-header bg-primary">
                  <Modal.Title style={{color:'#ffffff'}}>Inserimento della Gara</Modal.Title>
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
                        <div>
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
                        </div>
                            <div>
                            <h5>Selezionare lo stato del bando</h5>
                              <Row>
                                <Input
                                  type='radio'
                                  name='firstSet'
                                  label='Nascosto'
                                  onChange={e => {this.handleStateNascosto(e)}} />
                                <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                <Input
                                  type='radio'
                                  name='firstSet'
                                  label='Aperto'
                                  onChange={e => {this.handleStateAperto(e)}} />
                              </Row>
                              </div>
                              <div>
                                <Row>
                                  <Input
                                    type='checkbox'
                                    onValidate={e => true}
                                    value={this.state.condition1}
                                    label='Gara con esclusione tramite Rating'
                                    onChange={e => { this.handleIsItCheckedEsclusione(e) }} />
                                  <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                  {/*Questo input si attiva se la checkbox sopra viene selezionata*/}
                                  <Input
                                    type='text'
                                    disabled={this.state.RatMinEnab}
                                    label='Rating minimo'
                                    placeholder='1 a 100'
                                    value={this.state.minRating}
                                    onChange={e => this.logChangeDataMinRating(e)}/>
                                </Row>

                                <Row>
                                  {/*Questa check fa in modo che il bando sia sotto invito del banditore solo per alcune aziende*/}
                                  <Input
                                    type='checkbox'
                                    value={this.state.condition2}
                                    onValidate={e => true}
                                    label='Gara con invito'
                                    onChange={e => { this.handleIsItCheckedInvito(e) }} />
                                  <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                  {/*Questo input si attiva se la checkbox sopra viene selezionata*/}

                                </Row>
                              </div>
                              <div>
                                <h5>Descrizione della Gara - Max 300 Caratteri</h5>
                                <Textarea
                                  name='textarea'
                                  placeholder='inserisci la descrizione...'
                                  onChange={e => this.logTextChange(e)}
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
                                name='sogliaMax'
                                type='text'
                                label='Soglia massima di Proposta'
                                placeholder='...'
                                value={this.state.sogliaMax}
                                onChange={e => this.handleStateSogliaMax(e)}/>
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
                  <Button type='primary' title='Salva' onClick={e => {this.insertBando(e)}}/>
                </Modal.Footer>
                </Modal>
              <div className ="Titolo del bando">
                <Panel title="Ultimi bandi Aggiunti">
                  <div style={{float:'left'}}>
                        <Button type='info' title="Inserisci" onClick={e => this.onRenderModal('primaryModal',true)} />
                  </div>
                  <div>
                    <BootstrapTable className="bordered" options={ options } hover={ true }  data={ AllBandi }>
                      <TableHeaderColumn className="black-muted-bg" dataField='ID' hide={true} editable={false} width='30' isKey={true} dataSort={ true } dataAlign='center'>ID</TableHeaderColumn>
                      <TableHeaderColumn className="black-muted-bg" dataField='Nome' width='auto' filter={ { type: 'TextFilter', delay: 1000, placeholder: 'Cerca...' }} dataAlign='center' dataSort={ true }>NOME</TableHeaderColumn>
                      <TableHeaderColumn className="black-muted-bg" dataField='Categoria' filter={ { type: 'TextFilter', delay: 1000, placeholder: 'Cerca...'  }} dataAlign='center' dataSort={ true }>CATEGORIA</TableHeaderColumn>
                      <TableHeaderColumn className="black-muted-bg" dataField='DataCreazione' filter={ { type: 'TextFilter', delay: 1000, placeholder: 'Cerca...'  }} dataAlign='center' dataFormat={ dateFormatter } dataSort={ true }>CREATO IL</TableHeaderColumn>
                      <TableHeaderColumn className="black-muted-bg" dataField='Apertura' filter={ { type: 'TextFilter', delay: 1000, placeholder: 'Cerca...'  }} dataAlign='center' dataFormat={ dateFormatter }  dataSort={ true }>APERTO IL</TableHeaderColumn>
                      <TableHeaderColumn className="black-muted-bg" dataField='Chiusura' filter={ { type: 'TextFilter', delay: 1000, placeholder: 'Cerca...'  }} dataAlign='center' dataFormat={ dateFormatter } dataSort={ true }>CHIUDERA IL</TableHeaderColumn>
                      <TableHeaderColumn className="black-muted-bg" dataField='OffertaMassima' filter={ { type: 'TextFilter', delay: 1000, placeholder: 'Cerca...'  }} dataFormat={ priceFormatter } dataAlign='center' dataSort={ true }>OFFERTA MAX</TableHeaderColumn>
                      <TableHeaderColumn className="black-muted-bg" dataField='MinRating' filter={ { type: 'TextFilter', delay: 1000, placeholder: 'Cerca...'  }} dataAlign='center' dataFormat ={ratingFormatter} dataSort={ true }>PUNTEGGIO MIN</TableHeaderColumn>
                      <TableHeaderColumn className="black-muted-bg" dataField='Stato' filter={ { type: 'TextFilter', delay: 1000, placeholder: 'Cerca...'  }} dataAlign='center' dataSort={ true }>STATO</TableHeaderColumn>
                    </BootstrapTable>
                  </div>
                </Panel>
              </div>
        </Panel>
          </Tab>
          <Tab title = "ALBO FORNITORI">
            <Panel title='Tabella Fornitori'>
              <div>
                <BootstrapTable className="bordered" options={ options2 } hover={ true } data={ dataB }>
                  <TableHeaderColumn className="black-muted-bg" dataField='ID' editable={false} width='90' isKey={true} dataSort={ true } dataAlign='center'>ID</TableHeaderColumn>
                  <TableHeaderColumn className="black-muted-bg" dataField='Nome' filter={ { type: 'TextFilter', delay: 1000, placeholder: 'Cerca...' }} dataAlign='center' dataSort={ true }>NOME FORNITORE</TableHeaderColumn>
                  <TableHeaderColumn className="black-muted-bg" dataField='IVAForn' filter={ { type: 'TextFilter', delay: 1000, placeholder: 'Cerca...' }} dataAlign='center' dataSort={ true }>P.IVA</TableHeaderColumn>
                  <TableHeaderColumn className="black-muted-bg" dataField='NomeBando' filter={ { type: 'TextFilter', delay: 1000, placeholder: 'Cerca...' }} dataAlign='center' dataSort={ true }>NOME DEL BANDO</TableHeaderColumn>
                  <TableHeaderColumn className="black-muted-bg" dataField='Candidatura' filter={ { type: 'TextFilter', delay: 1000, placeholder: 'Cerca...' }} dataAlign='center' dataSort={ true }>STATO CANDIDATURA</TableHeaderColumn>
                  <TableHeaderColumn className="black-muted-bg" dataField='Rating' filter={ { type: 'TextFilter', delay: 1000, placeholder: 'Cerca...' }} dataAlign='center' dataFormat ={ratingFormatter} dataSort={ true }>RATING MEDIO</TableHeaderColumn>
                </BootstrapTable>
              </div>
            </Panel>
          </Tab>
        </Tabs>
        </Row>
      </Page>
    );
  }
}
