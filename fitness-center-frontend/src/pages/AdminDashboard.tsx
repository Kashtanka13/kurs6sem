import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Grid,
  Card,
  CardContent,
} from '@mui/material';
import axios from 'axios';

interface DashboardStats {
  totalClients: number;
  activeMemberships: number;
  totalSales: number;
  recentSales: any[];
}

const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalClients: 0,
    activeMemberships: 0,
    totalSales: 0,
    recentSales: [],
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem('token');
      const [clientsRes, salesRes] = await Promise.all([
        axios.get('http://localhost:3000/clients', {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get('http://localhost:3000/sales', {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      const activeMemberships = clientsRes.data.filter(
        (client: any) => client.isActive,
      ).length;

      setStats({
        totalClients: clientsRes.data.length,
        activeMemberships,
        totalSales: salesRes.data.length,
        recentSales: salesRes.data.slice(0, 5),
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Total Clients
              </Typography>
              <Typography variant="h4">{stats.totalClients}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Active Memberships
              </Typography>
              <Typography variant="h4">{stats.activeMemberships}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Total Sales
              </Typography>
              <Typography variant="h4">{stats.totalSales}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Typography variant="h5" gutterBottom>
        Recent Sales
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Client</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {stats.recentSales.map((sale) => (
              <TableRow key={sale.id}>
                <TableCell>{sale.client.firstName} {sale.client.lastName}</TableCell>
                <TableCell>${sale.amount}</TableCell>
                <TableCell>{sale.type}</TableCell>
                <TableCell>{new Date(sale.saleDate).toLocaleDateString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default AdminDashboard; 