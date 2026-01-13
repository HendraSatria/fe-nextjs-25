import React, { useEffect, useState } from "react";
import Link from "next/link";
import Cookies from "js-cookie";
import { useRouter, usePathname } from "next/navigation";
import { serviceStore } from "@/services/services";
import Swal from "sweetalert2";
import { Button, Avatar, Menu, MenuItem, Tooltip, IconButton, Box } from "@mui/material";

import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const { user, logout, isAuthenticated } = useAuth();
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const router = useRouter();
  const pathname = usePathname();

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: 'Logout?',
      text: "Anda akan keluar dari sesi ini.",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya, Logout!'
    });

    if (result.isConfirmed) {
      await logout();
      Swal.fire({
        icon: 'success',
        title: 'Logged Out',
        text: 'Sampai jumpa lagi!',
        timer: 1500,
        showConfirmButton: false
      });
    }
  };

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Product Category', href: '/product-category' },
    { name: 'Products', href: '/products' },
    { name: 'Product Variants', href: '/product-variants' },
  ];

  return (
    <nav className="w-full relative bg-gray-800">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex shrink-0 items-center">
              <Link href="/">
                <img
                  src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
                  alt="Your Company"
                  className="h-8 w-auto cursor-pointer"
                />
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      className={`rounded-md px-3 py-2 text-sm font-medium ${
                        isActive 
                          ? 'bg-gray-900 text-white' 
                          : 'text-gray-300 hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      {link.name}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
          
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 gap-3">
            {isAuthenticated && user ? (
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar sx={{ bgcolor: 'gray' }}>
                      {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                    </Avatar>
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem onClick={handleCloseUserMenu}>
                    <p className="text-sm">Profile</p>
                  </MenuItem>
                  <MenuItem onClick={handleCloseUserMenu}>
                    <p className="text-sm">Account</p>
                  </MenuItem>
                  <MenuItem onClick={handleCloseUserMenu}>
                    <p className="text-sm">Dashboard</p>
                  </MenuItem>
                  <MenuItem onClick={() => { handleCloseUserMenu(); handleLogout(); }}>
                    <p className="text-sm text-red-600">Logout</p>
                  </MenuItem>
                </Menu>
              </Box>
            ) : (
              <>
                <Link href="/auth/login">
                  <Button variant="text" sx={{ color: 'white', fontWeight: 'bold' }}>LOGIN</Button>
                </Link>
                <Link href="/auth/register">
                  <Button variant="contained" color="primary" sx={{ borderRadius: '8px', fontWeight: 'bold' }}>REGISTER</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
