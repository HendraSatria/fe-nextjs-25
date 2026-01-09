'use client';

import React, { useEffect, useState } from 'react';
import Layout from '@/components/ui/Layout';
import { Container, Typography, Grid, Paper, Box, Button } from '@mui/material';
import { ShoppingCart, Category, Layers, People } from '@mui/icons-material';
import Link from 'next/link';
import Cookies from 'js-cookie';

export default function HomePage() {
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const user = Cookies.get('user');
    if (user) {
      setUserName(JSON.parse(user).name);
    }
  }, []);

  const stats = [
    { title: 'Product Category', icon: <Category sx={{ fontSize: 40 }} />, link: '/product-category', color: '#1976d2' },
    { title: 'Products', icon: <ShoppingCart sx={{ fontSize: 40 }} />, link: '/products', color: '#2e7d32' },
    { title: 'Product Variants', icon: <Layers sx={{ fontSize: 40 }} />, link: '/product-variants', color: '#ed6c02' },
  ];

  return (
    <Layout>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h3" component="h1" gutterBottom fontWeight="bold" color="primary">
            Dashboard
          </Typography>
          <Typography variant="h5" color="text.secondary">
            Selamat datang kembali, <span style={{ fontWeight: 'bold', color: '#333' }}>{userName || 'User'}</span>!
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {stats.map((item) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={item.title}>
              <Paper
                sx={{
                  p: 3,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  borderRadius: 3,
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: 6,
                  },
                }}
              >
                <Box sx={{ color: item.color, mb: 2 }}>
                  {item.icon}
                </Box>
                <Typography variant="h6" component="h2" gutterBottom>
                  {item.title}
                </Typography>
                <Link href={item.link} passHref style={{ textDecoration: 'none' }}>
                  <Button variant="outlined" color="primary" sx={{ mt: 1, borderRadius: 2 }}>
                    Kelola
                  </Button>
                </Link>
              </Paper>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ mt: 6, p: 4, bgcolor: 'primary.main', color: 'white', borderRadius: 4, textAlign: 'center' }}>
          <Typography variant="h4" gutterBottom fontWeight="bold">
            Mulai Kelola Inventaris Anda
          </Typography>
          <Typography variant="body1" sx={{ mb: 3, opacity: 0.9 }}>
            Gunakan menu di atas atau sidebar untuk menambah, mengedit, atau menghapus data produk.
          </Typography>
          <Grid container spacing={2} justifyContent="center">
            <Grid>
              <Link href="/products" style={{ textDecoration: 'none' }}>
                <Button variant="contained" color="secondary" size="large" sx={{ borderRadius: 2, fontWeight: 'bold' }}>
                  Lihat Produk
                </Button>
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Layout>
  );
}
