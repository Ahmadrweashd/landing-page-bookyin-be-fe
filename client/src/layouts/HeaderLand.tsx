import { useState } from 'react';
import { Container, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Logo from '../assets/images/logo.png';
import { cn } from '../misc/helpers';
import { LandLinks } from '../constants/global';
import { useTranslation } from 'react-i18next';
import LanguageBox from '../components/LanguageBox';
import type { Link as LinkType } from '../misc/types';
import { VscThreeBars } from 'react-icons/vsc';

const HeaderLand = (): React.JSX.Element => {
  const [isBarActive, setIsBarActive] = useState<boolean>(false);

  const [language] = useTranslation("global");


  return (
    <header id="header-land" className="flex-center">
      <Navbar
        expand="md"
        className="content w-100 h-100 px-md-5 px-2 flex-center-y justify-content-between gap-3"
      >
        <Container className='flex-center-y justify-content-between'>
          <Navbar.Brand as={Link} to="/" className="m-0 flex-center-y gap-0">
            <img src={Logo} alt="Bookyin Logo" width="40" />
            <span className="fw-semibold fs-6 text-main">Bookyin</span>
          </Navbar.Brand>

          <ul
            className={cn(
              isBarActive,
              "active",
              null,
              "links-list flex-1 ms-auto p-0 flex-center gap-md-5 text-lg-start text-center transition-03 overflow-hidden"
            )}
          >
            {LandLinks(language).map((link: LinkType) => (
              <li
                key={`header-dash-links-${link.id}`}
              >
                <a href={link.path} onClick={() => setIsBarActive(false)}>
                  <p className="mb-0 py-md-0 py-md-1 py-2 text-capitalize fw-medium fs-md pointer transition-03">{link.name}</p>
                </a>
              </li>
            ))}
          </ul>

          <div className="flex-center gap-3">
            <a href="#contact" className='contact-link btn bg-main text-white transition-03'>
              {language("global.contact")}
            </a>

            <LanguageBox size={25} />

            <VscThreeBars
              onClick={() => setIsBarActive((prev) => !prev)}
              fontSize={25}
              className={cn(
                isBarActive,
                "active",
                null,
                "icon mx-auto d-md-none d-block pointer transition-03"
              )}
            />
          </div>
        </Container>
      </Navbar>
    </header>
  );
};

export default HeaderLand;