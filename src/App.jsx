import { Navbar, Slogan, Login } from "./components";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './page/HomePage';
import LoginPage from "./page/LoginPage";

const App = () => {
  return (
    <div>
      <Routes>
        <Route exact path='/' element={<HomePage />}>
        <Route path='login' element={<LoginPage />} />


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