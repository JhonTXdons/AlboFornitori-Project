import React from 'react';
import 'src/css/auth-lock.css';

import { Row, Col } from 'react-flex-proto';
import { Page, Panel, Input, Select, Button,  Textarea, Switch, Breadcrumbs, EditableSelect } from 'react-blur-admin';
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
      lastName: null,
      data : [{
        name: null,
        piva: null, //number
        formGiur: null,
        ateco: null, //alfanumerico
        siteUrl: null,
        pec: null,
        areaservizio: null,
        stato:null,
        regione:null,
        citta:null,
        via:null,
        ncivic:null,
        role: null,
        email: null,
        phoneNumber: null, //number
        language: _.fill(Array(5), null),
        nomeAzienda: null,
        prova: null,
        value: '',
        categoria:1,
        subCategoria: null,


      }],
    };
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
        if(value.length > 50){
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

  //richiamo l'endpoint con la funzione axios
  //eseguo la registrazione di un nuovo utente con il valore corrente degli state
  //e poi rimandero' l'utente di nuovo al login
  registerUser(e) {
    let self = this;
    e.preventDefault();
    var data = {
        nome: this.state.nomeBando,
        categoria: this.refs.categoria.state.value,
        dataCreazione: this.state.dataCreazione,
        dataApertura: this.state.dataApertura,
        dataChiusura: this.state.dataChiusura,
        sogliaMax: this.state.sogliaMax,
        minRating: this.state.minRating,
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
        alert("Utente reigstrato con successo!");
          window.location.reload()
      }else {
        alert("Nome utente o password errati");
      }
    }).catch(function (error) {
      console.log(error);
    });
  }

  render() {
    return (
      <div className="lockRegister">
        <Page title='Registrati per poter utilizzare la piattaforma'>
          <form>
            <Row>
              <Col>
                <div className="RegPanel">
                  <Panel title='Anagrafica Utente'>
                    <Input
                      type='text'
                      label='Nome utente (Il quale gestirà le informazioni e la partecipazione alle gare)'
                      placeholder='Nome utente'
                      onChange={e => this.onTextChange('firstName', e)}
                      onValidate={e => this.FieldValidation('firstName', e)}
                      value={this.state.firstName} />

                    <Input
                      type='text'
                      label='Cognome'
                      placeholder='Cognome'
                      onChange={e => this.onTextChange('lastName', e)}
                      value={this.state.lastName} />
                    <Input
                      type='email'
                      label='email'
                      placeholder='...'
                      onChange={e => this.onTextChange('email', e)}
                      value={this.state.email} />
                      <Row>
                        <Input
                          type='password'
                          onChange={event => this.handlePassword(event)}
                          label='Password'
                          hasFeedbackIcon={false}
                          value={this.state.password} />
                        <span>&nbsp;&nbsp;</span>
                        <Input
                          type='password'
                          onChange={event => this.handlePassword(event)}
                          label='Ripeti la password'
                          hasFeedbackIcon={false}
                          value={this.state.password} />
                      </Row>

                    <Input
                      type='text'
                      label="Ruolo (Che ricopre all'interno dell'azienda)"
                      placeholder='es. Amministratore, Delegato, Consulente..'
                      onChange={e => this.onTextChange('role', e)}
                      value={this.state.role} />
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
                      onChange={e => this.onTextChange('phoneNumber', e)}
                      value={this.state.phoneNumber} />

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
                      value={this.state.nomeAzienda} />
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
                            value={this.refs.value}
                            ref="categoria"/>
                          <Input
                            type='text'
                            label="Sotto Categoria"
                            placeholder='...'
                            onChange={e => this.onTextChange('subCategoria', e)}
                            value={this.state.subCategoria} />
                    </div>
                    <Input
                      type='text'
                      label='P.Iva'
                      placeholder='000000000000'
                      onChange={e => this.onTextChange('piva', e)}
                      value={this.state.piva} />

                      <Input
                        type='text'
                        label='Telefono Aziendale'
                        placeholder='000000000000'
                        onChange={e => this.onTextChange('telAz', e)}
                        value={this.state.telAz} />

                    <Input
                      type='text'
                      label="Forma Giuridica"
                      placeholder='impr. indiv., s.r.l., etc'
                      onChange={e => this.onTextChange('formGiur', e)}
                      value={this.state.formGiur} />
                    <Row>
                      <Col>
                        <Input
                          type='text'
                          label='Codice della Camera di Commercio (ATECO)'
                          placeholder=''
                          onChange={e => this.onTextChange('ateco', e)}
                          value={this.state.ateco} />
                        <a target="_blank" rel="noopener noreferrer" style={{ float: 'right' }} href="http://ateco.infocamere.it/ateq/home.action"> Non sai il codice?</a>
                      </Col>
                    </Row>

                    {/*Provincia CCIAA
                    <Select
                      label="Provincia CCIAA"
                      placeholder='Regione'
                      isSearchable={true}
                      options={[
                      { value:1, label:"AG - Agrigento"},
	                    { value:2, label:"AL - Alessandria"},
                      {	value:3, label:"AN - Ancona"},
                      {	value:3, label:"AO - Aosta"},
                      {	value:3, label:"AR - Arezzo"},
	                    { value:3, label:"AP - Ascoli Piceno"},
	                    { value:3, label:"AT - Asti"},
	                    { value:3, label:"AV - Avellino"},
	                    { value:3, label:"BA - Bari"},
	                    { value:3, label:"BT - Barletta-Andria-Trani"},
	                    { value:3, label:"BL - Belluno"},
	                    { value:3, label:"BN - Benevento"},
	                    { value:3, label:"BG - Bergamo"},
	                    { value:3, label:"BI - Biella"},
	                    { value:3, label:"BO - Bologna"},
	                    { value:3, label:"BZ - Bolzano"},
                      {	value:3, label:"BS - Brescia"},
	                    { value:3, label:"BR - Brindisi"},
	                    { value:3, label:"CA - Cagliari"},
	                    { value:3, label:"CL - Caltanissetta"},
                      {	value:3, label:"CB - Campobasso"},
	                    { value:3, label:"CI - Carbonia-iglesias"},
	                    { value:3, label:"CE - Caserta"},
	                    { value:3, label:"CT - Catania"},
	                    { value:3, label:"CZ - Catanzaro"},
	                    { value:3, label:"CH - Chieti"},
	                    { value:3, label:"CO - Como"},
	                    { value:3, label:"CS - Cosenza"},
	                    { value:3, label:"CR - Cremona"},
	                    { value:3, label:"KR - Crotone"},
	                    { value:3, label:"CN - Cuneo"},
	                    { value:3, label:"EN - Enna"},
	                    { value:3, label:"FM - Fermo"},
	                    { value:3, label:"FE - Ferrara"},
	                    { value:3, label:"FI - Firenze"},
	                    { value:3, label:"FG - Foggia"},
	                    { value:3, label:"FC - Forl&igrave;-Cesena"},
	                    { value:3, label:"FR - Frosinone"},
	                    { value:3, label:"GE - Genova"},
	                    { value:3, label:"GO - Gorizia"},
	                    { value:3, label:"GR - Grosseto"},
	                    { value:3, label:"IM - Imperia"},
	                    { value:3, label:"IS - Isernia"},
	                    { value:3, label:"SP - La spezia"},
	                    { value:3, label:"AQ - L'aquila"},
	                    { value:3, label:"LT - Latina"},
	                    { value:3, label:"LE - Lecce"},
	                    { value:3, label:"LC - Lecco"},
	                    { value:3, label:"LI - Livorno"},
	                    { value:3, label:"LO - Lodi"},
	                    { value:3, label:"LU - Lucca"},
	                    { value:3, label:"MC - Macerata"},
	                    { value:3, label:"MN - Mantova"},
	<option value="ms">Massa-Carrara</option>
	<option value="mt">Matera</option>
	<option value="vs">Medio Campidano</option>
	<option value="me">Messina</option>
	<option value="mi">Milano</option>
	<option value="mo">Modena</option>
	<option value="mb">Monza e della Brianza</option>
	<option value="na">Napoli</option>
	<option value="no">Novara</option>
	<option value="nu">Nuoro</option>
	<option value="og">Ogliastra</option>
	<option value="ot">Olbia-Tempio</option>
	<option value="or">Oristano</option>
	<option value="pd">Padova</option>
	<option value="pa">Palermo</option>
	<option value="pr">Parma</option>
	<option value="pv">Pavia</option>
	<option value="pg">Perugia</option>
	<option value="pu">Pesaro e Urbino</option>
	<option value="pe">Pescara</option>
	<option value="pc">Piacenza</option>
	<option value="pi">Pisa</option>
	<option value="pt">Pistoia</option>
	<option value="pn">Pordenone</option>
	<option value="pz">Potenza</option>
	<option value="po">Prato</option>
	<option value="rg">Ragusa</option>
	<option value="ra">Ravenna</option>
	<option value="rc">Reggio di Calabria</option>
	<option value="re">Reggio nell'Emilia</option>
	<option value="ri">Rieti</option>
	<option value="rn">Rimini</option>
	<option value="rm">Roma</option>
	<option value="ro">Rovigo</option>
	<option value="sa">Salerno</option>
	<option value="ss">Sassari</option>
	<option value="sv">Savona</option>
	<option value="si">Siena</option>
	<option value="sr">Siracusa</option>
	<option value="so">Sondrio</option>
	<option value="ta">Taranto</option>
	<option value="te">Teramo</option>
	<option value="tr">Terni</option>
	<option value="to">Torino</option>
	<option value="tp">Trapani</option>
	<option value="tn">Trento</option>
	<option value="tv">Treviso</option>
	<option value="ts">Trieste</option>
	<option value="ud">Udine</option>
	<option value="va">Varese</option>
	<option value="ve">Venezia</option>
	<option value="vb">Verbano-Cusio-Ossola</option>
	<option value="vc">Vercelli</option>
	<option value="vr">Verona</option>
	<option value="vv">Vibo valentia</option>
	<option value="vi">Vicenza</option>
	<option value="vt">Viterbo</option>
                      onChange={value => this.setState({ selectTwo: value })}
                      value={this.state.selectTwo} />*/}
                    <Input
                      type='text'
                      label='Provincia CCIAA'
                      placeholder='es. AN'
                      onChange={e => this.onTextChange('provCCIAA', e)}
                      value={this.state.provCCIAA} />

                    <Input
                      type='text'
                      label='Numero REA'
                      placeholder='es. 0000'
                      onChange={e => this.onTextChange('numREA', e)}
                      value={this.state.numREA} />

                    <Input
                      type='text'
                      label='Sito Web'
                      placeholder='copia il link del sito'
                      onChange={e => this.onTextChange('siteUrl', e)}
                      value={this.state.siteUrl} />

                    <Input
                      type='text'
                      label='PEC'
                      placeholder='esempio@lamiaPEC.it'
                      onChange={e => this.onTextChange('pec', e)}
                      value={this.state.pec} />
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
                    onChange={e => this.onTextChange('stato', e)}
                    value={this.state.stato} />
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
                      onChange={value => this.setState({ selectTwo: value })}
                      value={this.state.selectTwo} />
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
                      onChange={value => this.setState({ selectTwo: value })}
                      value={this.state.selectTwo} />
                  </div>
                  <Row>
                    <Input
                      type='text'
                      label='Indirizzo'
                      placeholder='via, viale, piazza...'
                      onChange={e => this.onTextChange('sedeLegInd', e)}
                      value={this.state.sedeLegInd} />
                    <span>&nbsp;&nbsp;</span>
                    <Input
                      type='text'
                      label='Numero'
                      placeholder='00'
                      onChange={e => this.onTextChange('sedeLegNum', e)}
                      value={this.state.sedeLegNum} />
                    <span>&nbsp;&nbsp;</span>
                    <Input
                      type='text'
                      label='CAP'
                      placeholder='cap'
                      onChange={e => this.onTextChange('cap', e)}
                      value={this.state.cap} />
                  </Row>
                  <Input
                    type='text'
                    label='FAX'
                    placeholder=''
                    onChange={e => this.onTextChange('sedeLegFax', e)}
                    value={this.state.sedeLegFax} />
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
                    value={this.state.statoAmm} />
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
                        onChange={value => this.setState({ selectTwo: value })}
                        value={this.state.selectTwo} />
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
                        onChange={value => this.setState({ selectTwo: value })}
                        value={this.state.selectTwo} />
                    </div>
                  <Row>
                    <Input
                      type='text'
                      label='Indirizzo'
                      placeholder='via, viale, piazza...'
                      onChange={e => this.onTextChange('sedeAmmInd', e)}
                      value={this.state.sedeAmmInd} />
                    <span>&nbsp;&nbsp;</span>
                    <Input
                      type='text'
                      label='Numero'
                      placeholder='00'
                      onChange={e => this.onTextChange('sedeAmmNum', e)}
                      value={this.state.sedeAmmNum} />
                    <span>&nbsp;&nbsp;</span>
                    <Input
                      type='text'
                      label='CAP'
                      placeholder='cap'
                      onChange={e => this.onTextChange('cap', e)}
                      value={this.state.capAmm} />
                  </Row>
                  <Input
                    type='text'
                    label='FAX'
                    placeholder=''
                    onChange={e => this.onTextChange('sedeAmmFax', e)}
                    value={this.state.sedeAmmFax} />
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
