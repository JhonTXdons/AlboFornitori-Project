import React from 'react';

import { Row, Col } from 'react-flex-proto';
import { Page, Panel, Modal, Button, Breadcrumbs, Input, Select, Switch, Table,Tabs, Tab, TableHead, TableBody, TableRow,EditableText } from 'react-blur-admin';
import { Link,browserHistory } from 'react-router';


import _ from 'lodash';
//import star from 'images/star.png';
export class Welcome extends React.Component {

  state = {
  }

  render() {
    return (
      <Page title="Welcom Page Svicom Albo Fornitori - Sviluppo">
        <Row>
            <Panel title='Pagina dove vengono visualizzati gli ultimi "Bandi pubblicati"'>
              <div className ="Titolo del bando">
                <Panel >
                  <Table>
                    <TableHead>
                      <th>Titolo</th>
                      <th>Tipologia</th>
                      <th>Breve descrizione</th>
                      <th>Data di apertura</th>
                      <th>Data di scadenza</th>
                      <th>Offerta Massima</th>
                      <th>Num. Partecipanti</th>
                      <th>Banditore</th>
                      <th>Rating minimo</th>
                    </TableHead>
                    <TableBody>
                      <TableRow >
                        <td>Creazione Infrattruttura Ospedaliera</td>
                        <td>Edilizia</td>
                        <th>Costruzione nuovo impianto Ospedaliero nei pressi della riviera Anconetana</th>
                        <td>10/05/2017</td>
                        <td>18/10/2018</td>
                        <td>10.000</td>
                        <td>12</td>
                        <td>Svicom s.r.l.</td>
                        <td className='align-right'>2 </td>
                        <td><div style={{float:'right'}}>
                              <Link to="/dettaglio-bando"><Button type='info' title="Info"  size='sm'/></Link>
                        </div></td>
                      </TableRow>
                      <TableRow >
                        <td>Creazione Infrattruttura Ospedaliera</td>
                        <td>Edilizia</td>
                        <th>Costruzione nuovo impianto Ospedaliero nei pressi della riviera Anconetana</th>
                        <td>10/05/2017</td>
                        <td>18/10/2018</td>
                        <td>10.000</td>
                        <td>12</td>
                        <td>Svicom s.r.l.</td>
                        <td className='align-right'>2 </td>
                        <td><div style={{float:'right'}}>
                            <Button type='info' title="Info"  size='sm'/>
                        </div></td>
                      </TableRow>
                      <TableRow >
                        <td>Creazione Infrattruttura Ospedaliera</td>
                        <td>Edilizia</td>
                        <th>Costruzione nuovo impianto Ospedaliero nei pressi della riviera Anconetana</th>
                        <td>10/05/2017</td>
                        <td>18/10/2018</td>
                        <td>10.000</td>
                        <td>12</td>
                        <td>Svicom s.r.l.</td>
                        <td className='align-right'>2 </td>
                        <td><div style={{float:'right'}}>
                            <Button type='info' title="Info"  size='sm'/>
                        </div></td>
                      </TableRow>
                      <TableRow >
                        <td>Creazione Infrattruttura Ospedaliera</td>
                        <td>Edilizia</td>
                        <th>Costruzione nuovo impianto Ospedaliero nei pressi della riviera Anconetana</th>
                        <td>10/05/2017</td>
                        <td>18/10/2018</td>
                        <td>10.000</td>
                        <td>12</td>
                        <td>Svicom s.r.l.</td>
                        <td className='align-right'>2 </td>
                        <td><div style={{float:'right'}}>
                            <Button type='info' title="Info"  size='sm'><Link to="/dettaglio-bando"></Link></Button>
                        </div></td>
                      </TableRow>
                      <TableRow >
                        <td>Creazione Infrattruttura Ospedaliera</td>
                        <td>Edilizia</td>
                        <th>Costruzione nuovo impianto Ospedaliero nei pressi della riviera Anconetana</th>
                        <td>10/05/2017</td>
                        <td>18/10/2018</td>
                        <td>10.000</td>
                        <td>12</td>
                        <td>Svicom s.r.l.</td>
                        <td className='align-right'>2 </td>
                        <td><div style={{float:'right'}}>
                            <Button type='info' title="Info"  size='sm'/>
                        </div></td>
                      </TableRow>
                    </TableBody>
                  </Table>
                </Panel>
                  </div>
            </Panel>
        </Row>
      </Page>
    );
  }
}
