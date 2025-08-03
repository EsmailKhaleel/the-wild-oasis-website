import SideNavigation from "@/app/_components/SideNavigation";

export default function AccountLayout({ children }) {
  return (
    <div className="grid grid-cols-[40px_1fr] lg:grid-cols-[200px_1fr] gap-4 lg:gap-12 h-full">
        <SideNavigation />
        <div className="py-1">
            {children}
        </div>
    </div>
  )
}
