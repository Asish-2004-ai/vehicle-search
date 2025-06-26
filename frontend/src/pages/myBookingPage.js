import { useEffect, useState } from 'react';
import API from '../api';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Snackbar,
  Alert
} from '@mui/material';

export default function MyBookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [message, setMessage] = useState('');
  const [alertType, setAlertType] = useState('success');
  const [loading, setLoading] = useState(true);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const res = await API.get('/bookings');
      setBookings(res.data);
    } catch (err) {
      setMessage('Failed');
      setAlertType('error');
      setOpenSnackbar(true);
    } finally {
      setLoading(false);
    }
  };

  const cancelBooking = async (id) => {
    try {
      await API.delete(`/bookings/${id}`);
      setBookings((prev) => prev.filter((b) => b._id !== id));
      setMessage('Booking cancelled.');
      setAlertType('success');
      setOpenSnackbar(true);
    } catch (err) {
      setMessage('Error');
      setAlertType('error');
      setOpenSnackbar(true);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>My Bookings</Typography>

      {loading ? (
        <CircularProgress />
      ) : bookings.length === 0 ? (
        <Typography>No bookings found.</Typography>
      ) : (
        bookings.map((b) => (
          <Card key={b._id} sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="h6">
                {b.vehicleId?.name || 'Vehicle'}: {b.fromPincode} → {b.toPincode}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Start: {new Date(b.startTime).toLocaleString()}
              </Typography>
              <Box mt={2}>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => cancelBooking(b._id)}
                >
                  Cancel Booking
                </Button>
              </Box>
            </CardContent>
          </Card>
        ))
      )}

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity={alertType}
          sx={{ width: '100%' }}
        >
          {message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
