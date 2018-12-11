import React from 'react';

import { Row, Col } from 'react-flex-proto';
import { Page, Panel, Modal, Button, Breadcrumbs, Input, Select, Switch, Tabs, Tab, Table, TableHead,TableBody, TableRow } from 'react-blur-admin';
import { Link } from 'react-router';
import _ from 'lodash';
import axios from 'axios';

import eventBus from 'src/lib/event-bus';

const options = {
  onRowClick: function(row) {
    alert(`You click row id: ${row.ID}`);
    browserHistory.push('/fornitore-dettaglio-bando');
  },
  onRowDoubleClick: function(row) {
    alert(`You double click row id: ${row.ID}`);
  }
};

export class ProfiloAzienda extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        data: [],
        dataBando: [],
    }
  }

  componentWillMount(){
    if(localStorage.getItem('userToken') == 'NaN'){
       eventBus.emit('toLogin'); //Se non e' stato effettutato il login reindirizzo alla pagina di login
    }else{
      this.getDataForn();     //prendo i dati del fornitore per fare il display sul profilo
    }

  }

  //richiamo l'endpoint con la funzione fetch()
  getDataForn() {
    let self = this;
    axios.get('/api/getForn')
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
            data: result.data
          });
          self.getPartecipForn(); //prendo le varie partecipazioni del fornitore
      }else {
        alert("Non ci sono informazioni relative a questo utente o ci sono errori del server");
      }
    }).catch(function (error) {
      console.log(error);
    });
  }

  //richiamo l'endpoint con la funzione fetch()
  getPartecipForn() {
    let self = this;
    axios.post('/api/getPartecip', {
      Mail: this.state.data[0].Mail,
    }).then( (response) => {
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
            dataBando: result.data
          });
      }else {
        alert("Non ci sono informazioni relative a questo utente o ci sono errori del server");
      }
    }).catch(function (error) {
      console.log(error);
    });
  }

  render() {
    let data = [];
    let Bandi = [];

    if(this.state.data.length != 0){
       data = this.state.data[0]; //provvedo ad evitare che la pagina vada in errore perche' al primo render lo state non e' settato
    }
    if(this.state.dataBando.length != 0){
      Bandi = this.state.dataBando; //provvedo ad evitare che la pagina vada in errore perche' al primo render lo state non e' settato
   }

    return (
    //  {this.renderCustomizedModals()}
    <Page title="Profilo Privato Aziendale - Sviluppo">
      <Tabs
        align='top'
        startTab={1} >
      <Tab title = "PROFILO PRIVATO AZIENDALE">
        <Panel title = "Dati Generali Utente">
          <ul>
            <h5><li>Nome Referente: {data.Nome} </li></h5>

            <h5><li>Cognome Referente: {data.Cognome}</li></h5>
            <h5><li>Ruolo Referente: {data.Ruolo}</li></h5>
            <h5><li>Email(aziendale): {data.Mail}</li></h5>
            <h5><li>Numero di Telefono(aziendale): {data.Telefono}</li></h5>
          </ul>
        </Panel>

      <Row>
        <div>
          <Panel title = "Dati Generici Azienda">
            <ul>
              <h5><li>Nome dell'Azienda: {data.NomeForn}</li></h5>
              <h5><li>P.Iva: {data.IVAForn}</li></h5>
              <h5><li>Forma Giuridica: {data.FGiurid}</li></h5>
              <h5><li>PEC: {data.PEC}</li></h5>
              <h5><li>Sito Web: {data.SitoWeb}</li></h5>
            </ul>
          </Panel>
        </div>
          <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
        <div>
          <Panel title = "Dati Anagrafica Tributaria e CCIAA Azienda">
            <ul>
              <h5><li>ATECO: {data.ATECO}</li></h5>
              <h5><li>Comune CCIAA (ProvinciaCCIIAA ?): {data.ProvinciaCCIAA}</li></h5>
              <h5><li>NUmero CCIAA(Numero REA ?): {data.NumeroREA}</li></h5>
            </ul>
          </Panel>
        </div>
      </Row>
      <Row>

      </Row>
      </Tab>
      <Tab title = "PARTECIPAZIONE BANDI">
        <Panel title = "Lista bandi con aderenza">
          <div>
            <BootstrapTable className="bordered" options={ options }  data={ Bandi }>
              <TableHeaderColumn className="black-muted-bg" dataField='ID' editable={false} width='90' isKey={true} dataSort={ true } dataAlign='center'>ID</TableHeaderColumn>
              <TableHeaderColumn className="black-muted-bg" dataField='Nome' filter={ { type: 'TextFilter', delay: 1000 }} dataAlign='center' dataSort={ true }>NOME</TableHeaderColumn>
              <TableHeaderColumn className="black-muted-bg" dataField='Categoria' filter={ { type: 'TextFilter', delay: 1000 }} dataAlign='center' dataSort={ true }>CATEGORIA</TableHeaderColumn>
              <TableHeaderColumn className="black-muted-bg" dataField='Apertura' filter={ { type: 'TextFilter', delay: 1000 }} dataAlign='center' dataSort={ true }>APERTO IL</TableHeaderColumn>
              <TableHeaderColumn className="black-muted-bg" dataField='Chiusura' filter={ { type: 'TextFilter', delay: 1000 }} dataAlign='center' dataSort={ true }>CHIUDERA IL</TableHeaderColumn>
              <TableHeaderColumn className="black-muted-bg" dataField='OffertaMassima' filter={ { type: 'TextFilter', delay: 1000 }} dataAlign='center' dataSort={ true }>OFFERTA MAX</TableHeaderColumn>
              <TableHeaderColumn className="black-muted-bg" dataField='MinRating' filter={ { type: 'TextFilter', delay: 1000 }} dataAlign='center' dataSort={ true }>PUNTEGGIO MIN</TableHeaderColumn>
              <TableHeaderColumn className="black-muted-bg" dataField='Stato' filter={ { type: 'TextFilter', delay: 1000 }} dataAlign='center' dataSort={ true }>STATO</TableHeaderColumn>
            </BootstrapTable>
          </div>
        </Panel>
      </Tab>
    </Tabs>
    </Page>
    );
  }
}
