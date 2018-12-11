import React from 'react';
import 'src/css/auth-lock.css';

import { Row, Col } from 'react-flex-proto';
import { Page, Panel, Input, Select, Button,  Textarea, Switch, Breadcrumbs, EditableSelect,eventBus } from 'react-blur-admin';
import { Link } from 'react-router';

import axios from 'axios';
import { isRegExp } from 'util';

export class Register extends React.Component {

  constructor(props) {
    super(props);
    this.state = {

      switches: _.fill(Array(5), true),
      editableSelect3: 1,
      checkboxChecked: false,
      firstName: '', //text
      lastName: '',
      
        //Dati per update profilo fornitore
        Nome: '', //text
        Cognome: '',
        AccessoMail:'',
        Passwd: '',
        Ruolo: '',
        Telefono: '',
        NomeForn: '',
        Categoria : 1,
        SottoCategoria : '',
        IvaForn : '',
        FGiurid : '',
        ATECO: '', //alfanumerico
        ProvinciaCCIAA: '',
        NumeroREA: '',
        SitoWeb: '',
        PEC: '',
        SLStato:'',
        SLRegione:'',
        SLProvincia:'',
        SLIndirizzo:'',
        SLCAP:'',
        SLFAX:'',
        SAmmStato:'',
        SAmmRegione:'',
        SAmmProvincia:'',
        SAmmCAP:'',
        SAmmFAX:'',
        SAmmProvincia:'',
        SAmmIndirizzo:'',
      
    };
  }

  //handle select categoria
  handleChangeSelect(key,e){
    let value = e;
    this.setState({
      [key]: value,
    });
  }

  onCloseModal(modalName) {
    this.setState({ [modalName]: false });
  }

  onRenderModal(modalName) {
    this.setState({ [modalName]: true });
  }

  handleIsItChecked(){
  this.setState({[checkboxChecked]: true});
  }

  onTextChange(key, event) {
    //gestisco l'inserimento nell'input e verifico che l'inserimento sia corretto
    this.setState({ [key]: event.currentTarget.value });
  }

