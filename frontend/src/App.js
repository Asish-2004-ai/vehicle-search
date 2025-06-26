import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Box } from '@mui/material';
import AddVehiclePage from './pages/AddVehiclePage';
import SearchPage from './pages/SearchPage';
import MyBookingsPage from './pages/myBookingPage';

function App() {
  return (
    <Router>
      <Box sx={{ display: 'flex', gap: 2, p: 2 }}>
        <Link to="/">Add Vehicle</Link>
        <Link to="/search">Search & Book</Link>
        <Link to="/my-bookings">My Bookings</Link>
      </Box>

      <Routes>
        <Route path="/" element={<AddVehiclePage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/my-bookings" element={<MyBookingsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
