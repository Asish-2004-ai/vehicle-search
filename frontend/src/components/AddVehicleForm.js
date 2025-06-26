import { useState } from 'react';
import API from '../api';
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Alert
} from '@mui/material';

export default function AddVehicleForm() {
  const [form, setForm] = useState({ name: '', capacityKg: '', tyres: '' });
  const [message, setMessage] = useState('');
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError(false);

    try {
      await API.post('/vehicles', form);
      setMessage('Vehicle added successfully');
      setForm({ name: '', capacityKg: '', tyres: '' });
    } catch (err) {
      setMessage('Error');
      setError(true);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 4, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography variant="h5" component="h2" textAlign="center" gutterBottom>
          Add Vehicle
        </Typography>

        <TextField
          label="Vehicle Name"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <TextField
          label="Capacity (Kg)"
          name="capacityKg"
          type="number"
          value={form.capacityKg}
          onChange={handleChange}
          required
        />

        <TextField
          label="Tyres"
          name="tyres"
          type="number"
          value={form.tyres}
          onChange={handleChange}
          required
        />

        <Button variant="contained" type="submit">
          Add Vehicle
        </Button>

        {message && (
          <Alert severity={error ? 'error' : 'success'}>{message}</Alert>
        )}
      </Box>
    </Container>
  );
}
