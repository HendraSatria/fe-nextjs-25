"use client";
import React, { useEffect } from "react";
import Button from "@/components/ui/Button";
import Layout from "@/components/ui/Layout";
import { service } from "@/services/services";
import { DataGrid ,GridColDef, GridRowsProp } from '@mui/x-data-grid';
import Link from "next/link";


  

const rows: GridRowsProp = [
  { id: 1, name: 'Data Grid', description: 'the Community version' },
  { id: 2, name: 'Data Grid Pro', description: 'the Pro version' },
  { id: 3, name: 'Data Grid Premium', description: 'the Premium version' },
];

const columns: GridColDef[] = [
  { field: 'name', headerName: 'Product Name', width: 200 },
  { field: 'description', headerName: 'Description', width: 300 },
];
  export default function Page() {
    const [rows, setRows] = React.useState<GridRowsProp>([]);
  const getData = async () => {
    const response = await service('product_categories');
    setRows(response.data);
    return response;
  };
  
  useEffect(() => {
    getData();
  }, []);


  return (
    <Layout>
      <div className="flex w-full justify-between items-center my-4">
        <div className="flex items-center gap-2">
          <h1 className="font-bold text-black">Product Category</h1>
        </div>
        <Link href="/product-category/create">
        <Button variant="contained">TAMBAH DATA</Button>
        </Link>
      </div>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid rows={rows} columns={columns} />
      </div>
    </Layout>
  );
}
