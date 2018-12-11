import _ from 'lodash';
import React from 'react';
import { Link } from 'react-router';

export class Sidebar extends React.Component {

  static propTypes = {
    location: React.PropTypes.shape({
      pathname: React.PropTypes.string.isRequired,
      query: React.PropTypes.object.isRequired,
    }),
  }

  state = {
    navItemsFornitore: [
      { pathname: '/welcome', label: 'Bandi disponibili', icon: 'user'},
      { pathname: '/profilo-fornitore', label: 'Profilo aziendale', icon: 'user'},
      //{ pathname: '/comunication', label: 'Comunicazioni', icon: 'user'},  
    ],
    navItemsBanditore: [
      { pathname: '/banditore-pannel', label: 'Profilo Banditore', icon: 'user'},
      //{ pathname: '/welcome', label: 'Bandi', icon: 'user'},
    ],
    navItemsAdmin: [
      { pathname: '/admin-pannel', label: 'Pannello Admin', icon: 'user'},
      //{ pathname: '/welcome', label: 'Bandi', icon: 'user'},
    ],
  }

  isSelected(navItem) {
    return this.props.location.pathname === navItem.pathname ? 'selected' : '';
  }

  renderLinks() {
    //qui gestisco il rendering del menu per il fornitore piuttosto che quello per il Banditore quando il ruolo
    //acquisito all'inizio nella autenticazione 
    if(localStorage.getItem('userRole')=='Fornitore' ){
      return _.map(this.state.navItemsFornitore, (navItemsFornitore) => {
        return (
          <li className={`al-sidebar-list-item ${this.isSelected(navItemsFornitore)}`} key={navItemsFornitore.pathname}>
            <Link className="al-sidebar-list-link" to={{ pathname: navItemsFornitore.pathname, query: navItemsFornitore.query }}>
              <i className={`fa fa-${navItemsFornitore.icon}`}></i>
              <span>{navItemsFornitore.label}</span>
            </Link>
          </li>
        );
      });
    }else{
      if(localStorage.getItem('userRole')=='Banditore'){
        return _.map(this.state.navItemsBanditore, (navItemsBanditore) => {
          return (
            <li className={`al-sidebar-list-item ${this.isSelected(navItemsBanditore)}`} key={navItemsBanditore.pathname}>
              <Link className="al-sidebar-list-link" to={{ pathname: navItemsBanditore.pathname, query: navItemsBanditore.query }}>
                <i className={`fa fa-${navItemsBanditore.icon}`}></i>
                <span>{navItemsBanditore.label}</span>
              </Link>
            </li>
          );
        });
      }else{
        if(localStorage.getItem('userRole')=='Admin'){
          return _.map(this.state.navItemsAdmin, (navItemsAdmin) => {
            return (
              <li className={`al-sidebar-list-item ${this.isSelected(navItemsAdmin)}`} key={navItemsAdmin.pathname}>
                <Link className="al-sidebar-list-link" to={{ pathname: navItemsAdmin.pathname, query: navItemsAdmin.query }}>
                  <i className={`fa fa-${navItemsAdmin.icon}`}></i>
                  <span>{navItemsAdmin.label}</span>
                </Link>
              </li>
            );
          });
        }
      }
    }
  }

  render() {
    //questo e' lo schema ibrido per la realizzazione di submenu
    // navitems selected, with-sub-menu
    // links - hover
    /*
      <ul ng-if="item.subMenu" className="al-sidebar-sublist"
                ng-className="{expanded: item.expanded, 'slide-right': item.slideRight}">
              <li ng-repeat="subitem in item.subMenu" ng-className="{'selected': subitem.selected, 'with-sub-menu': subitem.subMenu}">
                <a ng-mouseenter="hoverItem($event, item)" ng-if="subitem.subMenu" href ng-click="toggleSubMenu($event, subitem);"
                   className="al-sidebar-list-link subitem-submenu-link"><span>{{ subitem.title }}</span>
                  <b className="fa" ng-className="{'fa-angle-up': subitem.expanded, 'fa-angle-down': !subitem.expanded}"
                     ng-if="subitem.subMenu"></b>
                </a>
                <ul ng-if="subitem.subMenu" className="al-sidebar-sublist subitem-submenu-list"
                    ng-className="{expanded: subitem.expanded, 'slide-right': subitem.slideRight}">
                  <li ng-mouseenter="hoverItem($event, item)" ng-repeat="subSubitem in subitem.subMenu" ng-className="{selected: subitem.selected}">
                    <a  ng-mouseenter="hoverItem($event, item)" href="{{ subSubitem.root }}">{{
                      subSubitem.title }}</a>
                  </li>
                </ul>
                <a  ng-mouseenter="hoverItem($event, item)" target="{{subitem.blank ? '_blank' : '_self'}}" ng-if="!subitem.subMenu" href="{{ subitem.root }}">{{ subitem.title}}</a>
              </li>
            </ul>
     */
    /*
    <div className="sidebar-hover-elem" ng-style="{top: hoverElemTop + 'px', height: hoverElemHeight + 'px'}"
             ng-className="{'show-hover-elem': showHoverElem }"></div>
     */

    // ul - slimscroll="{height: '{{menuHeight}}px'}" slimscroll-watch="menuHeight"
    return (
      <aside className="al-sidebar" ng-swipe-right="menuExpand()" ng-swipe-left="menuCollapse()"
        ng-mouseleave="hoverElemTop=selectElemTop">
        <ul className="al-sidebar-list">
          {this.renderLinks()}
        </ul>
      </aside>
    );
  }
}
