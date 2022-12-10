import React, { useState } from "react";
import PropTypes from 'prop-types';

import { connect } from "react-redux";

import { Link } from "react-router-dom";

// Redux Store
import { showRightSidebarAction, toggleLeftmenu } from "../../store/actions";
// reactstrap
import { Row, Col, Dropdown, DropdownToggle, DropdownMenu, Collapse } from "reactstrap";

// Import menuDropdown
import LanguageDropdown from "../CommonForBoth/TopbarDropdown/LanguageDropdown";
import NotificationDropdown from "../CommonForBoth/TopbarDropdown/NotificationDropdown";
import ProfileMenu from "../CommonForBoth/TopbarDropdown/ProfileMenu";

import megamenuImg from "../../assets/images/megamenu-img.png";
import logo from "../../assets/images/aureus_3_3.png";// "../../assets/images/logo.svg";
import logoLight from "../../assets/images/aureus_3_3.png";// "../../assets/images/logo-light.png";
import logoLightSvg from "../../assets/images/aureus_3_3.png";// "../../assets/images/logo-light.svg";
import logoDark from "../../assets/images/aureus_3_5.png";// "../../assets/images/logo-dark.png";

// import images
import github from "../../assets/images/brands/github.png";
import bitbucket from "../../assets/images/brands/bitbucket.png";
import dribbble from "../../assets/images/brands/dribbble.png";
import dropbox from "../../assets/images/brands/dropbox.png";
import mail_chimp from "../../assets/images/brands/mail_chimp.png";
import slack from "../../assets/images/brands/slack.png";

//i18n
import { withTranslation } from "react-i18next";

const Header = props => {
  const [menu, setMenu] = useState(false);
  const [isSearch, setSearch] = useState(false);
  const [socialDrp, setsocialDrp] = useState(false);

  function toggleFullscreen() {
    if (
      !document.fullscreenElement &&
      /* alternative standard method */ !document.mozFullScreenElement &&
      !document.webkitFullscreenElement
    ) {
      // current working methods
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
      } else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen(
          Element.ALLOW_KEYBOARD_INPUT
        );
      }
    } else {
      if (document.cancelFullScreen) {
        document.cancelFullScreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
      }
    }
  }
  return (
    <React.Fragment>
      <header id="page-topbar">
        <div className="navbar-header">
          <div className="d-flex">
            <div className="navbar-brand-box">
              <Link to="/" className="logo logo-dark">
                <span className="logo-sm">
                  <img src={logo} alt="" height="22" />
                </span>
                <span className="logo-lg">
                  <img src={logoDark} alt="" height="17" />
                </span>
              </Link>

              <Link to="/" className="logo logo-light">
                <span className="logo-sm">
                  <img src={logoLightSvg} alt="" height="22" />
                </span>
                <span className="logo-lg">
                  <img src={logoLight} alt="" height="19" />
                </span>
              </Link>
            </div>

            <button
              type="button"
              className="btn btn-sm px-3 font-size-16 d-lg-none header-item"
              data-toggle="collapse"
              onClick={() => {
                props.toggleLeftmenu(!props.leftMenu);
              }}
              data-target="#topnav-menu-content"
            >
              <i className="fa fa-fw fa-bars" />
            </button>

          </div>

          <div className="d-flex text-light">

            <nav
              className="navbar navbar-light navbar-expand-lg topnav-menu text-light"
              id="navigation"
            >
              <Collapse
                className="navbar-collapse text-light"
                id="topnav-menu-content"
              >
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <Link
                      className="nav-link text-light"
                      to="/admin/dashboard"
                    >
                      <i className="bx bx-home-circle me-2"></i>
                      {props.t("Dashboard")}
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link
                      className="nav-link text-light"
                      to="/admin/transactions"
                    >
                      <i className="bx bx-list-ul me-2"></i>
                      {props.t("Transactions")}
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link
                      className="nav-link text-light"
                      to="/admin/icon"
                    >
                      <i className="bx bx-buoy me-2"></i>
                      {props.t("Manage Icon")}
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link
                      className="nav-link text-light"
                      to="/admin/commission"
                    >
                      <i className="bx bxs-wallet-alt me-2"></i>
                      {props.t("Commission")}
                    </Link>
                  </li>

                  {/* <li className="nav-item">
                    <Link
                      className="nav-link text-light"
                      to="/admin/change-password"
                    >
                      <i className="bx bxs-key me-2"></i>
                      {props.t("Change Password")}
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/logout" className="nav-link text-light">
                      <i className="bx bx-power-off font-size-16 align-middle me-1 text-danger" />
                      <span>{props.t("Logout")}</span>
                    </Link>
                  </li> */}
                </ul>
              </Collapse>
            <ProfileMenu />
            </nav>
            {/* <div className="dropdown d-none d-lg-inline-block ms-1 text-light">
              <Link to="/logout" className="dropdown-item">
                <i className="bx bx-power-off font-size-16 align-middle me-1 text-danger" />
                <span>{props.t("Logout")}</span>
              </Link>
            </div> */}
          </div>
        </div>
      </header>
    </React.Fragment>
  );
};

Header.propTypes = {
  leftMenu: PropTypes.any,
  showRightSidebar: PropTypes.any,
  showRightSidebarAction: PropTypes.func,
  t: PropTypes.any,
  toggleLeftmenu: PropTypes.func
};

const mapStatetoProps = state => {
  const { layoutType, showRightSidebar, leftMenu } = state.Layout;
  return { layoutType, showRightSidebar, leftMenu };
};

export default connect(mapStatetoProps, {
  showRightSidebarAction,
  toggleLeftmenu,
})(withTranslation()(Header));
