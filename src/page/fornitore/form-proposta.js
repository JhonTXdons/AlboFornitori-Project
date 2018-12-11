import React from 'react';

import { Row, Col } from 'react-flex-proto';
import { Page, Panel, Modal, Button, Breadcrumbs, Input, Select, Switch, Table,Tabs, Tab, TableHead, TableBody, TableRow,EditableText } from 'react-blur-admin';
import { Link,browserHistory } from 'react-router';


import _ from 'lodash';
import star from 'public/star.png';

export class FormProposta extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      switches: _.fill(Array(5), true),
      editableSelect3: 1,
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
      <Page title='Pagina di Partecipazione al Bando'>
      <form>
        
            <div style={{float:'right'}}>
                <Button type='primary' title="Invia Proposta"  size='lg'/>
            </div>
        </form>
      </Page>
    );
  }
}
