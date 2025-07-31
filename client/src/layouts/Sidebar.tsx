import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { IoMdSettings } from "react-icons/io";
import { FaUserFriends, FaBoxOpen, FaClipboardList, FaTools } from 'react-icons/fa';
import { Nav } from 'react-bootstrap';
import { cn, isCurrentPage } from '../misc/helpers';
import logo from "../assets/images/logo.png";
import { useTranslation } from 'react-i18next';

const Sidebar = (): React.JSX.Element => {
  const [isSidebarVisible, setIsSidebarVisible] = useState<boolean>(false);
  const [language] = useTranslation("global");

  const sidebarButtonClickingHandling = () => {
    setIsSidebarVisible(prev => !prev);
  };

  return (
    <aside id='manager-sidebar' className={cn(
      isSidebarVisible,
      "visible",
      null,
      "sidebar bg-background transition-03 d-flex flex-column shadow")}
    >
      <div className="content py-5 flex-center-y flex-column flex-1 position-relative">
        <div className="mb-4">
          <img src={logo} alt="logo" width={125} height={125} />
        </div>

        <Nav className='flex-column'>

          <Nav.Link
            as={NavLink}
            to="/dash-customers"
            className={cn(
              isCurrentPage("/dash-customers"),
              "bg-main text-white",
              "text-black text-main-hover",
              "py-2 d-flex flex-center-y gap-4 fw-semibold fs-6 transition-03 bg-hover"
            )}
            onClick={sidebarButtonClickingHandling}
          >
            <FaUserFriends />
            <span>{language("global.customers")}</span>
          </Nav.Link>

          <Nav.Link
            as={NavLink}
            to="/dash-packages"
            className={cn(
              isCurrentPage("/dash-packages"),
              "bg-main text-white",
              "text-black text-main-hover",
              "py-2 d-flex flex-center-y gap-4 fw-semibold fs-6 transition-03 bg-hover"
            )}
            onClick={sidebarButtonClickingHandling}
          >
            <FaBoxOpen />
            <span>{language("global.packages")}</span>
          </Nav.Link>

          <Nav.Link
            as={NavLink}
            to="/dash-requests"
            className={cn(
              isCurrentPage("/dash-requests"),
              "bg-main text-white",
              "text-black text-main-hover",
              "py-2 d-flex flex-center-y gap-4 fw-semibold fs-6 transition-03 bg-hover"
            )}
            onClick={sidebarButtonClickingHandling}
          >
            <FaClipboardList />
            <span>{language("global.requests")}</span>
          </Nav.Link>

          <Nav.Link
            as={NavLink}
            to="/dash-services"
            className={cn(
              isCurrentPage("/dash-services"),
              "bg-main text-white",
              "text-black text-main-hover",
              "py-2 d-flex flex-center-y gap-4 fw-semibold fs-6 transition-03 bg-hover"
            )}
            onClick={sidebarButtonClickingHandling}
          >
            <FaTools />
            <span>{language("global.services")}</span>
          </Nav.Link>

        </Nav>

        <div className={cn(
          isSidebarVisible,
          "toggled text-main",
          null,
          "toggle-button bg-white flex-center d-flex d-lg-none rounded-end position-absolute"
        )}>
          <IoMdSettings
            onClick={sidebarButtonClickingHandling}
            className='icon pointer transition-03 text-main-hover'
            size={20}
          />
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
