import AccountOverview from "../_components/account/AccountOverview";
import QuickActions from "../_components/account/QuickActions";

export const metadata = {
  title: "Guest Area - The Wild Oasis",
  description: "Manage your account settings and preferences.",
};

export default async function AccountPage() {
  return (
    <>
      <AccountOverview />
      <QuickActions />
    </>
  );
}
