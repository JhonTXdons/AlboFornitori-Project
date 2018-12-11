import React from 'react';

import { Row, Col } from 'react-flex-proto';
import { Page, Modal, Button, Breadcrumbs, Input, Select, Switch, Table,Tabs, Tab, TableHead, TableBody, TableRow, EditableText } from 'react-blur-admin';
import { Link,browserHistory } from 'react-router';
import { Carousel, CarouselItem, CarouselCaption, Jumbotron, PanelHeading, PanelTitle, PanelBody, Panel } from 'react-bootstrap';


import _ from 'lodash';
import star from 'public/star.png';
import slide1 from 'public/1.jpg';
import slide2 from 'public/Svicom.jpg';
import slide3 from 'public/3.jpg';
export class NewHome extends React.Component {

  state = {
  }

  render() {
    return (
      <Page   title="Welcom Page Svicom Albo Fornitori - Sviluppo">
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
        <h1 style={{textAlign: "center"}}>Web App - Albo Fornitori</h1>
        <br/><br/>
        <p style={{textAlign: "center"}}>
        What does Lorem Ipsum mean?
Derived from Latin dolorem ipsum (“pain itself”), Lorem Ipsum is filler text used by publishers and graphic designers used to demonstrate graphic elements.

Let's say you're drafting the ultimate content marketing strategy. Lorem Ipsum is placeholder text that stands in for meaningful content. It allows designers to focus on getting the graphical elements such as typography, font, and page layout in place first, before you move forward with the rest of your strategy. Before publication, you replace the Lorem Ipsum text with your polished, high quality content.

Typically, Lorem Ipsum text consists of a jumbled section of De finibus bonorum et malorum, a first century, philosophical text written by Cicero. Words are added, modified, or removed to make it nonsensical.

One of the main benefits of using Lorem Ipsum is that it can be easily generated, and it takes the pressure off designers to create meaningful text. Instead, they can focus on crafting the best website possible, and add in content after a page has been designed.

Since the 1500’s, when a printer jumbled a gallery of type to create a type specimen book, Lorem Ipsum has been the industry standard for dummy text.

Today, a variety of software can create random text that resembles Lorem Ipsum. For example, Apple’s Pages and Keynote software use scrambled placeholder text. And Lorem Ipsum is featured on Google Docs, WordPress, and Microsoft Office Word.
        </p>
        </Jumbotron>
        <br/><br/><br/><br/>
      </div>
        <Row>
            <Col>
          <Panel bsStyle="blur">
            <Panel.Heading>Panel heading without a title</Panel.Heading>
            <Panel.Body>Panel content</Panel.Body>
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
