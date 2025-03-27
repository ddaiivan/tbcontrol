
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import { Menu, X, Home, FilePlus, Hospital, User, LogOut } from 'lucide-react'; // Add LogOut icon
import { Button } from './ui/button';
import { useAuth } from '@/context/AuthContext'; // Import useAuth
import { toast } from 'sonner'; // Import toast for logout feedback

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { session, signOut } = useAuth(); // Get session and signOut from context
  const navigate = useNavigate(); // Hook for navigation

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success('Logged out successfully.');
      navigate('/login'); // Redirect to login after logout
    } catch (error) {
      toast.error('Failed to log out.');
      console.error('Logout error:', error);
    }
    setIsOpen(false); // Close mobile menu if open
  };

  const navigationItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "TB Information", href: "/info", icon: FilePlus },
    { name: "Screening", href: "/screening", icon: FilePlus },
    { name: "Advanced Screening Tools", href: "/advanced-screening", icon: FilePlus }, // Changed text
    { name: "Health Facilities", href: "/facilities", icon: Hospital },
  ];

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
             <span className="text-2xl font-bold text-secondary">TBControl</span>
           </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-gray-700 hover:text-secondary px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                {item.name}
              </Link>
            ))}
            {session ? (
              <Button variant="secondary" onClick={handleSignOut} className="flex items-center gap-2 text-white">
                <LogOut size={18} />
                Logout
              </Button>
            ) : (
              <Button asChild variant="secondary">
                <Link to="/login" className="flex items-center gap-2 text-white"> {/* Added text-white */}
                  <User size={18} />
                  Login
                </Link>
              </Button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-secondary focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-gray-700 hover:text-secondary block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsOpen(false)}
              >
                <item.icon className="inline-block w-5 h-5 mr-2" />
                {item.name}
              </Link>
            ))}
            {session ? (
               <button
                 onClick={handleSignOut}
                 className="flex items-center gap-2 text-gray-700 hover:text-secondary block px-3 py-2 rounded-md text-base font-medium w-full text-left"
               >
                 <LogOut size={20} />
                 Logout
               </button>
            ) : (
              <Link
                to="/login"
                className="flex items-center gap-2 text-gray-700 hover:text-secondary block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsOpen(false)}
              >
                <User size={20} />
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
