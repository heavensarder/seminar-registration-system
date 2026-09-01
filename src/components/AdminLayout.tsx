import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, Settings, LogOut, Ticket, CheckCircle2, Mail } from 'lucide-react';
import { TsiLogo } from './TsiLogo';

interface AdminLayoutProps {
  children: React.ReactNode;
  onLogout: () => void;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children, onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    onLogout();
    navigate('/admin/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Registrations', path: '/admin/registrations', icon: Users },
    { name: 'Confirmed List', path: '/admin/confirmed', icon: CheckCircle2 },
    { name: 'Mail Configuration', path: '/admin/mail-config', icon: Mail },
    { name: 'Event Settings', path: '/admin/event-settings', icon: Settings },
  ];

  return (
    <div className="flex h-screen bg-[#041e1d] text-white font-sans selection:bg-[#e62b32] selection:text-white">
      
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-[#052322] border-r border-[#16605b]/30 flex flex-col hidden md:flex shrink-0">
        
        {/* Brand */}
        <div className="h-20 flex items-center px-6 border-b border-[#16605b]/30">
          <div className="bg-white p-1.5 rounded-lg mr-3">
            <TsiLogo size="sm" />
          </div>
          <div>
            <div className="font-headline font-bold text-sm tracking-widest text-[#e62b32] uppercase">Admin Portal</div>
            <div className="text-[10px] text-teal-100/50">Kizuna 2026 Seminar</div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-6 px-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <button
                key={item.name}
                onClick={() => {
                  if (item.path !== '#') {
                    navigate(item.path);
                  }
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm cursor-pointer ${
                  isActive 
                    ? 'bg-[#083331] text-white border border-[#16605b] shadow-inner' 
                    : 'text-teal-100/60 hover:text-white hover:bg-white/5 border border-transparent'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-[#79ded7]' : 'text-teal-100/40'}`} />
                {item.name}
              </button>
            );
          })}
        </nav>

        {/* User / Logout */}
        <div className="p-4 border-t border-[#16605b]/30">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-teal-100/60 hover:text-rose-400 hover:bg-rose-500/10 transition-all text-sm font-medium cursor-pointer"
          >
            <LogOut className="w-5 h-5" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden relative">
        {/* Header (Mobile menu placeholder & Breadcrumbs) */}
        <header className="h-20 bg-[#052322]/80 backdrop-blur-md border-b border-[#16605b]/30 flex items-center px-8 shrink-0 z-10 sticky top-0">
          <h1 className="font-headline text-xl font-bold tracking-widest uppercase text-white">
            Overview Dashboard
          </h1>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-8 bg-[#041e1d]">
          {children}
        </div>
      </main>

    </div>
  );
};
