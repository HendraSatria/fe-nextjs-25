'use client';

import Layout from '@/components/ui/Layout';
import { serviceStore } from '@/services/services';
import { Button, TextField } from '@mui/material';
import { useRouter } from 'next/navigation'; // Correct import for App Router
import React, { useState } from 'react';
import Swal from 'sweetalert2';

export default function ProductCategoryCreate() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    try {
      const response = await serviceStore('product_categories', formData);
      // Assuming response.status or similar checks can be done, 
      // but service wrapper usually returns data.
      // Adjust based on your actual service response structure.
      
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Product Category created successfully',
      });
      router.push('/product-category');
    } catch (error: any) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error?.response?.data?.message || 'Failed to create category',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <h1 className="text-black text-2xl font-bold">Create Product Category</h1>
      <form onSubmit={handleSubmit} className="w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
          <TextField 
            name="name" 
            id="name" 
            label="Name" 
            variant="standard" 
            required
            fullWidth
          />
          <TextField
            name="description"
            id="description"
            label="Description"
            variant="standard"
            fullWidth
          />
        </div>
        <div className="flex justify-end gap-2">
            <Button 
            variant="outlined" 
            color="secondary"
            onClick={() => router.back()}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button 
            type="submit" 
            variant="contained" 
            disabled={loading}
          >
            {loading ? 'Saving...' : 'Submit'}
          </Button>
        </div>
      </form>
    </Layout>
  );
}
