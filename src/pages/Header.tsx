import Button from "../components/Button";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";

const Header = () => {
  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <div className="flex justify-between items-center px-6 h-16 bg-gray-900 text-white shadow">
      {/* Logo */}
      <h1 className="text-xl font-bold">MyApp</h1>

      {/* Reusable Button */}
      <Button text="Logout" onClick={handleLogout} />
    </div>
  );
};

export default Header;
