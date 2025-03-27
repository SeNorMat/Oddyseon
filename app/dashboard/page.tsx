'use client';

// Import the content from the dashboard page directly
import DashboardPage from '../Pages/dashboard/dashboard-page';
import DashboardLayout from '../Pages/dashboard/dashboard-layout';

export default function Dashboard() {
  return (
    <DashboardLayout>
      <DashboardPage />
    </DashboardLayout>
  );
}