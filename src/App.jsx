import { Billing, Business, CardDeal, Clients, CTA, Footer, Navbar, Stats, Testimonials, Hero, Login } from "./components";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './page/HomePage';
import LoginPage from "./page/LoginPage";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='login' element={<LoginPage />} />
        <Route exact path='/' element={<HomePage />}>

          {/* <Route index element={<Home />} />
          <Route path='about' element={<About />} />
          <Route path='dashboard' element={<Dashboard />} />
          <Route path='*' element={<NoMatch />} /> */}
        </Route>
      </Routes>
    </div>
  )
}

export default App