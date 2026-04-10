import { Users, UserCheck, UserPlus, Activity } from "lucide-react";
import StatCard from "./StatCard";

const StatsGrid = () => {
  const stats = [
    {
      label: "Total Users",
      value: "1,284",
      change: "+12.5%",
      icon: Users,
    },
    {
      label: "Active Now",
      value: "432",
      change: "+3.2%",
      icon: Activity,
    },
    {
      label: "New Signups",
      value: "54",
      change: "+18.1%",
      icon: UserPlus,
    },
    {
      label: "Verified",
      value: "92%",
      change: "+2.4%",
      icon: UserCheck,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, i) => (
        <StatCard key={i} {...stat} />
      ))}
    </div>
  );
};

export default StatsGrid;
