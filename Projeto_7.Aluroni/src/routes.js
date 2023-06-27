import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Init from 'pages/Init';
import Menu from 'pages/Menu';
import MenuLogo from 'components/MenuLogo';

export default function appRouter() {
  return (
    <Router>
      <MenuLogo />
      <Routes>
        <Route path="/" element={<Init />} />
        <Route path="/menu" element={<Menu />} />
      </Routes>
    </Router>
  );
}