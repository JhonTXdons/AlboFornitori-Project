import React from 'react';

import { Row, Col } from 'react-flex-proto';
import { Page, Panel, Input, Select, Button,  Textarea, Switch, Breadcrumbs, EditableSelect } from 'react-blur-admin';
import { Link } from 'react-router';

export class BanditoreValutazioneFornitore extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      switches: _.fill(Array(5), true),
      editableSelect3: 1,
      checkboxChecked: false,
      firstName: null, //text
      lastName: null,
      role: null,
      email: null,
      phoneNumber: null, //number
      language: _.fill(Array(5), null),
      nomeAzienda: null,
      piva: null, //number
      formGiur: null,
      ateco: null, //alfanumerico
      siteUrl: null,
      pec: null,
      ptova: null,
    };
  }



  onCloseModal(modalName) {
    this.setState({ [modalName]: false });
  }

  onRenderModal(modalName) {
    this.setState({ [modalName]: true });
  }

  onTextChange(key, event) {
    this.setState({ [key]: event.currentTarget.value });
  }

  onSelectChange(key, value) {
    this.setState({ [key]: value});
  }

  onSwitchChange(index) {
    let switches = this.state.switches;
    switches[index] = !switches[index];
    this.setState({ switches });
  }

  render() {
    return (
      <Page title='Pagina di Valutazione del Fornitore'>
      <form>
        <Row>
            <Panel title="Compilatore e Struttura">
            <Input
              type ='text'
              label='Nome compilatore del Modulo'
              placeholder=''
              onChange={e => this.onTextChange('firstName', e)}
              value={this.state.firstName} />

            <Input
              type ='text'
              label='Struttura di Riferimento'
              placeholder=''
              onChange={e => this.onTextChange('lastName', e)}
              value={this.state.lastName} />
          </Panel>

          <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>

          <Panel title ="Dati del Fornitore">
            <Input
              type ='text'
              label="Ragione Sociale del Fornitore"
              placeholder=''
              onChange={e => this.onTextChange('role', e)}
              value={this.state.role} />
            <Input
              type ='text'
              label="Inserire numero P.IVA del Fornitore"
              placeholder=''
              onChange={e => this.onTextChange('role', e)}
              value={this.state.role} />

            <Select
              label="Categoria del Servizio da valutare"
              placeholder='Categoria del Servizio da valutare'
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
                ]}
              onChange={value => this.setState({ selectTwo: value })}
              value={this.state.selectTwo} />
            <Input
              type ='text'
              label="Sottogategoria"
              placeholder='in funzione del campo precedentemente individato, dettagliare, se necessario, la sottocategoria'
              onChange={e => this.onTextChange('role', e)}
              value={this.state.role} />
          </Panel>
         </Row>
          <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>

          <Panel title="VALUTAZIONE">
            <Panel title="Qualità del Servizio">
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
            </Panel>
            <Panel title="Tempi di Risposta e Soluzione">
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
            </Panel>
            <Panel title="Prezzo">
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
            </Panel>
            <Panel title="Professionalità del Personale">
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
            </Panel>
            <Panel title="Capacità Consulenziale">
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
            </Panel>
            <Panel title="Note">
              <Textarea
                name='textarea'
                placeholder=''
                label='Note'
                onChange={e => this.onTextChange('textarea', e)}
                value={this.state.textarea} />
            </Panel>
            <div style={{float:'right'}}>
                <Button type='primary' title="Valuta"  size='lg'/>
            </div>
          </Panel>
        </form>
      </Page>
    );
  }
}
