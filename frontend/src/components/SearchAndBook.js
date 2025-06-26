import { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Alert
} from '@mui/material';
import API from '../api';

export default function SearchAndBook() {
  const [form, setForm] = useState({
    capacityRequired: '',
    fromPincode: '',
    toPincode: '',
    startTime: ''
  });
  const [vehicles, setVehicles] = useState([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSearch = async () => {
    try {
      const res = await API.get('/vehicles/available', { params: form });
      setVehicles(res.data);
      setMessage('');
      setError('');
    } catch (err) {
      setError('Error fetching vehicles');
    }
  };

  const handleBooking = async (vehicleId) => {
    try {
      await API.post('/bookings', {
        vehicleId,
        fromPincode: form.fromPincode,
        toPincode: form.toPincode,
        startTime: form.startTime,
        customerId: 'demo123'
      });
      setMessage('Booking successful!');
      setError('');
    } catch (err) {
      setError('Booking failed — maybe already booked.');
    }
  };

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>Search & Book Vehicles</Typography>

      <Grid container spacing={2} mb={3}>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            fullWidth
            label="Capacity Required (Kg)"
            name="capacityRequired"
            value={form.capacityRequired}
            onChange={handleChange}
            type="number"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            fullWidth
            label="From Pincode"
            name="fromPincode"
            value={form.fromPincode}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            fullWidth
            label="To Pincode"
            name="toPincode"
            value={form.toPincode}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            fullWidth
            label="Start Time"
            name="startTime"
            type="datetime-local"
            value={form.startTime}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
      </Grid>

      <Button variant="contained" onClick={handleSearch}>Search</Button>

      <Box mt={2}>
        {message && <Alert severity="success">{message}</Alert>}
        {error && <Alert severity="error">{error}</Alert>}
      </Box>

      <Grid container spacing={2} mt={2}>
        {vehicles.map((v) => (
          <Grid item xs={12} sm={6} md={4} key={v._id}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6">{v.name}</Typography>
                <Typography>Capacity: {v.capacityKg} Kg</Typography>
                <Typography>Tyres: {v.tyres}</Typography>
                <Typography>Estimated Duration: {v.estimatedRideDurationHours} hours</Typography>
              </CardContent>
              <CardActions>
                <Button size="small" variant="outlined" onClick={() => handleBooking(v._id)}>
                  Book Now
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
