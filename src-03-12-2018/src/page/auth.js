import React from 'react';
import _ from 'lodash';
import 'src/css/auth-lock.css';

import { Page, Panel, Input,Button, Select, Textarea, Switch, Breadcrumbs, EditableSelect } from 'react-blur-admin';
import {Form} from 'react-bootstrap';
import { Link,browserHistory,withRouter } from 'react-router';
import axios from 'axios';

//importo libreria per la gestione degli eventi
import eventBus from 'src/lib/event-bus';

import {Row, Col} from 'react-flex-proto';

export class Auth extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        username: '',
        password: '',
        isLoaded: false,
        items: '',
        role: '',
        percentage:0,
    }
  }



  componentDidMount() {

  }

  componentWillUnmount() {

  }

  renderBreadcrumbs() {
    return (
      <Breadcrumbs>
        <Link to='/welcome'>
          Home
        </Link>
          Progress Bars
      </Breadcrumbs>
    );
  }

  //richiamo l'endpoint con la funzione fetch()
  authSvDB(e) {
    let self = this;
    e.preventDefault();
    axios.post('/api/login', {
      mail: this.state.username,
      pass: this.state.password
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
          localStorage.setItem('userToken', NaN); //resettiamo
          localStorage.setItem('userToken', result.data[0].Mail + result.data[0].ID); //setto il token di accesso per l'utente ottenendolo dalla somma di id e mail
          localStorage.setItem('userMail', result.data[0].Mail); //salvo anche l'email corrente dell'utente in modo che possa utilizzarla nelle varie query
          console.log(localStorage.getItem('userToken'));          //controllo che abbia settato il token
          if(result.data[0].Ruolo == 'Banditore'){
            localStorage.setItem('userRole', result.data[0].Ruolo); //setto il token del ruolo dell'utente
          }else{
            if(result.data[0].Ruolo == 'Supervisore'){
              localStorage.setItem('userRole', result.data[0].Ruolo); //setto il token del ruolo dell'utente
            }else{
              localStorage.setItem('userRole', 'Fornitore'); //setto il token del ruolo dell'utente
            }
          }
          window.location.reload()
      }else {
        alert("Nome utente o password errati");
      }
    }).catch(function (error) {
      console.log(error);
    });
  }

  //faccio un push della directory per reinderizzare
  redirRegister(){
    localStorage.setItem('userToken', 'NaN');
    localStorage.setItem('userRole', 'NaN');
    browserHistory.push('register');
  }

  handleUsername(event) {
    this.setState({username: event.target.value});
  }

  handlePassword(event) {
    this.setState({password: event.target.value});
  }

  render() {
    return (
        <div className="lock" >
          <form>
          <Row>
            <Col>
              <div className="authPanel">
              <Panel title="Accedi o Registrati!">
                <Row height="wrap-component">
                  <Input
                    onChange={event => this.handleUsername(event)}
                    hasFeedbackIcon={false}
                    label='Nome Utente o E-mail'
                    value={this.state.username} />
                </Row>
                <Row>
                  <Input
                    type='password'
                    onChange={event => this.handlePassword(event)}
                    label='Password'
                    hasFeedbackIcon={false}
                    value={this.state.password} />
                </Row>
                <Row>
                  <Input
                    type='checkbox'
                    onValidate={e => true}
                    label='Ricordami'
                    onChange={e => { this.handleIsItChecked() }} />
                </Row>
                <Row>
                  <Link onClick={() => {this.redirRegister()}}>Non sei Registrato?Clicca qui</Link>
                </Row>
                    <div style={{float:'right'}}>
                    <Button type='success' size='md' title='Login' onClick={e => {this.authSvDB(e)}}/>
                    </div>
              </Panel>
              </div>
            </Col>
          </Row>
        </form>
        </div>
    );
  }
}
