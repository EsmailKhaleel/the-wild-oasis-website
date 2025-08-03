import Link from "next/link";
import { 
  CalendarDaysIcon, 
  UserIcon
} from "@heroicons/react/24/outline";

export default function QuickActions() {
  const actions = [
    {
      title: "My Bookings",
      description: "View your current and upcoming stays",
      icon: CalendarDaysIcon,
      href: "/account/reservations",
    },
    {
      title: "Profile Settings",
      description: "Update your personal information",
      icon: UserIcon,
      href: "/account/profile",
    }
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-primary-50">
        Quick Actions
      </h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {actions.map((action, index) => (
          <Link
            key={index}
            href={action.href}
            className="group block"
          >
            <div className="bg-gradient-to-br from-primary-950 to-primary-900 rounded-xl p-6 border border-primary-900">
              <div className="w-12 h-12 bg-gradient-to-br from-accent-600 to-accent-500 rounded-lg flex items-center justify-center mb-4">
                <action.icon className="w-6 h-6 text-white" />
              </div>
              
              <h3 className="text-lg font-semibold mb-2 text-accent-600 transition-colors">
                {action.title}
              </h3>
              
              <p className="text-sm text-primary-600">
                {action.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
} 