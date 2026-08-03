
// "use client";
// import Link from "next/link";
// import { usePathname, useRouter } from "next/navigation";
// import { useState } from "react";
// import { Heart, LogOut } from 'lucide-react';

// export function NavBar() {
//   const pathname = usePathname();
//   const router = useRouter();
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isLoggingOut, setIsLoggingOut] = useState(false);

//   const handleLogout = async () => {
//     setIsLoggingOut(true);
//     try {
//       const response = await fetch('/api/auth/logout', { method: 'POST' });
//       if (response.ok) {
//         // Use window.location for hard redirect to clear all cached state
//         window.location.href = '/login';
//       }
//     } catch (error) {
//       console.error('Logout failed:', error);
//       setIsLoggingOut(false);
//     }
//   };

//   const navLinks = [
//     { href: "/", label: "Home" },
//     { href: "/heartviewer", label: "Heart Viewer" },
//     { href: "/heartdashboard", label: "Heart Dashboard" },
//     { href: "/heartcontrol", label: "Heart Control" },
//   ];

//   return (
//     <nav className="relative bg-gradient-to-r from-red-50 via-white to-blue-50 text-gray-900 shadow-lg border-b border-gray-200">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
//         <div className="flex items-center justify-between">
//           {/* Logo/Brand Section */}
//           <div className="flex items-center space-x-3">
//             <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-pink-500 rounded-lg flex items-center justify-center shadow-lg">
//               <Heart className="w-6 h-6 text-white" />
//             </div>
//             <span className="text-xl font-bold tracking-tight">
//               Heart<span className="text-red-600">DigitalTwin</span>
//             </span>
//           </div>

//           {/* Desktop Navigation Links */}
//           <div className="hidden lg:flex items-center gap-2">
//             {navLinks.map(({ href, label }) => {
//               const isActive = pathname === href;
//               return (
//                 <Link
//                   key={href}
//                   href={href}
//                   className={`
//                     relative px-5 py-2.5 rounded-lg font-medium text-sm
//                     transition-all duration-300 ease-in-out
//                     ${isActive
//                       ? "bg-gradient-to-r from-red-600 to-pink-600 text-white shadow-lg shadow-red-500/50"
//                       : "text-gray-700 hover:text-red-600 hover:bg-red-50"
//                     }
//                   `}
//                 >
//                   <span className="relative z-10">{label}</span>
//                   {isActive && (
//                     <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-pink-600 rounded-lg blur opacity-50"></div>
//                   )}
//                 </Link>
//               );
//             })}

//             {/* Logout Button */}
//             <button
//               onClick={handleLogout}
//               disabled={isLoggingOut}
//               className="ml-4 px-4 py-2.5 rounded-lg font-medium text-sm flex items-center gap-2 text-gray-700 hover:text-red-600 hover:bg-red-50 transition-all duration-300 disabled:opacity-50"
//             >
//               <LogOut className="w-4 h-4" />
//               {isLoggingOut ? 'Logging out...' : 'Logout'}
//             </button>
//           </div>
//           {/* Mobile Menu Button */}
//           <button
//             onClick={() => setIsMenuOpen(!isMenuOpen)}
//             className="lg:hidden p-2 rounded-lg hover:bg-red-50 transition-colors"
//             aria-label="Toggle menu"
//           >
//             <svg
//               className="w-6 h-6 text-gray-700"
//               fill="none"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth="2"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               {isMenuOpen ? (
//                 <path d="M6 18L18 6M6 6l12 12" />
//               ) : (
//                 <path d="M4 6h16M4 12h16M4 18h16" />
//               )}
//             </svg>
//           </button>
//         </div>

//         {/* Mobile Navigation Menu */}
//         {isMenuOpen && (
//           <div className="lg:hidden mt-4 pb-2 space-y-2">
//             {navLinks.map(({ href, label }) => {
//               const isActive = pathname === href;
//               return (
//                 <Link
//                   key={href}
//                   href={href}
//                   onClick={() => setIsMenuOpen(false)}
//                   className={`
//                     block px-4 py-3 rounded-lg font-medium text-sm
//                     transition-all duration-300 ease-in-out
//                     ${isActive
//                       ? "bg-gradient-to-r from-red-600 to-pink-600 text-white shadow-lg shadow-red-500/50"
//                       : "text-gray-700 hover:text-red-600 hover:bg-red-50"
//                     }
//                   `}
//                 >
//                   {label}
//                 </Link>
//               );
//             })}

