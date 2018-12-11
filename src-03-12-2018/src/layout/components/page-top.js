import React from 'react';
import { Link, browserHistory } from 'react-router';
import { Headroom } from 'react-headroom';
import moment from 'moment';
import { noop } from 'lodash';
import Person from 'react-blur-admin/dist/assets/img/person.svg';

import logo from 'public/svicomlogo1.png';

import {SearchBar} from 'src/layout/components/search-bar';

// Lib
import eventBus from 'src/lib/event-bus';
import {MessagesAlert, MessagesAlertContainer,Button, NotificationsAlert, NotificationAlert} from 'react-blur-admin';
import {Row, Col} from 'react-flex-proto';

export class PageTop extends React.Component {

  static propTypes = {
    user: React.PropTypes.object,
    location: React.PropTypes.shape({
      pathname: React.PropTypes.string.isRequired,
      query: React.PropTypes.object.isRequired,
    }),
  }

  constructor(props) {
    super(props);
    this.renderLoginButt = this.renderLoginButt.bind(this);
    this.renderUserSection = this.renderUserSection.bind(this);
    this.state = {
      notifications: [{
        user: {
          name: 'Ashley',
          picture: Person,
        },
        subject: 'This is a notification alert',
        timeStamp: '02/13/95 9:00',
        relativeTime: moment('02/13/95').fromNow(),
      },
      {
        user: {
          name: 'Nick',
          picture: Person,
        },
        subject: 'This is a notification alert',
        timeStamp: '07/13/16 12:00',
        relativeTime: moment('07/13/16 12:00').fromNow(),
      },
      {
        user: {
          name: 'Matt',
          picture: Person,
        },
        subject: 'This is a notification alert',
        timeStamp: '04/20/15 9:00',
        relativeTime: moment('04/20/15 9:00').fromNow(),
      },
      {
        user: {
          name: 'Jon',
          picture: Person,
        },
        subject: 'This is a notification alert',
        timeStamp: '07/19/16 8:00',
        relativeTime: moment('07/19/16 8:00').fromNow(),
      },
      {
        user: {
          name: 'Jacob',
          picture: Person,
        },
        subject: 'This is a notification alert',
        timeStamp: '05/23/16 2:00',
        relativeTime: moment('05/23/16 2:00').fromNow(),
      },
      {
        user: {
          name: 'Jason',
          picture: Person,
        },
        subject: 'This is a notification alert',
        timeStamp: '05/01/16 4:00',
        relativeTime: moment('05/01/16 4:00').fromNow(),
      }],
      messages: [{
        user: {
          name: 'Ashley',
          picture: Person,
        },
        subject: 'This is a message alert',
        timeStamp: '02/13/95 9:00',
        relativeTime: moment('02/13/16').fromNow(),
      },
      {
        user: {
          name: 'Nick',
          picture: Person,
        },
        subject: 'This is a message alert',
        timeStamp: '07/13/16 12:00',
        relativeTime: moment('07/13/16 12:00').fromNow(),
      }],
    };
    
  }

  state = {
    isMenuOpen: false,
    appName: process.env.APP_NAME,
  }

  componentWillMount() {

  }

  onToggleMenu() {
    this.setState({ isMenuOpen: ! this.state.isMenuOpen });

  }

  onLogout() {
    localStorage.setItem('userToken','NaN');
    localStorage.setItem('userRole','NaN');

  }

  redirectToLogin() {
    localStorage.setItem('userToken','NaN');
    localStorage.setItem('userRole','NaN');
    browserHistory.push('/auth');
  }

  renderLogo() {
    return (
    <img style={{float:'left', height: 66, paddingBottom: 10}} src={logo} alt="logo" />
    //<Link to={{ pathname: '/welcome' }} className="al-logo clearfix"/>
    );
  }

  renderHamburgerMenu() {
    return null;

    // @todo
    // return (
    //   <a href className="collapse-menu-link ion-navicon" ng-click="isMenuCollapsed=!isMenuCollapsed"></a>
    // );
  }

  renderSearch() {
    return (
      <div className="search">
        <SearchBar />
      </div>
    );
  }

  renderMessages() {
    let message = _.assign({}, this.state.messages);
    return _.map(message, (messages, index) => {
      return (
        <MessagesAlert {...messages} key={index}/>
      );
    });
  }

  renderNotifications() {
    let notifications = _.assign({}, this.state.notifications);
    return _.map(notifications, (notification, index) => {
      return (
        <NotificationAlert {...notification} key={index}/>
      );
    });
  }

 renderLoginButt(){
   //restituisco il bottone per il login all'interfaccia
  return(
    <div className="user-profile clearfix">
      <a href={this.props.location.pathname} onClick={e => this.redirectToLogin(e)}>
        <Button type="success" name="Login" size="lg" title="Login"/>
      </a>
    </div>
  );
 }

  renderUserSection() {
    return (
      <div className="user-profile clearfix">
        <div className={`al-user-profile dropdown ${this.state.isMenuOpen ? 'open' : ''}`}>
          <a className="profile-toggle-link dropdown-toggle" onClick={this.onToggleMenu.bind(this)}>
            <img src={this.props.user && this.props.user.picture ? this.props.user.picture : Person}/>
          </a>
          <ul className="top-dropdown-menu profile-dropdown dropdown-menu">
            <li><i className="dropdown-arr"></i></li>
            <li><Link to="/profilo-azienda"><i className="fa fa-user"></i>Profilo Azienda</Link></li>
            <li><Link to="/'"><i className="fa fa-cog"></i>Impostazioni</Link></li>
            <li>
              <a href={this.props.location.pathname} className="signout" onClick={e => this.onLogout(e)}>
                <i className="fa fa-power-off"></i>Logout
              </a>
            </li>
          </ul>
        </div>
        <Row>
          <Col padding='5px 2px'>
            <MessagesAlertContainer mailCount={this.state.messages.length} markAllAsReadOnClick={noop} allMessagesOnClick={noop} settingsOnClick={noop} >
              {this.renderMessages()}
            </MessagesAlertContainer>
            <NotificationsAlert
              notificationCount={this.state.notifications.length}
              markAllAsReadOnClick={noop}
              allNotificationsOnClick={noop}
              settingsOnClick={noop} >
                {this.renderNotifications()}
            </NotificationsAlert>
          </Col>
        </Row>
      </div>
    );
  }

  render() {
    // dropdown - .open
    // @todo msg-center
    // onClick startSearch
    // import message center
    let usersection = null;
    if (localStorage.getItem('userToken') == 'NaN') {
      usersection = this.renderLoginButt();
    }else{
      usersection = this.renderUserSection();
    }
    return (

      <div className="page-top clearfix" scroll-position="scrolled" max-height="50">

        {this.renderLogo()}
        {/*this.renderHamburgerMenu()*/}
        {/*{this.renderSearch()}*/}
        {/* Faccio il render del centro notifiche solo se l'utente e' loggato altrimenti do la possibilita' di accedere*/}
        {usersection}
        
      </div>

    );
  }
}
