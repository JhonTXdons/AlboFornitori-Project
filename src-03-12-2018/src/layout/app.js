import React from 'react';
import { withRouter,router,StaticRouter,browserHistory } from 'react-router';

// Components
import { Sidebar, PageTop } from 'src/layout/components';
import { Notifications } from 'react-blur-admin';

// Lib
import eventBus from 'src/lib/event-bus';

class AppLayout extends React.Component {

  state = {
    idToken: null, // Token indicating user is logged in
    user: null, // Full user for that logged in user, if exists
  }

  //la navigazione attraverso le pagine va fatta esclusivamente da cui

  componentWillMount() {
    if(localStorage.getItem('userToken') == 'NaN'){
      //console.log(localStorage.getItem('userToken'));
      if(this.props.location.pathname != '/'){
        this.redirectToLogin();
      }
    }else{
      if(this.props.location.pathname == '/auth'){
        //return this.setUser();
        if(localStorage.getItem('userRole') == "Fornitore"){
          return browserHistory.push('/profilo-fornitore');                                // reindirizzo alla home page
        }
        if(localStorage.getItem('userRole') == "Banditore"){
          return browserHistory.push('/banditore-pannel');                                // reindirizzo alla home page
        }
        if(localStorage.getItem('userRole') == "Supervisore"){
          return browserHistory.push('/admin-pannel');                                // reindirizzo alla home page
        }
      }
    }
    //listener per gli eventi che si possono verificare nell'applicazio
    eventBus.on('logout', () => this.onLogout());
    eventBus.on('toLogin', () => this.redirectToLogin());
  }

  componentDidMount() {
    if(localStorage.getItem('userToken') == 'NaN'){
      //console.log(localStorage.getItem('userToken'));
      if(this.props.location.pathname != '/'){
        this.redirectToLogin();
      }
    }else{
      //return this.setUser();
      //vedo se provengo dal login e in caso positivo reindirizzo alle corrispettive pagine after login
      if(this.props.location.pathname == '/auth'){
        if(localStorage.getItem('userRole') == "Fornitore"){
          return browserHistory.push('/profilo-fornitore');                                // reindirizzo alla home page
        }
        if(localStorage.getItem('userRole') == "Banditore"){
          return browserHistory.push('/banditore-pannel');                                // reindirizzo alla home page
        }
        if(localStorage.getItem('userRole') == "Supervisore"){
          return browserHistory.push('/admin-pannel');                                // reindirizzo alla home page
        }
      }
    }
  }

  onLogout() {
    localStorage.setItem('userToken','NaN');
    localStorage.setItem('userRole','NaN');
    this.setState({ idToken: null, user: null });
    this.redirectToLogin();
  }

  redirectToLogin() {
    browserHistory.push('/auth');
  }



  setUser() {
    if (! this.state.idToken) {
      return null;
    }

    return this.lock.getProfile(this.state.idToken, (err, user) => {
      return err ? this.onLogout() : this.setState({user});
    });
  }

  getIdToken() {
    let idToken = localStorage.getItem('userToken');
    const authHash = this.lock.parseHash(window.location.hash);
    if (!idToken && authHash) {
      if (authHash.id_token) {
        idToken = authHash.id_token;
        localStorage.setItem('userToken', authHash.id_token);
      }
      if (authHash.error) {
        return this.onLogout();
      }
    }
    return idToken;
  }

  render() {
    // @todo main - menu-collapsed
    return (
      <div>
        <main className=''>
          <Sidebar {...this.props} />
          <PageTop location={this.props.location} user={this.state.user} />

          <div className="al-main">
            <div className="al-content">
              {React.cloneElement(this.props.children, _.assign({}, this.props, { user: this.state.user }))}
            </div>
          </div>
          <back-top></back-top>
        </main>
        <Notifications />
      </div>
    );
  }
}

export default withRouter(AppLayout);
