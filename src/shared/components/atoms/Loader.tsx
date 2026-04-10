import { LoaderCircle } from "lucide-react";

const Loader = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <LoaderCircle className="animate-spin text-indigo-500" size={40} />
    </div>
  );
};

export default Loader;
