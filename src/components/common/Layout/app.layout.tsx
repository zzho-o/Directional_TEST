import { Outlet } from 'react-router-dom';
import Footer from './app.footer';

const Layout = () => {
  return (
    <>
      <Outlet />
      {/* <Footer /> */}
    </>
  );
};

export default Layout;
