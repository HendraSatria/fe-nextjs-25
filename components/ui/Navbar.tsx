import React, { useEffect, useState } from "react";
import Link from "next/link";
import Cookies from "js-cookie";
import { useRouter, usePathname } from "next/navigation";
import { serviceDestroy, serviceStore } from "@/services/services";
import Swal from "sweetalert2";
import { Button } from "@mui/material";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState<{ name: string } | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const token = Cookies.get('token');
    const user = Cookies.get('user');
    if (token && user) {
      setIsLoggedIn(true);
      setUserData(JSON.parse(user));
    }
  }, []);

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
      try {
        // Logout is a POST request in Laravel setup
        await serviceStore('auth/logout', new FormData()); 
        Cookies.remove('token');
        Cookies.remove('user');
        setIsLoggedIn(false);
        setUserData(null);
        
        Swal.fire({
          icon: 'success',
          title: 'Logged Out',
          text: 'Sampai jumpa lagi!',
          timer: 1500,
          showConfirmButton: false
        });
        
        router.push('/login');
        router.refresh();
      } catch (error) {
        // Even if API fails, clear local session
        Cookies.remove('token');
        Cookies.remove('user');
        setIsLoggedIn(false);
        router.push('/login');
      }
    }
  };

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Product-Category', href: '/product-category' },
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
            {isLoggedIn ? (
              <>
                <span className="text-gray-300 text-sm hidden md:block">
                  Halo, <span className="text-white font-bold">{userData?.name}</span>
                </span>
                <Button 
                  onClick={handleLogout}
                  variant="outlined" 
                  color="inherit" 
                  size="small"
                  sx={{ color: 'white', borderColor: 'gray' }}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="text" sx={{ color: 'white' }}>Login</Button>
                </Link>
                <Link href="/register">
                  <Button variant="contained" color="primary" size="small">Register</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
