import React from 'react';

import { Row, Col } from 'react-flex-proto';
import { Page, Panel, Button, Breadcrumbs, Input,Textarea, Select, Switch, Table,Tabs, Tab, TableHead, TableBody,eventBus, TableRow,EditableText } from 'react-blur-admin';
import { Link,browserHistory } from 'react-router';
import { Modal } from 'react-bootstrap';

import axios from 'axios';
import _ from 'lodash';
import star from 'public/star.png';

export class BanditoreIstruttoria extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      switches: _.fill(Array(5), true),
      editableSelect3: 1,
      role: null,
      email: null,
      stato: 'in attesa',
      phoneNumber: null, //number
      language: _.fill(Array(5), null),
      nomeAzienda: null,
      piva: null, //number
      formGiur: null,
      ateco: null, //alfanumerico
      siteUrl: null,
      pec: null,
      ptova: null,
      primaryModal: false,
      dataB : [],

      propostaForn: [],

      data: [{
        NomeForn:  this.props.location.state.dettPartecip.NomeForn,
        IVAForn: this.props.location.state.dettPartecip.IVAForn,
        FGiurid: this.props.location.state.dettPartecip.FGiurid,
        PEC: this.props.location.state.dettPartecip.PEC,
        SitoWeb: this.props.location.state.dettPartecip.SitoWeb,
      }],

      dataValutazione: [{
        firstName: "",
        lastName: "",
        Qualita:  0,
        RispSol: 0,
        Prezzo: 0,
        Profess: 0,
        Consulenz: 0,
        textarea: "",
      }],
      CleanDataValutazione: [{
        firstName: "",
        lastName: "",
        Qualita:  0,
        RispSol: 0,
        Prezzo: 0,
        Profess: 0,
        Consulenz: 0,
        textarea: "",
      }],
      ValutaButton : false,
      AccettaButton : false,
      RifiutaButton : false,
    };
  }

  onCloseModal(modalName) {
    this.setState({ 
      [modalName]: false,
      dataValutazione: this.state.CleanDataValutazione,
      ValutaButton: true,
     });
    this.getProposta();
    this.getValutazioni();

  }

  onRenderModal(modalName) {
    this.setState({ [modalName]: true });
  }

  //handle per le checkbox della valutazione
  handleStateQualita(e){
    this.setState(prevState => ({
      dataValutazione: {
          ...prevState.dataValutazione,
          Qualita: e
      }
    })
    );
  }

  handleStateRispSol(e){
    this.setState(prevState => ({
      dataValutazione: {
          ...prevState.dataValutazione,
          RispSol: e
      }
    })
    );
  }
  
  handleStatePrezz(e){
    this.setState(prevState => ({
      dataValutazione: {
          ...prevState.dataValutazione,
          Prezzo: e
      }
    })
    );
  }

  handleStateProfPers(e){
    this.setState(prevState => ({
      dataValutazione: {
          ...prevState.dataValutazione,
          Profess: e
      }
    })
    );
  }

  handleStateCapacitaPers(e){
    this.setState(prevState => ({
      dataValutazione: {
          ...prevState.dataValutazione,
          Consulenz: e
      }
    })
    );
  }

  //handle
  handleChangeSelect(e){
    let value = e;
    this.setState({
      categoria: value,
    });
  }

  onSelectChange(key, value) {
    this.setState({ [key]: value});
  }

  onTextChange(key) {
    
    this.setState(prevState => ({
      dataValutazione: {
          ...prevState.dataValutazione,
          [key] : event.target.value,
      }
    })
    );
  }


  componentWillMount(){
    //valorizzo i campi che mi visualizzano i dettagli della proposta
    this.getProposta();
    this.getValutazioni();
  }

  //*******************************************************
  //  FUNZIONI A DISPOSIZIONE PER IL CARICAMENTO DEI DATI NELLA PAGINA
  //*******************************************************

  //richiamo l'endpoint per gestire l'accettazione della candidatura o il rifiuto in base al bottone premuto nell'interfaccia
  gestioneCand(flag) {
    if(flag){
      //accettazione
      let self = this;
      axios.post('/api/accettaCand', {
        IdForn: this.props.location.state.rowFornSel.IdForn,
        IdBando: this.props.location.state.bando.ID,
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
              data: result.data,
              AccettaButton: true,
              RifiutaButton: true,
            });
        }else {
          alert("Non ci sono bandi attivi al momento! Verrai notificato in caso di nuovi bandi in arrivo");
        }
      }).catch(function (error) {
        console.log(error);
      });
    }else{
      //rifiuto
      let self = this;
      axios.post('/api/rifiutaCand', {
        IdForn: this.props.location.state.rowFornSel.IdForn,
        IdBando: this.props.location.state.bando.ID,
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
              data: result.data,
              AccettaButton: true,
              RifiutaButton: true,
            });
        }else {
          alert("Non ci sono bandi attivi al momento! Verrai notificato in caso di nuovi bandi in arrivo");
        }
      }).catch(function (error) {
        console.log(error);
      });  
    }
  }


  //richiamo l'endpoint per effettuare la query per la valutazione di un fornitore
  insertValutazione(){
    //inserisco la valutazione assegnata al fornitore
    let self = this;
    axios.post('/api/valutaForn', {
      data: this.state.dataValutazione,
      IDForn: this.props.location.state.rowFornSel.IdForn,
      IDBando: this.props.location.state.bando.ID,
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
          eventBus.addNotification('success', 'Valutazione Inserita correttamente! ' );
          //inserisco i valori del fornitore in un array che utilizzero poi nei campi di visualizzazione del medesimo
          self.setState({
            valutData: result.data
          });
          self.onCloseModal('primaryModal');
      }else {
        eventBus.addNotification('error', 'Attenzione, la valutazione non è stata inserita,verificare la correttezza dei campi e riprovare! ' );
      }
    }).catch(function (error) {
      console.log(error);
    });  
  }

  //richiamo l'endpoint per effettuare la query per la valutazione di un fornitore
  getValutazioni(){
    //inserisco la valutazione assegnata al fornitore
    let self = this;
    axios.post('/api/getValutatori', {
      IDBando: this.props.location.state.bando.ID,
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
            dataB: result.data
          });
      }else {
        eventBus.addNotification('error', 'Attenzione, la valutazione non è stata inserita,verificare la correttezza dei campi e riprovare! ' );
      }
    }).catch(function (error) {
      console.log(error);
    });  
  }

  //richiamo l'endpoint per effettuare la query per la valutazione di un fornitore
  getProposta(){
    //inserisco la valutazione assegnata al fornitore
    let self = this;
    axios.post('/api/getProposta', {
      IDForn: this.props.location.state.rowFornSel.IdForn,
      IDBando: this.props.location.state.bando.ID,
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
            propostaForn: result.data
          });
      }else {
        eventBus.addNotification('error', 'Attenzione, la valutazione non è stata inserita,verificare la correttezza dei campi e riprovare! ' );
      }
    }).catch(function (error) {
      console.log(error);
    });  
  }

  onlogChangeStato(value){
    if (value == true){
      this.setState({
        stato: 'Approvata',

      })
      eventBus.addNotification('success', 'Proposta Valutata con successo: ACCETTATA! ' );
    }
    else{
      this.setState({
        stato: 'Rifiutata',

      })
      eventBus.addNotification('success', 'Proposta Valutata con successo: RIFIUTATA! '  );
    }

  }

  renderBreadcrumbs() {
    return (
      <Breadcrumbs>
        <Link to={{ pathname: '/banditore-dettaglio-bando', state: { rowSel: this.props.location.state.bando} }}>
          Dettaglio bando
        </Link>
          Istruttoria
      </Breadcrumbs>
    );
  }

  render() {
    let dataB = [];
    if(this.state.dataB.length != 0){
       dataB = this.state.dataB; //provvedo ad evitare che la pagina vada in errore perche' al primo render lo state non e' settato
    }

    //data valutazione
    let dataValutazione = null;
    if(this.state.propostaForn.length != 0){
      dataValutazione = this.state.propostaForn[0]; //provvedo ad evitare che la pagina vada in errore perche' al primo render lo state non e' settato
    }

    let data = [];
    if(this.state.data.length != 0){
       data = this.state.data; //provvedo ad evitare che la pagina vada in errore perche' al primo render lo state non e' settato
    }
    return (
      <Page actionBar={this.renderBreadcrumbs()} title='Pagina di Istruttoria della Partecipazione'>
        <Modal
          show={this.state.primaryModal}
          onHide={() => this.onCloseModal('primaryModal')}
        >
        <Modal.Header closeButton className="modal-header bg-primary">
            <Modal.Title style={{color:'#ffffff'}}>Inserimento Valutazione</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {/* <Modal type='warning' title='Modifica della Gara' isOpen={this.state.warningModal} onClose={e => this.onCloseModal('warningModal')}> */}
        <form>
          <Row>
            <div>
              <h5>Compilatore e Struttura</h5>
                <Input
                  type ='text'
                  label='Nome compilatore del Modulo'
                  placeholder='...'
                  onChange={() => this.onTextChange('firstName')}
                  value={this.state.dataValutazione.firstName} />

                <Input
                  type ='text'
                  label='Struttura di Riferimento'
                  placeholder='...'
                  onChange={() => this.onTextChange('lastName')}
                  value={this.state.dataValutazione.lastName} />
            </div>
            <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
           </Row>
            <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
          <div style={{alignContent: 'center'}}>
            <h1>VALUTAZIONE</h1>
              <div>
                <h5>Qualità del Servizio</h5>
                    <Row>
                      <Input
                        id='1'
                        type='radio'
                        name='firstSet'
                        label='1'
                        value = '1'
                        onChange = {e => {this.handleStateQualita(e)}} />
                      <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                      <Input
                        id='2'
                        type='radio'
                        name='firstSet'
                        label='2'
                        value = '2'
                        onChange={e => {this.handleStateQualita(e)}} />
                      <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                      <Input
                        id='3'
                        type='radio'
                        name='firstSet'
                        label='3'
                        value = '3'
                        onChange={e => {this.handleStateQualita(e)}} />
                      <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                      <Input
                        id='4'
                        type='radio'
                        name='firstSet'
                        label='4'
                        value = '4'
                        onChange={e => {this.handleStateQualita(e)}} />
                      <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                      <Input
                        id='5'
                        type='radio'
                        name='firstSet'
                        label='5'
                        value = '5'
                        onChange={e => {this.handleStateQualita(e)}} />
                      <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    </Row>
              </div>
              <div>
                <h5>Tempi di Risposta e Soluzione</h5>
                <Row>
                  <Input
                    id='1'
                    type='radio'
                    name='secondSet'
                    label='1'
                    value = '1'
                    onChange={e => {this.handleStateRispSol(e)}} />
                  <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                  <Input
                    id='2'
                    type='radio'
                    name='secondSet'
                    label='2'
                    value = '2'
                    onChange={e => {this.handleStateRispSol(e)}} />
                  <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                  <Input
                    id='3'
                    type='radio'
                    name='secondSet'
                    label='3'
                    value='3'
                    onChange={e => {this.handleStateRispSol(e)}} />
                  <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                  <Input
                    id='4'
                    type='radio'
                    name='secondSet'
                    label='4'
                    value='4'
                    onChange={e => {this.handleStateRispSol(e)}} />
                  <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                  <Input
                    id='5'
                    type='radio'
                    name='secondSet'
                    label='5'
                    value='5'
                    onChange={e => {this.handleStateRispSol(e)}} />
                  <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                </Row>
              </div>
              <div>
                <h5>Prezzo</h5>
                <Row>
                  <Input
                    id='1'
                    type='radio'
                    name='thirdSet'
                    label='1'
                    value='1'
                    onChange={e => {this.handleStatePrezz(e)}} />
                  <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                  <Input
                    id='2'
                    type='radio'
                    name='thirdSet'
                    label='2'
                    value='2'
                    onChange={e => {this.handleStatePrezz(e)}} />
                  <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                  <Input
                    id='3'
                    type='radio'
                    name='thirdSet'
                    label='3'
                    value='3'
                    onChange={e => {this.handleStatePrezz(e)}} />
                  <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                  <Input
                    id='4'
                    type='radio'
                    name='thirdSet'
                    label='4'
                    value='4'
                    onChange={e => {this.handleStatePrezz(e)}} />
                  <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                  <Input
                    id='5'
                    type='radio'
                    name='thirdSet'
                    label='5'
                    value='5'
                    onChange={e => {this.handleStatePrezz(e)}} />
                  <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                </Row>
              </div>
              <div>
                <h5>Professionalità del Personale</h5>
                <Row>
                  <Input
                    id='1'
                    type='radio'
                    name='fourthSet'
                    label='1'
                    value='1'
                    onChange={e => {this.handleStateProfPers(e)}} />
                  <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                  <Input
                    id='3'
                    type='radio'
                    name='fourthSet'
                    label='2'
                    value='2'
                    onChange={e => {this.handleStateProfPers(e)}} />
                  <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                  <Input
                    id='4'
                    type='radio'
                    name='fourthSet'
                    label='3'
                    value='3'
                    onChange={e => {this.handleStateProfPers(e)}} />
                  <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                  <Input
                    type='radio'
                    name='fourthSet'
                    label='4'
                    value='4'
                    onChange={e => {this.handleStateProfPers(e)}} />
                  <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                  <Input
                    id='5'
                    type='radio'
                    name='fourthSet'
                    label='5'
                    value='5'
                    onChange={e => {this.handleStateProfPers(e)}} />
                  <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                </Row>
              </div>
              <div>
                <h5>Capacità Consulenziale</h5>
                  <Row>
                    <Input
                      id='1'
                      type='radio'
                      name='fifthSet'
                      label='1'
                      value='1'
                      onChange={e => {this.handleStateCapacitaPers(e)}} />
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    <Input
                      id='2'
                      type='radio'
                      name='fifthSet'
                      label='2'
                      value='2'
                      onChange={e => {this.handleStateCapacitaPers(e)}} />
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    <Input
                      id='3'
                      type='radio'
                      name='fifthSet'
                      label='3'
                      value='3'
                      onChange={e => {this.handleStateCapacitaPers(e)}} />
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    <Input
                      id='4'
                      type='radio'
                      name='fifthSet'
                      label='4'
                      value='4'
                      onChange={e => {this.handleStateCapacitaPers(e)}} />
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    <Input
                      id='5'
                      type='radio'
                      name='fifthSet'
                      label='5'
                      value='5'
                      onChange={e => {this.handleStateCapacitaPers(e)}} />
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                  </Row>
              </div>
              <div>
                <h5>NOTE</h5>
                  <Textarea
                    name='textarea'
                    placeholder=''
                    label='Note'
                    onChange={() => this.onTextChange('textarea')}
                    value={this.state.dataValutazione.textarea} />
              </div>
          </div>
          </form>
        {/* </Modal> */}
        </Modal.Body>
        <Modal.Footer>
            <Button type='primary' title='Salva' onClick={e => {this.insertValutazione(e)}}/>
          </Modal.Footer>
          </Modal>
      <Panel title =" Riepilogo Dati genereali Azienda">

        <div>
          <Panel title = "Dati Generici Azienda">
            <ul>
              <h5><li>Nome dell'Azienda: {this.props.location.state.rowFornSel.NomeForn}</li></h5>
              <h5><li>P.Iva: {this.props.location.state.rowFornSel.IVAForn}</li></h5>
              <h5><li>Forma Giuridica: {this.props.location.state.rowFornSel.FGiurid}</li></h5>
              <h5><li>PEC: {this.props.location.state.rowFornSel.PEC}</li></h5>
              <h5><li>Sito Web: {this.props.location.state.rowFornSel.SitoWeb}</li></h5>
            </ul>
            <div style={{float:'right'}}>
                  <Button type='add' title="Valuta" disabled = {this.state.ValutaButton} onClick={e => this.onRenderModal('primaryModal',true)} />
            </div>
          </Panel>
          <div>
            <BootstrapTable className="bordered"   data={ dataB }>
              <TableHeaderColumn className="black-muted-bg" dataField='Valutatore' isKey={true} filter={ { type: 'TextFilter', delay: 1000 }} dataAlign='center' dataSort={ true }>NOME VALUTATORE</TableHeaderColumn>
              <TableHeaderColumn className="black-muted-bg" dataField='Val1' filter={ { type: 'TextFilter', delay: 1000 }} dataAlign='center' dataSort={ true }>Qualità del Servizio</TableHeaderColumn>
              <TableHeaderColumn className="black-muted-bg" dataField='Val2' filter={ { type: 'TextFilter', delay: 1000 }} dataAlign='center' dataSort={ true }>Tempi di Risposta e Soluzione</TableHeaderColumn>
              <TableHeaderColumn className="black-muted-bg" dataField='Val3' filter={ { type: 'TextFilter', delay: 1000 }} dataAlign='center' dataSort={ true }>Prezzo</TableHeaderColumn>
              <TableHeaderColumn className="black-muted-bg" dataField='Val4' filter={ { type: 'TextFilter', delay: 1000 }} dataAlign='center' dataSort={ true }>Professionalità del Personale</TableHeaderColumn>
              <TableHeaderColumn className="black-muted-bg" dataField='Val5' filter={ { type: 'TextFilter', delay: 1000 }} dataAlign='center' dataSort={ true }>Capacità Consulenziale</TableHeaderColumn>
              <TableHeaderColumn className="black-muted-bg" dataField='NoteValutatore'  dataAlign='center' >NOTE</TableHeaderColumn>
            </BootstrapTable>
          </div>
        </div>
      </Panel>
      <Panel title ="Riepilogo proposta">
        
          {this.state.propostaForn.map((p, i) => {
            return(
              <div>
                <ul>
                  <h5><li>Nome della Proposta:    {p.Titolo}</li></h5>
                  <h5><li>Data di Candidatura:    {p.DataIscr.substring(0, p.DataIscr.indexOf('T'))}</li></h5>
                  <h5><li>Stato della Proposta:   {p.Candidatura}</li></h5>
                  <h5><li>Descrizione:    </li></h5>
                  <h5>{p.Descrizione}</h5>
                  <h5><li>Documentazione allegata:</li></h5>
                    <ul>
                      <h5><li>Nome del file 1</li></h5>
                      <h5><li>Nome del file 2</li></h5>
                      <h5><li>Nome del file 3</li></h5>
                    </ul>
                </ul>
              </div>
            )
            })}
          

        <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
        <div style={{float:'right'}}>
              <Button type='success' title="Accetta" disabled = {this.state.AccettaButton} onClick={e => this.gestioneCand(true)} />
        </div>
        <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
        <div style={{float:'right'}}>
              <Button type='danger' title="Respingi" disabled = {this.state.RifiutaButton} onClick={e => this.gestioneCand(false)} />
        </div>
        <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
      </Panel>
      </Page>
    );
  }
}
