import Typography from "../../../shared/components/atoms/Typography";
import StatsGrid from "../components/StatsGrid";

const DashboardTemplate = () => {
  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div>
        <Typography variant="h1">Dashboard Overview</Typography>
        <Typography variant="p" className="mt-1">
          Real-time performance metrics and system statistics.
        </Typography>
      </div>

      <StatsGrid />

      {/* Placeholder for future sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 glass-dark rounded-3xl border border-slate-700/50 p-8 h-80 flex items-center justify-center">
          <Typography variant="p">
            User Activity Analytics Chart (Coming Soon)
          </Typography>
        </div>
        <div className="glass-dark rounded-3xl border border-slate-700/50 p-8 h-80 flex items-center justify-center">
          <Typography variant="p">Recent System Logs (Coming Soon)</Typography>
        </div>
      </div>
    </div>
  );
};

export default DashboardTemplate;
