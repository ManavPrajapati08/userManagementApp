import { Users, Activity } from "lucide-react";
import StatCard from "./StatCard";
import { useAppSelector } from "../../../store/hooks";

/**
 * StatsGrid Component
 * Displays key metrics. Refactored to show real data from Redux.
 */
const StatsGrid = () => {
  const { users } = useAppSelector((state) => state.user);

  const stats = [
    {
      label: "Total Users",
      value: users.length.toString(),
      change: users.length > 0 ? "+100%" : "0%", // Dynamic logic could be added for real change
      icon: Users,
    },
    {
      label: "Active Users",
      value: users.length.toString(), // For now, we'll treat all as active or filterable
      change: "Stable",
      icon: Activity,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 max-w-4xl">
      {stats.map((stat, i) => (
        <StatCard key={i} {...stat} />
      ))}
    </div>
  );
};

export default StatsGrid;
