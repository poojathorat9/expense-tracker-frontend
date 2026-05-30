interface DashboardHeaderProps {
  userName?: string;
}

export default function DashboardHeader({ userName = 'Pooja' }: DashboardHeaderProps) {
  return (
    <div className="dashboard-header">
      <h1>Welcome Back, {userName} 👋</h1>
    </div>
  );
}
