import { useState, useEffect } from "react";
import Input from "../../../shared/components/atoms/Input";
import Button from "../../../shared/components/atoms/Button";
import Dropdown from "../../../shared/components/molecules/Dropdown";
import { useParams, useNavigate } from "react-router-dom";
import { useUserManagement } from "../hooks/useUserManagement";
import type { UserType } from "../types/UserType";
import Typography from "../../../shared/components/atoms/Typography";

type Props = {
  onClose?: () => void;
};

const UserFormModal = ({ onClose }: Props) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { users, handleSaveUser } = useUserManagement();

  const [formData, setFormData] = useState<UserType>({
    id: "",
    name: "",
    email: "",
    age: "",
    gender: "",
    mobile: "",
    description: "",
  });

  const isEdit = id !== undefined;

  useEffect(() => {
    if (isEdit && id) {
      const userToEdit = users.find(u => u.id === id);
      if (userToEdit) {
        setFormData(userToEdit);
      }
    }
  }, [id, users, isEdit]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    // If adding a new user, remove the empty id field so Firestore can generate it
    const { id: _, ...dataToSave } = formData;
    
    const success = await handleSaveUser(id, isEdit ? formData : dataToSave);
    
    if (success) {
      if (onClose) {
        onClose();
      } else {
        navigate("/users");
      }
    }
  };

  const handleCancel = () => {
    if (onClose) {
      onClose();
    } else {
      navigate("/users");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-950/40 backdrop-blur-sm"
        onClick={handleCancel}
      ></div>

      {/* Modal Card */}
      <div className="glass-dark w-full max-w-lg rounded-[32px] border border-slate-700/50 shadow-2xl relative z-10 overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="p-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <Typography variant="h2">
                {isEdit ? "Edit User Profile" : "Create New User"}
              </Typography>
              <Typography variant="p" className="text-sm mt-1">
                {isEdit ? "Modify existing user information." : "Fill in the details to add a member."}
              </Typography>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5">
            <Input
              label="Full Name"
              name="name"
              type="text"
              placeholder="John Doe"
              value={formData.name}
              onChange={handleChange}
            />
            <Input
              label="Email"
              name="email"
              type="email"
              placeholder="john@example.com"
              value={formData.email}
              onChange={handleChange}
            />
            <Input
              label="Mobile Number"
              name="mobile"
              type="text"
              placeholder="+1 (555) 000-0000"
              value={formData.mobile}
              onChange={handleChange}
            />
            <Input
              label="Age"
              name="age"
              type="number"
              placeholder="25"
              value={formData.age}
              onChange={handleChange}
            />

            <Dropdown 
              label="Gender"
              value={formData.gender}
              options={["male", "female"]}
              onChange={(value) => setFormData(prev => ({ ...prev, gender: value }))}
              placeholder="Select Gender"
            />

            <div className="w-full space-y-1.5">
              <Typography variant="label">Description</Typography>
              <textarea
                name="description"
                placeholder="User bio or additional notes..."
                value={formData.description}
                onChange={handleChange}
                rows={3}
                className="w-full bg-slate-800/50 text-white px-4 py-3 rounded-xl border border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all outline-none resize-none"
              />
            </div>
          </div>

          <div className="flex gap-4 mt-10">
            <Button
              text="Cancel"
              variant="secondary"
              onClick={handleCancel}
              className="flex-1 py-3"
            />
            <Button
              text={isEdit ? "Update User" : "Save User"}
              onClick={handleSave}
              className="flex-[1.5] py-3"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserFormModal;
