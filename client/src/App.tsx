import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useAppContext } from "./context/AppProvider";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import Customers from "./pages/customers/Customers";
import Login from "./pages/Login";
import AddCustomer from "./pages/customers/AddCustomer";
import EditCustomer from "./pages/customers/EditCustomer";
import Packages from "./pages/packages/Packages";
import AddPackage from "./pages/packages/AddPackages";
import EditPackage from "./pages/packages/EditPackage";
import Services from "./pages/services/Services";
import AddService from "./pages/services/AddServices";
import EditService from "./pages/services/EditService";
import EditAccountSettings from "./pages/Settings";
import PageWrapper from "./layouts/PageWrapper";
import Subscribe from "./pages/packages/Subscribe";
import Requests from "./pages/Requests";
import ActivePackages from "./pages/ActivePackages";
import Notifications from "./pages/Notifications";

function App() {
  const { isLoggedIn } = useAppContext();

  return (
    <div id="App" className="min-h-100vh position-relative">
      <Router>
        <Routes>
          {isLoggedIn ? (
            <Route element={<PageWrapper />}>
              <Route path="/dash-requests" element={<Requests />} />

              <Route path="/dash-customers" element={<Customers />} />
              <Route path="/create-customer" element={<AddCustomer />} />
              <Route path="/modify-customer/:id" element={<EditCustomer />} />

              <Route path="/dash-packages" element={<Packages />} />
              <Route path="/create-package" element={<AddPackage />} />
              <Route path="/modify-package/:id" element={<EditPackage />} />

              <Route path="/dash-services" element={<Services />} />
              <Route path="/create-service" element={<AddService />} />
              <Route path="/modify-service/:id" element={<EditService />} />

              <Route path="/notifications" element={<Notifications />} />

              <Route path="/settings" element={<EditAccountSettings />} />
              <Route path="/dashboard" element={<Navigate to={"/dash-customers"} />} />
            </Route>
          ) :
            <>
              <Route path="/dashboard" element={<Login />} />
            </>
          }
          <Route path="/" element={<Home />} />
          <Route path="/all-packages" element={<ActivePackages />} />
          <Route path="/subscribe/:packageId" element={<Subscribe />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}


export default App
