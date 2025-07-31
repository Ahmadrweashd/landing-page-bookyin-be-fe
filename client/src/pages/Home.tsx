import React, { useEffect, useState } from 'react'
import Hero from '../sections/Hero'
import Services from '../sections/Services'
import Customers from '../sections/Customers'
import Packages from '../sections/Packages'
import Contact from '../sections/Contact'
import Footer from '../sections/Footer'
import HeaderLand from '../layouts/HeaderLand'
import { highlightActiveLink, setAnimation } from '../misc/helpers'
import Loading from '../components/Loading'

const Home = (): React.JSX.Element => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
    const loadTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(loadTimeout);
  }, []);

  useEffect(() => {
    const links = document.querySelectorAll<HTMLAnchorElement>(
      "#header-land nav ul li a"
    );
    const header = document.getElementById("header-land");

    const handleScroll = () => {
      setAnimation();

      if (links.length > 0)
        highlightActiveLink(Array.from(links));

      if (window.scrollY >= 200)
        header?.classList.add("scrolled");
      else
        header?.classList.remove("scrolled");
      if (window.scrollY >= 250)
        header?.classList.add("scrolled-down");
      else
        header?.classList.remove("scrolled-down");

    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isLoading]);

  if (isLoading) return <Loading />;

  return (
    <div className='overflow-x-hidden'>
      <HeaderLand />
      <Hero />
      <Services />
      <Customers />
      <Packages />
      <Contact />
      <Footer />
    </div>
  )
}

export default Home