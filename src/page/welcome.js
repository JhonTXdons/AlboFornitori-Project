import React from 'react';

import { Row, Col } from 'react-flex-proto';
import { GMap } from 'src/layout/components/gmap';
import { Page, Panel, Modal, Button, Breadcrumbs, Input, Select, Switch } from 'react-blur-admin';
import { Link } from 'react-router';
import _ from 'lodash';

export class Welcome extends React.Component {

  state = {
    successModal: false,
    warningModal: false,
    dangerModal: false,
    infoModal: false,
    primaryModal: false,
    switches: [true, false],
  }

  onCloseModal(modalName) {
    this.setState({ [modalName]: false });
  }

  onRenderModal(modalName) {
    this.setState({ [modalName]: true });
  }

  onSwitchChange(index) {
    let switches = _.assign({}, this.state.switches);
    switches[index] = !switches[index];
    this.setState({ switches });
  }

  renderCustomizedModals() {
    return (
      <div>
        <Modal type='info' buttonText='Login' title='Login/Registrati' isOpen={this.state.customizedModal} onClose={e => this.onCloseModal('customizedModal')}>
          <Row>
            <Col align='center'>
              Qui ci va la form di Login e/o di Registrazione
            </Col>
          </Row>
          <Row>
            <Col>
              <div className='col-md-6'>
                <Input
                  onChange={e => this.onTextChange('firstName', e)}
                  label='Nome Utente'
                  value={this.state.firstName} />
              </div>
              <div className='col-md-6'>
                <Input
                  onChange={e => this.onTextChange('lastName', e)}
                  label='Password'
                  value={this.state.lastName} />
              </div>
            </Col>
          </Row>
        </Modal>
        </div>
    );
  }

  render() {
    return (

      <Page title="Welcom Page Svicom Albo Fornitori - Sviluppo">
      {this.renderCustomizedModals()}
        <Row>
            <Panel title='Pagina dove vengono visualizzati gli ultimi "Bandi pubblicati"'>
              <div className ="Titolo del bando">
                  <h1>Qui ci va il titolo della Gara/bando preso dal DB</h1>
                  <div className="Descrizione del bando">
                  Qui ci va la descriione della Gara/Bando presi dal DB
                  </div>
                  <div style={{float:'right'}}>
                    <Col grow={false}>

                      <Button  type='add' title="Partecipa"  size='lg' onClick={e => this.onRenderModal('customizedModal')}/>
                    </Col>

                  </div>
              </div>
            </Panel>
        </Row>
      </Page>
    );
  }
}
