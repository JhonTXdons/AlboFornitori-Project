import React from 'react';

import { Row, Col } from 'react-flex-proto';
import { Page, Panel, Input, Select, Button,  Textarea, Switch, Breadcrumbs, EditableSelect } from 'react-blur-admin';
import { Link } from 'react-router';

export class Register extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      switches: _.fill(Array(5), true),
      editableSelect3: 1,
      firstName: null,
      lastName: null,
      role: null,
      email: null,
      phoneNumber: null,
      language: _.fill(Array(5), null),
      nomeAzienda: null,
      piva: null,
      formGiur: null,
      ateco: null,
      siteUrl: null,
      pec: null,

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

  onCheckChange(checked){
    this.setState({ [checked]: checked})
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
      <Page title='Pagina di Registrazione'>
      <form>
        <Row>

          <Col>

            <Panel title='Anagrafica Utente'>
            <Input
              type ='text'
              label='Nome utente (Il quale gestirà le informazioni e la partecipazione alle gare)'
              placeholder='Nome utente'
              onChange={e => this.onTextChange('firstName', e)}
              value={this.state.firstName} />

            <Input
              type ='text'
              label='Cognome'
              placeholder='Cognome'
              onChange={e => this.onTextChange('lastName', e)}
              value={this.state.lastName} />

            <Input
              type ='text'
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
                  onChange={e => {this.onCheckChange()}} />
              </Col>
              <Col>
                <Input
                  type='checkbox'
                  onValidate={e => true}
                  label='Inglese'
                  onChange={e => {this.onCheckChange()}} />
              </Col>
              <Col>
                <Input
                  type='checkbox'
                  onValidate={e => true}
                  label='Tedesco'
                  onChange={e => {this.onCheckChange()}} />
              </Col>
            </Row>
            <Input
              type ='text'
              label='Email(aziendale)'
              placeholder='esempio@email.it'
              onChange={e => this.onTextChange('email', e)}
              value={this.state.email} />

            <Input
              type ='text'
              label='Numero di Telefono(aziendale)'
              placeholder='000000000000'
              onChange={e => this.onTextChange('phoneNumber', e)}
              value={this.state.phoneNumber} />
            </Panel>


              </Col>
              <Col>

                <Panel title='Anagrafica Azienda'>
                <Input
                  type ='text'
                  label="Nome dell'Azienda"
                  placeholder='nome azienda'
                  onChange={e => this.onTextChange('nomeAzienda', e)}
                  value={this.state.nomeAzienda} />

                <Input
                  type ='text'
                  label='P.Iva'
                  placeholder='000000000000'
                  onChange={e => this.onTextChange('piva', e)}
                  value={this.state.piva} />

                <Input
                  type ='text'
                  label="Forma Giuridica"
                  placeholder='impr. indiv., s.r.l., etc'
                  onChange={e => this.onTextChange('formGiur', e)}
                  value={this.state.formGiur} />
                <Row>
                  <Col>
                  <Input
                    type ='text'
                    label='Codice della Camera di Commercio (ATECO)'                    
                    placeholder=''
                    onChange={e => this.onTextChange('ateco', e)}
                    value={this.state.ateco} />
                    <a style={{float:'right'}} href="http://ateco.infocamere.it/ateq/home.action"> Non sai il codice?</a>
                  </Col>
                </Row>
                <Input
                  type ='text'
                  label='Sito Web'
                  placeholder='copia il link del sito'
                  onChange={e => this.onTextChange('siteUrl', e)}
                  value={this.state.siteUrl} />

                <Input
                  type ='text'
                  label='PEC'
                  placeholder='esempio@lamiaPEC.it'
                  onChange={e => this.onTextChange('pec', e)}
                  value={this.state.pec} />

                </Panel>


                  </Col>

        </Row>
        <Row>
        <Col>

          <Panel title='Anagrafica Azienda - Sede Legale'>
          <Input
            type ='text'
            label="Stato"
            placeholder='nome azienda'
            onChange={e => this.onTextChange('nomeAzienda', e)}
            value={this.state.nomeAzienda} />

          <Input
            type ='text'
            label='P.Iva'
            placeholder='000000000000'
            onChange={e => this.onTextChange('piva', e)}
            value={this.state.piva} />

          <Input
            type ='text'
            label="Forma Giuridica"
            placeholder='impr. indiv., s.r.l., etc'
            onChange={e => this.onTextChange('formGiur', e)}
            value={this.state.formGiur} />
          <Row>
            <Col>
            <Input
              type ='text'
              label='Codice della Camera di Commercio (ATECO)'
              placeholder=''
              onChange={e => this.onTextChange('ateco', e)}
              value={this.state.ateco} />
            <a style={{float:'right'}} href="http://ateco.infocamere.it/ateq/home.action"> Non sai il codice?</a>
            </Col>
          </Row>
          <Input
            type ='text'
            label='Sito Web'
            placeholder='copia il link del sito'
            onChange={e => this.onTextChange('siteUrl', e)}
            value={this.state.siteUrl} />

          <Input
            type ='text'
            label='PEC'
            placeholder='esempio@lamiaPEC.it'
            onChange={e => this.onTextChange('pec', e)}
            value={this.state.pec} />

          </Panel>


            </Col>
            <Col>

              <Panel title='Anagrafica Azienda - Sede Amministrativa'>
              <Input
                type ='text'
                label="Nome dell'Azienda"
                placeholder='nome azienda'
                onChange={e => this.onTextChange('nomeAzienda', e)}
                value={this.state.nomeAzienda} />

              <Input
                type ='text'
                label='P.Iva'
                placeholder='000000000000'
                onChange={e => this.onTextChange('piva', e)}
                value={this.state.piva} />

              <Input
                type ='text'
                label="Forma Giuridica"
                placeholder='impr. indiv., s.r.l., etc'
                onChange={e => this.onTextChange('formGiur', e)}
                value={this.state.formGiur} />
              <Row>
                <Col>
                <Input
                  type ='text'
                  label='Codice della Camera di Commercio (ATECO)'
                  placeholder=''
                  onChange={e => this.onTextChange('ateco', e)}
                  value={this.state.ateco} />
                <a style={{float:'right'}} href="http://ateco.infocamere.it/ateq/home.action"> Non sai il codice?</a>
                </Col>
              </Row>
              <Input
                type ='text'
                label='Sito Web'
                placeholder='copia il link del sito'
                onChange={e => this.onTextChange('siteUrl', e)}
                value={this.state.siteUrl} />

              <Input
                type ='text'
                label='PEC'
                placeholder='esempio@lamiaPEC.it'
                onChange={e => this.onTextChange('pec', e)}
                value={this.state.pec} />

              </Panel>

              <div style={{float:'right'}}>
                  <Button type='primary' title="Registrati"  size='lg'/>
              </div>
                </Col>
            </Row>
        </form>
      </Page>
    );
  }
}
