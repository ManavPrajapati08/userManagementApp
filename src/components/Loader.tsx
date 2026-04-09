import { LoaderCircle } from "lucide-react";

const Loader = () => {
  return (
    <div className="h-screen flex items-center justify-center bg-black">
      <LoaderCircle className="animate-spin text-blue-500" size={40} />
    </div>
  );
};

export default Loader;
