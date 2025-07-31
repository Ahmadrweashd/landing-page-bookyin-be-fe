import React from 'react';
import { Navbar } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FiSettings } from 'react-icons/fi';
import { LuLogOut } from 'react-icons/lu';
import Logo from '../assets/images/logo.png';
import { useAppContext } from '../context/AppProvider';
import { cn, isCurrentPage, removeLocalStorage } from '../misc/helpers';
import { SESSION_TOKEN_NAME } from '../constants/global';
import LanguageBox from '../components/LanguageBox';
import { useQueryClient } from 'react-query';
import NotificationDropdown from "../components/NotificatoinDropdown";

const HeaderDash = (): React.JSX.Element => {
  const navigateTo = useNavigate();
  const { showToast } = useAppContext();
  const queryClient = useQueryClient();

  const handleLogout = async () => {
    showToast({
      message: "Successfully logged out",
      type: "SUCCESS"
    });
    removeLocalStorage(SESSION_TOKEN_NAME)
    await queryClient.invalidateQueries("validateToken");
    navigateTo('/');
  };

  return (
    <header id="header-dash" className="flex-center">
      <Navbar
        expand="md"
        className="content bg-background navbar-light w-100 h-100 px-md-5 px-2 flex-center-y justify-content-between gap-3 shadow"
      >
        <Navbar.Brand as={Link} to="/" className="m-0 flex-center-y gap-0">
          <img src={Logo} alt="Bookyin Logo" width="50" />
          <span className="fw-semibold text-main">Bookyin</span>
        </Navbar.Brand>

        <div className="flex-center gap-3">
          <LanguageBox size={25} />

          <NotificationDropdown />

          <FiSettings
            onClick={() => navigateTo("/settings")}
            fontSize={25}
            className={cn(
              isCurrentPage("/settings"),
              "active",
              null,
              "icon settings mx-auto d-block pointer transition-03"
            )}
          />

          <LuLogOut
            onClick={handleLogout}
            fontSize={25}
            className="icon leave mx-auto d-block pointer transition-03"
          />
        </div>
      </Navbar>
    </header>
  );
};

export default HeaderDash;