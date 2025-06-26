import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AddVehiclePage from './pages/AddVehiclePage';
import SearchPage from './pages/SearchPage';
import MyBookingsPage from './pages/myBookingPage';

function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Add Vehicle</Link> | <Link to="/search">Search & Book</Link> |  <Link to="/my-bookings">My Bookings</Link>
      </nav>
      <Routes>
        <Route path="/" element={<AddVehiclePage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/my-bookings" element={<MyBookingsPage />} />

      </Routes>
    </Router>
  );
}

export default App;
