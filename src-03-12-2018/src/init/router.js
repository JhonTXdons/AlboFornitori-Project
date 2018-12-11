import React from 'react';
import { Router, Route, Redirect, browserHistory } from 'react-router';

import AppLayout from 'src/layout/app';
import Login from 'src/layout/login';


/* Demos */

import { ProgressBars } from 'src/page/demo/progress-bars';
import { TableDemo } from 'src/page/demo/table-demo';
import { ButtonDemo } from 'src/page/demo/button-demo';
import { ModalDemo } from 'src/page/demo/modal-demo';
import { TabsDemo } from 'src/page/demo/tabs-demo';
import { InputDemo } from 'src/page/demo/input-demo';
import { NotificationsDemo } from 'src/page/demo/notifications-demo';
import { Auth } from 'src/page/auth';
import { Register } from 'src/page/register';

//Fornitore
import { FornitoreDettaglioBando } from 'src/page/fornitore/fornitore-dettaglio-bando';
import { FormProposta } from 'src/page/fornitore/form-proposta';
import { Welcome } from 'src/page/fornitore/welcome';
import { ProfiloAzienda } from 'src/page/fornitore/profilo-fornitore';

//Admin
import { AdminPannel } from 'src/page/admin/admin-pannel';

//Banditore
import { BanditorePannel } from 'src/page/banditore/banditore-pannel';
import { BanditoreValutazioneFornitore } from 'src/page/banditore/banditore-valutazione-fornitore';
import { BanditoreIstruttoria } from 'src/page/banditore/banditore-istruttoria';
import { BanditoreDettaglioBando } from 'src/page/banditore/banditore-dettaglio-bando';
import { NewHome } from 'src/page/new-home';

/* End Demos */

import { NotFound } from 'src/page/not-found';

// Redirect is got GH pages and can be deleted for forked projects
const redirect = <Redirect from="/react-webpack-skeleton" to="/" />;

export const AppRouter = (
  <Router history={browserHistory}>
    {redirect}
    <Route path='/login' component={Login} />

    <Route component={AppLayout}>
      <Route path='/' component={NewHome} />
      <Route path='/auth' component={Auth} />

      //Fornitore
      <Route path='/profilo-fornitore' component={ProfiloAzienda} />
      <Route path='/register' component={Register} />
      <Route path='/fornitore-dettaglio-bando' component={FornitoreDettaglioBando} />
      <Route path='/form-proposta' component={FormProposta} />
      <Route path='/welcome' component={Welcome} />

      //Admin
      <Route path='/admin-pannel' component={AdminPannel} />

      //Banditore
      <Route path='/banditore-pannel' component={BanditorePannel} />
      <Route path='/banditore-valutazione-fornitore' component={BanditoreValutazioneFornitore} />
      <Route path='/banditore-istruttoria' component={BanditoreIstruttoria} />
      <Route path='/banditore-dettaglio-bando' component={BanditoreDettaglioBando} />

      <Route path='/button-demo' component={ButtonDemo} />
      <Route path="*" component={NotFound}/>
    </Route>
  </Router>
);
