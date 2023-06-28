import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Init from 'pages/Init';
import Menu from 'pages/Menu';
import MenuLogo from 'components/MenuLogo';
import PatternPage from 'components/PatternPage';
import About from 'pages/About';
import Footer from 'components/Footer';
import NotFound from 'pages/NotFound';
import Meal from 'pages/Meal';

export default function appRouter() {
  return (
    <main className='container'>
      <Router>
        <MenuLogo />

        <Routes>

          <Route path="/" element={<PatternPage />}>
            <Route index element={<Init />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/about" element={<About />} />
            <Route path='*' element={<NotFound />}/>
            <Route path='meal/:id' element={<Meal />}/>
          </Route>

        </Routes>
        <Footer />

      </Router>
    </main>
  );
}