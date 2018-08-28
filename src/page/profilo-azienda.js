import React from 'react';

import { Row, Col } from 'react-flex-proto';
import { GMap } from 'src/layout/components/gmap';
import { Page, Panel, Modal, Button, Breadcrumbs, Input, Select, Switch } from 'react-blur-admin';
import { Link } from 'react-router';
import _ from 'lodash';

export class ProfiloAzienda extends React.Component {

  state = {
    successModal: false,
    warningModal: false,
    dangerModal: false,
    infoModal: false,
    primaryModal: false,
    switches: [true, false],
  }

  // renderBreadcrumbs() {
  //   return (
  //     <Breadcrumbs>
  //       <Link to='/'>
  //         Home
  //       </Link>
  //         ProfiloAzienda
  //     </Breadcrumbs>
  //   );
  // }

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

            <Col>

                <Input
                  onChange={e => this.onTextChange('firstName', e)}
                  label='Nome Utente'
                  value={this.state.firstName} />


                <Input
                  onChange={e => this.onTextChange('lastName', e)}
                  label='Password'
                  value={this.state.lastName} />
              
            </Col>

        </Modal>
        </div>
    );
  }

  render() {
    return (
    //  {this.renderCustomizedModals()}
    <Page title="Profilo Privato Aziendale - Sviluppo">
    {this.renderCustomizedModals()}
      <Row>
          <Panel title="'Pagina dove vengono visualizzate le informazioni personali dell'Azienda'">
            <div className ="Nome dell'Azienda">
                Qui ci vanno le informazioni generiche (come ad esempio l'anagrafe)
                <div className="Descrizione del bando">
                Qui ci va la descriione della Gara/Bando presi dal DB
                </div>
                <div style={{float:'right'}}>
                  <Col grow={false}>

                    <Button  type='add' title="Modifica Profilo"  size='lg' onClick={e => this.onRenderModal('customizedModal')}/>
                  </Col>

                </div>
            </div>
          </Panel>
      </Row>
    </Page>
    );
  }
}
