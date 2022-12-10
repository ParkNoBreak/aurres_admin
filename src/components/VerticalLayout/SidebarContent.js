import PropTypes from "prop-types";
import React, { useEffect, useRef } from "react";

// //Import Scrollbar
import SimpleBar from "simplebar-react";

// MetisMenu
import MetisMenu from "metismenujs";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";

//i18n
import { withTranslation } from "react-i18next";

const SidebarContent = props => {
  const ref = useRef();
  // Use ComponentDidMount and ComponentDidUpdate method symultaniously
  useEffect(() => {
    const pathName = props.location.pathname;

    const initMenu = () => {
      new MetisMenu("#side-menu");
      let matchingMenuItem = null;
      const ul = document.getElementById("side-menu");
      const items = ul.getElementsByTagName("a");
      for (let i = 0; i < items.length; ++i) {
        if (pathName === items[i].pathname) {
          matchingMenuItem = items[i];
          break;
        }
      }
      if (matchingMenuItem) {
        activateParentDropdown(matchingMenuItem);
      }
    };
    initMenu();
  }, [props.location.pathname]);

  useEffect(() => {
    ref.current.recalculate();
  });

  function scrollElement(item) {
    if (item) {
      const currentPosition = item.offsetTop;
      if (currentPosition > window.innerHeight) {
        ref.current.getScrollElement().scrollTop = currentPosition - 300;
      }
    }
  }

  function activateParentDropdown(item) {
    item.classList.add("active");
    const parent = item.parentElement;
    const parent2El = parent.childNodes[1];
    if (parent2El && parent2El.id !== "side-menu") {
      parent2El.classList.add("mm-show");
    }

    if (parent) {
      parent.classList.add("mm-active");
      const parent2 = parent.parentElement;

      if (parent2) {
        parent2.classList.add("mm-show"); // ul tag

        const parent3 = parent2.parentElement; // li tag

        if (parent3) {
          parent3.classList.add("mm-active"); // li
          parent3.childNodes[0].classList.add("mm-active"); //a
          const parent4 = parent3.parentElement; // ul
          if (parent4) {
            parent4.classList.add("mm-show"); // ul
            const parent5 = parent4.parentElement;
            if (parent5) {
              parent5.classList.add("mm-show"); // li
              parent5.childNodes[0].classList.add("mm-active"); // a tag
            }
          }
        }
      }
      scrollElement(item);
      return false;
    }
    scrollElement(item);
    return false;
  }

  return (
    <React.Fragment>
      <SimpleBar className="h-100" ref={ref}>
        <div id="sidebar-menu">
          <ul className="metismenu list-unstyled" id="side-menu">
            <li className="menu-title">{props.t("Dashboard")} </li>
            <li>
              <Link to="/admin/dashboard">
                <i className="bx bx-home-circle"></i>
                <span>{props.t("Dashboard")}</span>
              </Link>
            </li>

            <li className="menu-title">{props.t("Management")}</li>
            <li>
              <Link to="/admin/transactions" >
                <i className="bx bx-list-ul"></i>
                <span>{props.t("Transactions")}</span>
              </Link>
            </li>
            <li className="d-none">
              <Link to="/admin/icon" >
                <i className="bx bx-buoy"></i>
                <span>{props.t("Manage Icon")}</span>
              </Link>
            </li>
            <li>
              <Link to="/admin/commission" >
                <i className="bx bxs-wallet-alt"></i>
                <span>{props.t("Commission")}</span>
              </Link>
            </li>
            <li className="active mm-active setting-active">
              <Link to="/" className="has-arrow">
                <i className="bx bx-customize"></i>
                <span>{props.t("Setting")}</span>
              </Link>
              <ul className="sub-menu">
                <li>
                  <Link to="/admin/wallet" >
                    <i className="bx bxs-wallet-alt"></i>
                    <span>{props.t("Wallet")}</span>
                  </Link>
                </li>
                <li>
                  <Link to="/admin/change-password" >
                    <i className="bx bxs-key"></i>
                    <span>{props.t("Change Password")}</span>
                  </Link>
                </li>
              </ul>
            </li>


            {/* Extra Menu Listing  */}
            {/* <li>
              <Link to="/calendar" >
                <i className="bx bx-calendar"></i>
                <span>{props.t("Calendar")}</span>
              </Link>
            </li> */}

            {/* Extra Menu Listing  */}
          </ul>
          <Link className="logout_button testingClass" to="/logout" style={{ padding: '20px 0px', background: '#3e3b3b', color: 'white' }}>
            <i className="bx bx-power-off"></i>
            <span>{props.t("Logout")}</span>
          </Link>
        </div>
      </SimpleBar>
    </React.Fragment>
  );
};

SidebarContent.propTypes = {
  location: PropTypes.object,
  t: PropTypes.any,
};

export default withRouter(withTranslation()(SidebarContent));
