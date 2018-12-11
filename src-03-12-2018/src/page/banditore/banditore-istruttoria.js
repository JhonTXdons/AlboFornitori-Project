import React from 'react';

import { Row, Col } from 'react-flex-proto';
import { Page, Panel, Button, Breadcrumbs, Input,Textarea, Select, Switch, Table,Tabs, Tab, TableHead, TableBody, TableRow,EditableText } from 'react-blur-admin';
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
      firstName: null, //text
      lastName: null,
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
      dataB : [{
        NomeBanditore: 'Svicom - Sede Centrale',
        Qs:'4',
        TRS:'5',
        P:'2',
        PP:'3',
        CC:'3',
        NOTE:'Ogni tanto vanno in Buffer i Video',
      }],

      data: [{
        NomeForn: 'Elemento di Test',
        IVAForn: '0000',
        FGiurid: 'S.r.l.',
        PEC: 'lamiapec@pec.iy',
        SitoWeb: 'PornHub',
      }],
    };
  }

  onCloseModal(modalName) {
    this.setState({ [modalName]: false });
  }

  onRenderModal(modalName) {
    this.setState({ [modalName]: true });
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


  insertValutazione(){

  }
  onlogChangeStato(value){
    if (value == true){
      this.setState({
        stato: 'Approvata',
      })
    }
    else{
      this.setState({
        stato: 'Rifiutata',
      })
    }

  }

  renderBreadcrumbs() {
    return (
      <Breadcrumbs>
        <Link to='/banditore-dettaglio-bando'>
          Pannello Banditore
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
                  onChange={e => this.onTextChange('firstName', e)}
                  value={this.state.firstName} />

                <Input
                  type ='text'
                  label='Struttura di Riferimento'
                  placeholder='...'
                  onChange={e => this.onTextChange('lastName', e)}
                  value={this.state.lastName} />
            </div>
            <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <div>
              <h5>Dati del Fornitore</h5>
                <Input
                  type ='text'
                  label="Ragione Sociale del Fornitore"
                  placeholder='...'
                  onChange={e => this.onTextChange('role', e)}
                  value={this.state.role} />
                <Input
                  type ='text'
                  label="Inserire numero P.IVA del Fornitore"
                  placeholder='...'
                  onChange={e => this.onTextChange('piva', e)}
                  value={this.state.piva} />

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
                <Input
                  type ='text'
                  label="Sottogategoria"
                  placeholder='in funzione del campo precedentemente individato, dettagliare, se necessario, la sottocategoria'
                  onChange={e => this.onTextChange('role', e)}
                  value={this.state.role} />
            </div>
           </Row>
            <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
          <div style={{alignContent: 'center'}}>
            <h1>VALUTAZIONE</h1>
              <div>
                <h5>Qualità del Servizio</h5>
                    <Row>
                      <Input
                        type='radio'
                        name='firstSet'
                        label='1'
                        onChange={e => {}} />
                      <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                      <Input
                        type='radio'
                        name='firstSet'
                        label='2'
                        onChange={e => {}} />
                      <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                      <Input
                        type='radio'
                        name='firstSet'
                        label='3'
                        onChange={e => {}} />
                      <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                      <Input
                        type='radio'
                        name='firstSet'
                        label='4'
                        onChange={e => {}} />
                      <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                      <Input
                        type='radio'
                        name='firstSet'
                        label='5'
                        onChange={e => {}} />
                      <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    </Row>
              </div>
              <div>
                <h5>Tempi di Risposta e Soluzione</h5>
                <Row>
                  <Input
                    type='radio'
                    name='secondSet'
                    label='1'
                    onChange={e => {}} />
                  <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                  <Input
                    type='radio'
                    name='secondSet'
                    label='2'
                    onChange={e => {}} />
                  <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                  <Input
                    type='radio'
                    name='secondSet'
                    label='3'
                    onChange={e => {}} />
                  <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                  <Input
                    type='radio'
                    name='secondSet'
                    label='4'
                    onChange={e => {}} />
                  <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                  <Input
                    type='radio'
                    name='secondSet'
                    label='5'
                    onChange={e => {}} />
                  <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                </Row>
              </div>
              <div>
                <h5>Prezzo</h5>
                <Row>
                  <Input
                    type='radio'
                    name='thirdSet'
                    label='1'
                    onChange={e => {}} />
                  <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                  <Input
                    type='radio'
                    name='thirdSet'
                    label='2'
                    onChange={e => {}} />
                  <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                  <Input
                    type='radio'
                    name='thirdSet'
                    label='3'
                    onChange={e => {}} />
                  <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                  <Input
                    type='radio'
                    name='thirdSet'
                    label='4'
                    onChange={e => {}} />
                  <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                  <Input
                    type='radio'
                    name='thirdSet'
                    label='5'
                    onChange={e => {}} />
                  <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                </Row>
              </div>
              <div>
                <h5>Professionalità del Personale</h5>
                <Row>
                  <Input
                    type='radio'
                    name='fourthSet'
                    label='1'
                    onChange={e => {}} />
                  <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                  <Input
                    type='radio'
                    name='fourthSet'
                    label='2'
                    onChange={e => {}} />
                  <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                  <Input
                    type='radio'
                    name='fourthSet'
                    label='3'
                    onChange={e => {}} />
                  <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                  <Input
                    type='radio'
                    name='fourthSet'
                    label='4'
                    onChange={e => {}} />
                  <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                  <Input
                    type='radio'
                    name='fourthSet'
                    label='5'
                    onChange={e => {}} />
                  <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                </Row>
              </div>
              <div>
                <h5>Capacità Consulenziale</h5>
                  <Row>
                    <Input
                      type='radio'
                      name='fifthSet'
                      label='1'
                      onChange={e => {}} />
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    <Input
                      type='radio'
                      name='fifthSet'
                      label='2'
                      onChange={e => {}} />
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    <Input
                      type='radio'
                      name='fifthSet'
                      label='3'
                      onChange={e => {}} />
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    <Input
                      type='radio'
                      name='fifthSet'
                      label='4'
                      onChange={e => {}} />
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    <Input
                      type='radio'
                      name='fifthSet'
                      label='5'
                      onChange={e => {}} />
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                  </Row>
              </div>
              <div>
                <h5>NOTE</h5>
                  <Textarea
                    name='textarea'
                    placeholder=''
                    label='Note'
                    onChange={e => this.onTextChange('textarea', e)}
                    value={this.state.textarea} />
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
              <h5><li>Nome dell'Azienda: {data.NomeForn}</li></h5>
              <h5><li>P.Iva: {data.IVAForn}</li></h5>
              <h5><li>Forma Giuridica: {data.FGiurid}</li></h5>
              <h5><li>PEC: {data.PEC}</li></h5>
              <h5><li>Sito Web: {data.SitoWeb}</li></h5>
            </ul>
            <div style={{float:'right'}}>
                  <Button type='add' title="Valuta" onClick={e => this.onRenderModal('primaryModal',true)} />
            </div>
          </Panel>
          <div>
            <BootstrapTable className="bordered"   data={ dataB }>
              <TableHeaderColumn className="black-muted-bg" dataField='NomeBanditore' isKey={true} filter={ { type: 'TextFilter', delay: 1000 }} dataAlign='center' dataSort={ true }>NOME VALUTATORE</TableHeaderColumn>
              <TableHeaderColumn className="black-muted-bg" dataField='Qs' filter={ { type: 'TextFilter', delay: 1000 }} dataAlign='center' dataSort={ true }>Qualità del Servizio</TableHeaderColumn>
              <TableHeaderColumn className="black-muted-bg" dataField='TRS' filter={ { type: 'TextFilter', delay: 1000 }} dataAlign='center' dataSort={ true }>Tempi di Risposta e Soluzione</TableHeaderColumn>
              <TableHeaderColumn className="black-muted-bg" dataField='P' filter={ { type: 'TextFilter', delay: 1000 }} dataAlign='center' dataSort={ true }>Prezzo</TableHeaderColumn>
              <TableHeaderColumn className="black-muted-bg" dataField='PP' filter={ { type: 'TextFilter', delay: 1000 }} dataAlign='center' dataSort={ true }>Professionalità del Personale</TableHeaderColumn>
              <TableHeaderColumn className="black-muted-bg" dataField='CC' filter={ { type: 'TextFilter', delay: 1000 }} dataAlign='center' dataSort={ true }>Capacità Consulenziale</TableHeaderColumn>
              <TableHeaderColumn className="black-muted-bg" dataField='Note'  dataAlign='center' >NOTE</TableHeaderColumn>
            </BootstrapTable>
          </div>
        </div>
      </Panel>
      <Panel title ="Riepilogo proposta">
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

        <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
        <div style={{float:'right'}}>
              <Button type='success' title="Accetta" onClick={e => this.onlogChangeStato(true)} />
        </div>
        <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
        <div style={{float:'right'}}>
              <Button type='danger' title="Respingi" onClick={e => this.onlogChangeStato(false)} />
        </div>
        <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
      </Panel>
      </Page>
    );
  }
}
