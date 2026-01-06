'use client';

import Layout from '@/components/ui/Layout';
import { Button, TextField } from '@mui/material';
import React from 'react';

export default function ProductCategoryCreate() {
  return (
    <Layout>
      <h1 className="text-black text-2xl font-bold">Product Category Create</h1>
      <form action="" className="w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
          <TextField name="name" id="name" label="Name" variant="standard" />
          <TextField
            name="description"
            id="description"
            label="Description"
            variant="standard"
          />
        </div>
        <div className="flex justify-end">
          <Button type="submit" variant="contained">
            Submit
          </Button>
        </div>
      </form>
    </Layout>
  );
}