  //Validazione dei campi di inserimento per la registrazione
  FieldValidation(key, value) {
    switch(key) {
      case 'firstName':
        if(value.length > 15){
          return 'error';
        }
        break;
      case 'lastName':
        if(value.length > 15){
          return 'error';
        }
        break;
      case 'email':
       if(value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)){
         return 'error';
       }
       break;
       case 'pec':
        if(value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)){
          return 'error';
        }
        break;
       case 'role':
         if(value.length > 15){
          return 'error';
        }
      case 'password':
        if(value.length > 15){
         return 'error';
       }
        break;
      case 'password2':
        if(!value.match('passowrd')){
          return 'error';
        }
        break;
      case 'phoneNumber':
        if(value.length > 10){
          return 'error';
        }
        break;
        case 'telAz':
          if(value.length > 10){
            return 'error';
          }
          break;
      case 'nomeAzienda':
        if(value.length > 50){
          return 'error';
        }
        break;
      case 'subCategoria':
        if(value.length > 30){
          return 'error';
        }
        break;
      case 'piva':
        if(value.length > 11){
          return 'error';
        }
        break;
      case 'ateco':
        if(value.length > 8){
          return 'error';
        }
        break;
      case 'provCCIAA':
        if(value.length > 2){
          return 'error';
        }
        break;
      case 'numREA':
        if(value.length > 6){
          return 'error';
        }
        break;
      case 'sedeLegInd':
        if(value.length > 30){
          return 'error';
        }
        break;
      case 'sedeLegNum':
      if(value.length > 3){
        return 'error';
      }
      break;
      case 'capLeg':
      if(value.length > 5){
        return 'error';
      }
      break;
      case 'sedeLegFax':
      if(value.length > 10){
        return 'error';
      }
      break;
      case 'sedeAmmInd':
        if(value.length > 30){
          return 'error';
        }
        break;
      case 'sedeAmmNum':
      if(value.length > 3){
        return 'error';
      }
      break;
      case 'capAmm':
      if(value.length > 5){
        return 'error';
      }
      break;
      case 'sedeAmmFax':
      if(value.length > 10){
        return 'error';
      }
      break;
    }
  }

  onSelectChange(key, value) {
    this.setState({ [key]: value});
  }

  onSwitchChange(index) {
    let switches = this.state.switches;
    switches[index] = !switches[index];
    this.setState({ switches });
  }
  redirNewHome(){
    localStorage.setItem('userToken', 'NaN');
    localStorage.setItem('userRole', 'NaN');
    browserHistory.push('/auth');
  }

  //richiamo l'endpoint con la funzione axios
  //eseguo la registrazione di un nuovo utente con il valore corrente degli state
  //e poi rimandero' l'utente di nuovo al login
  registerUser(e) {
    let self = this;
    e.preventDefault();
    var data = {
      Nome: '', //text
      Cognome: '',
      AccessoMail:'',
      Passwd: '',
      Ruolo: '',
      Telefono: '',
      NomeForn: '',
      Categoria : 1,
      SottoCategoria : '',
      IVAForn : '',
      FGiurid : '',
      ATECO: '', //alfanumerico
      ProvinciaCCIAA: '',
      NumeroREA: '',
      SitoWeb: '',
      PEC: '',
      SLStato:'',
      SLRegione:'',
      SLProvincia:'',
      SLIndirizzo:'',
      SLCAP:'',
      SLFAX:'',
      SAmmStato:'',
      SAmmRegione:'',
      SAmmProvincia:'',
      SAmmCAP:'',
      SAmmFAX:'',
      SAmmProvincia:'',
      SAmmIndirizzo:'',
    }
    axios.post('/api/register', {
      data: this.state.data
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
        eventBus.addNotification('success',"Utente reigstrato con successo!");
          window.location.reload()
      }else {
        eventBus.addNotification('error', 'Registrazione non risucita, controllare la correttezza dei campi!');
      }
    }).catch(function (error) {
      console.log(error);
    });
  }

  render() {
    return (
      <div className="lockRegister">
        <Page title='Registrati per poter utilizzare la piattaforma'>
          <div style={{float:'left'}}>
            <Link  to={'/auth'}><Button icon={<i className="fa fa-chevron-circle-left"></i>}  type='default' size='md' title='Indietro'/></Link>
          </div>
          <form>
            <Row>
              <Col>
                <div className="RegPanel">
                  <Panel title='Anagrafica Utente'>
                    <Input
                      type='text'
                      label='Nome utente (Il quale gestirà le informazioni e la partecipazione alle gare)'
                      placeholder='Nome utente'
                      onChange={e => this.onTextChange('Nome', e)}
                      onValidate={e => this.FieldValidation('firstName', e)}
                      value={this.state.Nome} />

                    <Input
                      type='text'
                      label='Cognome'
                      placeholder='Cognome'
                      onChange={e => this.onTextChange('Cognome', e)}
                      onValidate={e => this.FieldValidation('lastName', e)}
                      value={this.state.Cognome} />
                    <Input
                      type='email'
                      label='email'
                      placeholder='...'
                      onChange={e => this.onTextChange('AccessoMail', e)}
                      onValidate={e => this.FieldValidation('email', e)}
                      value={this.state.AccessoMail} />
                      <Row>
                        <Input
                          type='password'
                          onChange={event => this.onTextChange('Passwd', e)}
                          label='Password'
                          hasFeedbackIcon={false}
                          value={this.state.Passwd} />
                        <span>&nbsp;&nbsp;</span>
                        <Input
                          type='password'
                          onChange={event => this.onTextChange('password2', e)}
                          label='Ripeti la password'
                          onValidate={e => this.FieldValidation('password2', e)}
                          hasFeedbackIcon={false}
                          value={this.state.password2} />
                      </Row>

                    <Input
                      type='text'
                      label="Ruolo (Che ricopre all'interno dell'azienda)"
                      placeholder='es. Amministratore, Delegato, Consulente..'
                      onChange={e => this.onTextChange('Ruolo', e)}
                      onValidate={e => this.FieldValidation('role', e)}
                      value={this.state.Ruolo} />
                    <Row>
                      <Col>
                        <Input
                          type='checkbox'
                          onValidate={e => true}
                          label='Italiano'
                          onChange={e => { this.handleIsItChecked() }} />
                      </Col>
                      <Col>
                        <Input
                          type='checkbox'
                          onValidate={e => true}
                          label='Inglese'
                          onChange={e => { this.handleIsItChecked() }} />
                      </Col>
                      <Col>
                        <Input
                          type='checkbox'
                          onValidate={e => true}
                          label='Tedesco'
                          onChange={e => { this.handleIsItChecked() }} />
                      </Col>
                      <Col>
                        <Input
                          type='checkbox'
                          onValidate={e => true}
                          label='Francese'
                          onChange={e => { this.handleIsItChecked() }} />
                      </Col>
                      <Col>
                        <Input
                          type='checkbox'
                          onValidate={e => true}
                          label='Spagnolo'
                          onChange={e => { this.handleIsItChecked() }} />
                      </Col>
                    </Row>
                    <Input
                      type='text'
                      label='Numero di Telefono'
                      placeholder='0234124554'
                      onChange={e => this.onTextChange('Telefono', e)}
                      onValidate={e => this.FieldValidation('phoneNumber', e)}
                      value={this.state.Telefono} />

                    </Panel>
                  </div>
              </Col>
              <Col>
                <div className="RegPanel">
                  <Panel title='Anagrafica Azienda'>
                    <Input
                      type='text'
                      label="Nome dell'Azienda"
                      placeholder='nome azienda'
                      onChange={e => this.onTextChange('nomeAzienda', e)}
                      onValidate={e => this.FieldValidation('nomeAzienda', e)}
                      value={this.state.NomeForn} />
                    <div>
                      <h6>Categoria Generica del Fornitore</h6>
                        <Select
                          label="Categoria"
                          placeholder='Categoria Generica del Fornitore'
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
                            onChange={(e) => this.handleChangeSelect('Categoria',e)}/>
                          <Input
                            type='text'
                            label="Sotto Categoria"
                            placeholder='...'
                            onChange={e => this.onTextChange('SottoCategoria', e)}
                            onValidate={e => this.FieldValidation('subCategoria', e)}
                            value={this.state.SottoCategoria} />
                    </div>
                    <Input
                      type='text'
                      label='P.Iva'
                      placeholder='000000000000'
                      onChange={e => this.onTextChange('IvaForn', e)}
                      onValidate={e => this.FieldValidation('piva', e)}
                      value={this.state.IvaForn} />

                      <Input
                        type='text'
                        label='Telefono Aziendale'
                        placeholder='000000000000'
                        onChange={e => this.onTextChange('Telefono', e)}
                        onValidate={e => this.FieldValidation('telAz', e)}
                        value={this.state.Telefono} />
                      <div>
                        <h6>Forma Giuridica dell'impresa</h6>
                        <Select
                          placeholder='forma giuridica'
                          options={[
                            { value: 'Ditta Individuale', label: 'Ditta Individuale' },
                            { value: 'S.s.', label: 'Società Semplice' },
                            { value: 'S.n.c.', label: 'Società in nome collettivo' },
                            { value: 'S.a.s.', label: 'Società in accomandita semplice' },
                            { value: 'S.r.l.', label: 'Società a responsabilità limitata' },
                            { value: 'S.r.l.s.', label: 'Società a responsabilità limitata semplice' },
                            { value: 'S.p.a.', label: 'Società per azioni' },
                            { value: 'S.a.p.a.', label: 'Società in accomandita per azioni' },
                          ]}
                          ref={(input) => this.selectVal = input}
                          onChange={(e) => this.handleChangeSelect('FGiurid',e)} />
                      </div>
                    <Row>
                      <Col>
                        <Input
                          type='text'
                          label='Codice della Camera di Commercio (ATECO)'
                          placeholder=''
                          onChange={e => this.onTextChange('ATECO', e)}
                          onValidate={e => this.FieldValidation('ateco', e)}
                          value={this.state.ATECO} />
                        <a target="_blank" rel="noopener noreferrer" style={{ float: 'right' }} href="http://ateco.infocamere.it/ateq/home.action"> Non sai il codice?</a>
                      </Col>
                    </Row>
                    <Input
                      type='text'
                      label='Provincia CCIAA'
                      placeholder='es. AN'
                      onChange={e => this.onTextChange('ProvinciaCCIAA', e)}
                      onValidate={e => this.FieldValidation('provCCIAA', e)}
                      value={this.state.ProvinciaCCIAA} />

                    <Input
                      type='text'
                      label='Numero REA'
                      placeholder='es. 0000'
                      onChange={e => this.onTextChange('NumeroREA', e)}
                      onValidate={e => this.FieldValidation('numREA', e)}
                      value={this.state.NumeroREA} />

                    <Input
                      type='text'
                      label='Sito Web'
                      placeholder='copia il link del sito'
                      onChange={e => this.onTextChange('siteUrl', e)}
                      value={this.state.SitoWeb} />

                    <Input
                      type='text'
                      label='PEC'
                      placeholder='esempio@lamiaPEC.it'
                      onChange={e => this.onTextChange('PEC', e)}
                      onValidate={e => this.FieldValidation('pec', e)}
                      value={this.state.PEC} />
                  </Panel>
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <Panel title='Anagrafica Azienda - Sede Legale'>
                {  /*per Vittorio. Qui ci andrebbero una serie di Select
                  con ricerca per poter trovare: Stato,Regione,Provincia */}
                  <Input
                    type='text'
                    label="Stato"
                    placeholder='stato'
                    onChange={e => this.onTextChange('SLStato', e)}
                    value={this.state.SLStato} />
                  <div>
                    <h6>Regione</h6>
                    <Select
                      label="Regione"
                      placeholder='Regione'
                      isSearchable={true}
                      options={[
                        { value: 1, label: 'Marche' },
                        { value: 2, label: 'Umbria' },
                        { value: 3, label: 'Lazio' },
                        { value: 4, label: 'Veneto' },
                        { value: 5, label: 'Puglia' },
                        { value: 6, label: 'Emilia Romagna' },
                      ]}
                      ref={(input) => this.selectVal = input}
                      onChange={(e) => this.handleChangeSelect('SLRegione',e)} />
                  </div>
                  <div>
                    <h6>Provincia</h6>
                    <Select
                      label="Provincia"
                      placeholder='Provincia'
                      isSearchable={true}
                      options={[
                        { value: 1, label: 'Ancona' },
                        { value: 2, label: 'Foggia' },
                        { value: 3, label: 'Macerata' },
                      ]}
                      ref={(input) => this.selectVal = input}
                      onChange={(e) => this.handleChangeSelect('SLProvincia',e)} />
                  </div>
                  <Row>
                    <Input
                      type='text'
                      label='Indirizzo'
                      placeholder='via, viale, piazza...'
                      onChange={e => this.onTextChange('SLIndirizzo', e)}
                      onValidate={e => this.FieldValidation('sedeLegInd', e)}
                      value={this.state.SLIndirizzo} />
                    <span>&nbsp;&nbsp;</span>
                    {/*<Input
                      type='text'
                      label='Numero'
                      placeholder='00'
                      onChange={e => this.onTextChange('sedeLegNum', e)}
                      onValidate={e => this.FieldValidation('sedeLegNum', e)}
                      value={this.state.sedeLegNum} />
                    <span>&nbsp;&nbsp;</span>*/}
                    <Input
                      type='text'
                      label='CAP'
                      placeholder='cap es.60030'
                      onChange={e => this.onTextChange('capLeg', e)}
                      onValidate={e => this.FieldValidation('capLeg', e)}
                      value={this.state.SLCAP} />
                  </Row>
                  <Input
                    type='text'
                    label='FAX'
                    placeholder=''
                    onChange={e => this.onTextChange('sedeLegFax', e)}
                    onValidate={e => this.FieldValidation('sedeLegFax', e)}
                    value={this.state.SLFAX} />
                </Panel>
              </Col>
              <Col>
                <Panel title='Anagrafica Azienda - Sede Amministrativa'>
                {  /*per Vittorio. Qui ci andrebbero una serie di Select
                  con ricerca per poter trovare: Stato,Regione,Provincia */}
                  <Input
                    type='checkbox'
                    onValidate={e => true}
                    label='Uguale a Sede Legale'
                    onChange={e => { this.handleIsItChecked() }} />
                  <Input
                    type='text'
                    label="Stato"
                    placeholder='stato'
                    onChange={e => this.onTextChange('statoAmm', e)}
                    onValidate={e => this.FieldValidation('statoAmm', e)}
                    value={this.state.SAmmStato} />
                    <div>
                      <h6>Regione</h6>
                      <Select
                        label="Regione"
                        placeholder='Regione'
                        isSearchable={true}
                        options={[
                          { value: 1, label: 'Marche' },
                          { value: 2, label: 'Umbria' },
                          { value: 3, label: 'Lazio' },
                          { value: 4, label: 'Veneto' },
                          { value: 5, label: 'Puglia' },
                          { value: 6, label: 'Emilia Romagna' },
                        ]}
                        ref={(input) => this.selectVal = input}
                        onChange={(e) => this.handleChangeSelect('SAmmRegione',e)}  />
                    </div>
                    <div>
                      <h6>Provincia</h6>
                      <Select
                        label="Provincia"
                        placeholder='Provincia'
                        isSearchable={true}
                        options={[
                          { value: 1, label: 'Ancona' },
                          { value: 2, label: 'Foggia' },
                          { value: 3, label: 'Macerata' },
                          { value: 4, label: 'Foggia è meglio' },
                          { value: 5, label: 'Foggia caput mundi' },
                          { value: 6, label: 'Za Fo' },
                        ]}
                        ref={(input) => this.selectVal = input}
                        onChange={(e) => this.handleChangeSelect('SAmmProvincia',e)}  />
                    </div>
                  <Row>
                    <Input
                      type='text'
                      label='Indirizzo'
                      placeholder='via Roma,3'
                      onChange={e => this.onTextChange('SAmmIndirizzo', e)}
                      onValidate={e => this.FieldValidation('sedeAmmInd', e)}
                      value={this.state.SAmmIndirizzo} />
                    <span>&nbsp;&nbsp;</span>
                    {/*<Input
                      type='text'
                      label='Numero'
                      placeholder='00'
                      onChange={e => this.onTextChange('sedeAmmNum', e)}
                      onValidate={e => this.FieldValidation('sedeAmmNum', e)}
                      value={this.state.sedeAmmNum} />
                    <span>&nbsp;&nbsp;</span>*/}
                    <Input
                      type='text'
                      label='CAP'
                      placeholder='cap'
                      onChange={e => this.onTextChange('SAmmCAP', e)}
                      onValidate={e => this.FieldValidation('capAmm', e)}
                      value={this.state.SAmmCAP} />
                  </Row>
                  <Input
                    type='text'
                    label='FAX'
                    placeholder=''
                    onChange={e => this.onTextChange('SAmmFAX', e)}
                    onValidate={e => this.FieldValidation('sedeAmmFax', e)}
                    value={this.state.SAmmFAX} />
                </Panel>
              </Col>
            </Row>
            <div style={{ float: 'right' }}>
              <Button type='add' size='lg' title='Registrati' disable={!this.state.formValid} onClick={e => {this.registerUser(e)}}/>
            </div>
          </form>
        </Page>
      </div>
    );
  }
}
