import React from 'react';

import { Row, Col } from 'react-flex-proto';
import { Page, Panel, Modal,eventBus, Button, Breadcrumbs, Input, Select, Switch, Table,Tabs, Tab, TableHead, TableBody, TableRow,EditableText } from 'react-blur-admin';
import { Link,browserHistory } from 'react-router';

import axios from 'axios';

import CookieBanner from 'react-cookie-banner';

import _ from 'lodash';
import star from 'public/star.png';



function dateFormatter(cell, row) {
  if (typeof cell !== 'object') {
   cell = new Date(cell);
 }
  return `${('0' + cell.getDate()).slice(-2)}/${('0' + (cell.getMonth() + 1)).slice(-2)}/${cell.getFullYear()}`;
}

function priceFormatter(cell, row) {
  return `${cell} &euro;`;
}

function ratingFormatter(cell, row) {
  if(cell == 0){
    return 'LIBERO';
  }
  else{
    if(cell<=19 && cell>=1){
      return (<img src={star}/>);
    }
    else{
      if(cell<=39 && cell>=20){
        return <div><img src={star}/><img src={star}/></div>;
      }
      else{
        if(cell<=59 && cell>=40){
          return <div><img src={star}/><img src={star}/><img src={star}/></div>;
        }
        else{
          if(cell<=79 && cell>=60){
            return <div><img src={star}/><img src={star}/><img src={star}/><img src={star}/></div>;
          }
          else{
            if(cell<=100 && cell>=80){
              return <div><img src={star}/><img src={star}/><img src={star}/><img src={star}/><img src={star}/></div>;
            }
      }
    }
  }
}
}
}

export class Welcome extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        data: [],
        dataBando: [],
    }
    //options per la table
    this.options = {
      onRowClick: (row) => {
        alert(`You click row id: ${row.IdBando}`);
        let Bando = this.state.data.filter((e) => e.IdBando == row.IdBando);
        browserHistory.push({
          pathname: '/fornitore-dettaglio-bando',
          state: { rowBandoSel: Bando[0]
            }
        });
      },
      onRowDoubleClick: function(row) {
        alert(`You double click row id: ${row.ID}`);
      }
    };
  }

  componentWillMount(){
    const MailUser = localStorage.getItem('userMail');
    this.allBandi(MailUser);
  }

  //questa funzione ci permette di avere tutti i dati riguardanti il bando cliccato
  getFulldataClicked(){
    
  }

   //richiamo l'endpoint con la funzione fetch()
   allBandi(MailUser) {
    let self = this;
    axios.post('/api/allBandi', {
      Mail: MailUser,
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
            data: result.data
          });
      }else {
        eventBus.addNotification('warning',"Al momento non sono disponibili Gara per la tua Categoria di Servizi!");
      }
    }).catch(function (error) {
      console.log(error);
    });
  }

  //renderizzo le stelle per il rating
  renderRating(param){
    if(param == 0){
      return LIBERO;
    }
    else{
      if(param<=19 && param>=1){
        return <img src={star}/>;
      }
      else{
        if(param<=39 && param>=20){
          return <td><div><img src={star}/><img src={star}/></div></td>;
        }
        else{
          if(param<=59 && param>=40){
            return <td><div><img src={star}/><img src={star}/><img src={star}/></div></td>;
          }
          else{
            if(param<=79 && param>=60){
              return <td><div><img src={star}/><img src={star}/><img src={star}/><img src={star}/></div></td>;
            }
            else{
              if(param<=100 && param>=80){
                return <td><div><img src={star}/><img src={star}/><img src={star}/><img src={star}/><img src={star}/></div></td>;
              }
        }
      }
    }
  }
}
}

  render() {
    let dataB = [];
    if(this.state.data.length != 0){
       dataB = this.state.data; //provvedo ad evitare che la pagina vada in errore perche' al primo render lo state non e' settato
    }
    return (
      <Page title="Elenco bandi in corso">
        <div>
          <CookieBanner
            message="Yes, we use cookies. If you don't like it change website, we won't miss you!"
            onAccept={() => {}}
            styles={{
              banner: { backgroundColor: 'rgba(60, 60, 60, 0.8)' },
              message: { fontWeight: 400 }
            }}
            cookie="user-has-accepted-cookies" />
        </div>
        <Row>
            <Panel title='Bandi pubblicati'>
              <div className ="Titolo del bando">
                <Panel >
                  <div>
                    <BootstrapTable className="bordered" options={ this.options } hover={ true }  data={ dataB }>
                      <TableHeaderColumn className="black-muted-bg" dataField='IdBando' editable={false} width='90' isKey={true} dataSort={ true } dataAlign='center'>ID</TableHeaderColumn>
                      <TableHeaderColumn className="black-muted-bg" dataField='NomeBando' filter={ { type: 'TextFilter', delay: 1000, placeholder: 'Cerca...' }} dataAlign='center' dataSort={ true }>NOME</TableHeaderColumn>
                      <TableHeaderColumn className="black-muted-bg" dataField='NomeCat' filter={ { type: 'TextFilter', delay: 1000, placeholder: 'Cerca...' }} dataAlign='center' dataSort={ true }>CATEGORIA</TableHeaderColumn>
                      <TableHeaderColumn className="black-muted-bg" dataField='DataApertura' filter={ { type: 'TextFilter', delay: 1000, placeholder: 'Cerca...' }} dataAlign='center'dataFormat={ dateFormatter } dataSort={ true }>APERTO IL</TableHeaderColumn>
                      <TableHeaderColumn className="black-muted-bg" dataField='DataChiusura' filter={ { type: 'TextFilter', delay: 1000, placeholder: 'Cerca...' }} dataAlign='center' dataFormat={ dateFormatter } dataSort={ true }>CHIUDERA IL</TableHeaderColumn>
                      <TableHeaderColumn className="black-muted-bg" dataField='SogliaMax' filter={ { type: 'TextFilter', delay: 1000, placeholder: 'Cerca...' }} dataAlign='center' dataSort={ true }>OFFERTA MAX</TableHeaderColumn>
                      <TableHeaderColumn className="black-muted-bg" dataField='MinRating' filter={ { type: 'TextFilter', delay: 1000, placeholder: 'Cerca...' }} dataAlign='center' dataFormat ={ratingFormatter} dataSort={ true }>PUNTEGGIO MIN</TableHeaderColumn>
                      <TableHeaderColumn className="black-muted-bg" dataField='Stato' filter={ { type: 'TextFilter', delay: 1000, placeholder: 'Cerca...' }} dataAlign='center' dataSort={ true }>STATO</TableHeaderColumn>
                    </BootstrapTable>
                  </div>
                </Panel>
                  </div>
            </Panel>
        </Row>
      </Page>
    );
  }
}