//             {/* Mobile Logout Button */}
//             <button
//               onClick={() => {
//                 setIsMenuOpen(false);
//                 handleLogout();
//               }}
//               disabled={isLoggingOut}
//               className="w-full flex items-center gap-2 px-4 py-3 rounded-lg font-medium text-sm text-gray-700 hover:text-red-600 hover:bg-red-50 transition-all duration-300 disabled:opacity-50"
//             >
//               <LogOut className="w-4 h-4" />
//               {isLoggingOut ? 'Logging out...' : 'Logout'}
//             </button>
//           </div>
//         )}
//       </div>
//     </nav>
//   );
// }









"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Heart, LogOut } from "lucide-react";

export function NavBar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      const response = await fetch("/api/auth/logout", { method: "POST" });
      if (response.ok) {
        window.location.href = "/login"; // hard redirect
      } else {
        // Fallback if server returns error but we want to clear client state
        console.error("Logout failed on server");
        window.location.href = "/login";
      }
    } catch (error) {
      console.error("Logout failed:", error);
      // Fallback network error
      window.location.href = "/login";
    } finally {
      setIsLoggingOut(false);
    }
  };

  const navLinks = [
    { href: "/admin/dashboard", label: "Home" },
    { href: "/heartviewer", label: "Heart Viewer" },
    { href: "/heartdashboard", label: "Heart Dashboard" },
    { href: "/heartcontrol", label: "Heart Control" },
  ];

  return (
    <nav className="relative z-50 bg-gradient-to-r from-red-50 via-white to-blue-50 text-gray-900 shadow-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-pink-500 rounded-lg flex items-center justify-center shadow-lg">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight">
              Heart<span className="text-red-600">DigitalTwin</span>
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-2">
            {navLinks.map(({ href, label }) => {
              const isActive = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  className={`
                    relative px-5 py-2.5 rounded-lg font-medium text-sm
                    transition-all duration-300
                    ${isActive
                      ? "bg-gradient-to-r from-red-600 to-pink-600 text-white shadow-lg shadow-red-500/50"
                      : "text-gray-700 hover:text-red-600 hover:bg-red-50"
                    }
                  `}
                >
                  <span className="relative z-10">{label}</span>
                  {isActive && (
                    <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-pink-600 rounded-lg blur opacity-50"></div>
                  )}
                </Link>
              );
            })}

            {/* ✅ SINGLE Logout Button */}
            <button
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="ml-4 px-4 py-2.5 rounded-lg font-medium text-sm flex items-center gap-2 text-gray-700 hover:text-red-600 hover:bg-red-50 transition-all disabled:opacity-50"
            >
              <LogOut className="w-4 h-4" />
              {isLoggingOut ? "Logging out..." : "Logout"}
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-red-50 transition-colors"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6 text-gray-700"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden mt-4 pb-2 space-y-2">
            {navLinks.map(({ href, label }) => {
              const isActive = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`
                    block px-4 py-3 rounded-lg font-medium text-sm
                    transition-all duration-300
                    ${isActive
                      ? "bg-gradient-to-r from-red-600 to-pink-600 text-white shadow-lg"
                      : "text-gray-700 hover:text-red-600 hover:bg-red-50"
                    }
                  `}
                >
                  {label}
                </Link>
              );
            })}
            {/* Mobile Logout Button */}
            <button
              onClick={() => {
                setIsMenuOpen(false);
                handleLogout();
              }}
              disabled={isLoggingOut}
              className="w-full flex items-center gap-2 px-4 py-3 rounded-lg font-medium text-sm text-gray-700 hover:text-red-600 hover:bg-red-50 transition-all disabled:opacity-50"
            >
              <LogOut className="w-4 h-4" />
              {isLoggingOut ? "Logging out..." : "Logout"}
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
