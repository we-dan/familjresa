import { Link, useLocation } from 'react-router-dom';
import { Plane, CheckSquare, FileText, Search } from 'lucide-react';

const navItems = [
  { to: '/', label: 'Översikt', icon: Plane },
  { to: '/checklists', label: 'Checklistor', icon: CheckSquare },
  { to: '/attractions', label: 'Attraktioner', icon: Search },
  { to: '/documents', label: 'Handlingar', icon: FileText },
];

export function Navigation() {
  const location = useLocation();

  return (
    <nav className="bg-card border-t border-border mt-auto">
      <div className="flex justify-around items-center max-w-4xl mx-auto">
        {navItems.map(({ to, label, icon: Icon }) => {
          const isActive = location.pathname === to;
          return (
            <Link
              key={to}
              to={to}
              className={`
                flex flex-col items-center justify-center gap-1 py-3 px-4
                min-h-[72px] flex-1 transition-colors
                ${
                  isActive
                    ? 'text-primary font-semibold'
                    : 'text-muted-foreground hover:text-foreground'
                }
              `}
              aria-current={isActive ? 'page' : undefined}
            >
              <Icon size={28} strokeWidth={isActive ? 2.5 : 2} aria-hidden="true" />
              <span className="text-sm">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
