import Header from "./shared/Header";
import Footer from "./shared/Footer";
import { Outlet } from "react-router-dom";
import "./App.css";
/* import SideNavBar from './shared/SideNavBar'; */
/* import CoursesCards from './components/CoursesCards';
import Home from './pages/home/Home'; */

function App() {
  return (
    <div className="App">
      <Header />

      {/* <SideNavBar /> */}

      {/* <Home /> */}

      <Outlet />

      <Footer />
    </div>
  );
}

export default App;
