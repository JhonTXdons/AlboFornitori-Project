import React from 'react';

import { Page, Panel, Breadcrumbs } from 'react-blur-admin';
import { Link } from 'react-router';

import _ from 'lodash';

export class NotFound extends React.Component {

  renderBreadcrumbs() {
    return (
      <Breadcrumbs>
        <Link to='/new-home'>
          Home
        </Link>
          Ti sei perso?!
      </Breadcrumbs>
    );
  }

  render() {
    return (
      <Page actionBar={this.renderBreadcrumbs()} title='404 Not Found'>
        <Panel title='Page Not Found'>
          Ahia, c'è un problema, la pagina che tu stai cercando credo non esita :D
        </Panel>
      </Page>
    );
  }
}
