import React from 'react';

import { Row, Col } from 'react-flex-proto';
import { Page, Panel, Modal, Button, Breadcrumbs, Input, Select, Switch, Table,Tabs, Tab, TableHead, TableBody, TableRow,EditableText } from 'react-blur-admin';
import { Link,browserHistory } from 'react-router';

import axios from 'axios';

import _ from 'lodash';
import star from 'public/star.png';

const options = {
  onRowClick: function(row) {
    alert(`You click row id: ${row.ID}`);
    browserHistory.push('/fornitore-dettaglio-bando');
  },
  onRowDoubleClick: function(row) {
    alert(`You double click row id: ${row.ID}`);
  }
};

export class Welcome extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        data: [],
        dataBando: [],
    }
  }

  componentWillMount(){
    this.allBandi();
  }

   //richiamo l'endpoint con la funzione fetch()
   allBandi() {
    let self = this;
    axios.get('/api/allBandi')
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
        alert("Nn ci sono bandi attivi al momento! Verrai notificato in caso di nuovi bandi in arrivo");
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
        <Row>
            <Panel title='Bandi pubblicati'>
              <div className ="Titolo del bando">
                <Panel >
                  <div>
                    <BootstrapTable className="bordered" options={ options }  data={ dataB }>
                      <TableHeaderColumn className="black-muted-bg" dataField='ID' editable={false} width='90' isKey={true} dataSort={ true } dataAlign='center'>ID</TableHeaderColumn>
                      <TableHeaderColumn className="black-muted-bg" dataField='Nome' filter={ { type: 'TextFilter', delay: 1000 }} dataAlign='center' dataSort={ true }>NOME</TableHeaderColumn>
                      <TableHeaderColumn className="black-muted-bg" dataField='Categoria' filter={ { type: 'TextFilter', delay: 1000 }} dataAlign='center' dataSort={ true }>CATEGORIA</TableHeaderColumn>
                      <TableHeaderColumn className="black-muted-bg" dataField='Apertura' filter={ { type: 'TextFilter', delay: 1000 }} dataAlign='center' dataSort={ true }>APERTO IL</TableHeaderColumn>
                      <TableHeaderColumn className="black-muted-bg" dataField='Chiusura' filter={ { type: 'TextFilter', delay: 1000 }} dataAlign='center' dataSort={ true }>CHIUDERA IL</TableHeaderColumn>
                      <TableHeaderColumn className="black-muted-bg" dataField='OffertaMassima' filter={ { type: 'TextFilter', delay: 1000 }} dataAlign='center' dataSort={ true }>OFFERTA MAX</TableHeaderColumn>
                      <TableHeaderColumn className="black-muted-bg" dataField='MinRating' filter={ { type: 'TextFilter', delay: 1000 }} dataAlign='center' dataSort={ true }>PUNTEGGIO MIN</TableHeaderColumn>
                      <TableHeaderColumn className="black-muted-bg" dataField='Stato' filter={ { type: 'TextFilter', delay: 1000 }} dataAlign='center' dataSort={ true }>STATO</TableHeaderColumn>
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
