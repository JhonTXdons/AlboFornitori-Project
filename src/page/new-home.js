import React from 'react';

import { Row, Col } from 'react-flex-proto';
import { Page, Modal, Button, Breadcrumbs, Input, Select, Switch, Table,Tabs, Tab, TableHead, TableBody, TableRow, EditableText } from 'react-blur-admin';
import { Link,browserHistory } from 'react-router';
import { Carousel, CarouselItem, CarouselCaption, Jumbotron, PanelHeading, PanelTitle, PanelBody, Panel } from 'react-bootstrap';

import _ from 'lodash';
import CookieBanner from 'react-cookie-banner';
import star from 'public/star.png';
import slide1 from 'public/1.jpg';
import slide2 from 'public/Svicom.jpg';
import slide3 from 'public/3.jpg';
export class NewHome extends React.Component {

  state = {
  }

  render() {
    return (
      <Page>
        <div>
          <CookieBanner
            message="Questo sito fa uso di cookie per migliorare l’esperienza di navigazione degli utenti e per raccogliere informazioni sull’utilizzo del sito stesso. Può conoscere i dettagli consultando la nostra privacy policy qui. Proseguendo nella navigazione si accetta l’uso dei cookie; in caso contrario è possibile abbandonare il sito."
            onAccept={() => {}}
            styles={{
              banner: { backgroundColor: 'rgba(255, 255, 255, 0.15)', height: 'auto' },
              message: { fontWeight: 400 }
            }}
            cookie="user-has-accepted-cookies" />
        </div>
      <div style={{ paddingBottom: 40, width: 990, height: 'auto', margin: 'auto' }}>
      <Row>
        <Col>
        <Carousel>
          <Carousel.Item>
            <img width={990} height={400} alt="900x500" src={slide3} />
              <Carousel.Caption>
                <h3>First slide label</h3>
                <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img width={990} height={400} alt="900x500" src={slide3} />
              <Carousel.Caption>
                <h3>Second slide label</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img width={990} height={400} alt="900x500" src={slide3} />
              <Carousel.Caption>
                <h3>Third slide label</h3>
                <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
              </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
        </Col>
      </Row>
      </div>
      <div>
      <Jumbotron componentClass="blur">
        <h1 style={{textAlign: "center"}}>Albo Fornitori</h1>
        <br/><br/>
        <p style={{textAlign: "center"}}>
        Questo sito è stato creato al fine di poter avere una piattaforma per la gestione dei Fornitori con
        un sistema di Gare, Proposte e Rating(Valutazione)
        </p>
        </Jumbotron>
        <br/><br/><br/><br/>
      </div>
        <Row>
            <Col>
          <Panel  bsStyle="blur">
            <Panel.Heading>
            <Panel.Title componentClass="h3">SEI UN FORNITORE?</Panel.Title>
            </Panel.Heading>
            <Panel.Body>Se sei un Fornitore e vuoi entrare a far parte della piattaforma "Albo Fornitori", clicca sul tasto di Login!
                        Altrimenti segui la procedura di Registrazione!
            </Panel.Body>
          </Panel>
          </Col>
          <Col>
          <Panel bsStyle="blur">
            <Panel.Heading>
              <Panel.Title componentClass="h3">Panel heading with a title</Panel.Title>
            </Panel.Heading>
            <Panel.Body>Panel content</Panel.Body>
          </Panel>
          </Col>
        </Row>
      </Page>
    );
  }
}
