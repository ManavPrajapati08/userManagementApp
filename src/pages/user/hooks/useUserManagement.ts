import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../../context/UserContext";
import toast from "react-hot-toast";

export const useUserManagement = () => {
  const navigate = useNavigate();
  const { users, addUser, updateUser, deleteUser, loading } = useUser();
  const [showAddForm, setShowAddForm] = useState(false);
  const [deletingUserId, setDeletingUserId] = useState<string | null>(null);

  const handleAddUser = () => {
    setShowAddForm(true);
  };

  const handleCloseModal = () => {
    setShowAddForm(false);
  };

  const handleEditUser = (id: string) => {
    navigate(`/users/${id}`);
  };

  const handleDeleteUser = (id: string) => {
    setDeletingUserId(id);
  };

  const handleConfirmDelete = async () => {
    if (!deletingUserId) return;
    const id = deletingUserId;
    setDeletingUserId(null);

    try {
      await deleteUser(id);
      toast.success("User deleted successfully");
    } catch (error) {
      toast.error("Failed to delete user");
    }
  };

  const handleCancelDelete = () => {
    setDeletingUserId(null);
  };

  const handleSaveUser = async (id: string | undefined, data: any) => {
    handleCloseModal();

    try {
      if (id) {
        await updateUser(id, data);
        toast.success("User updated successfully");
      } else {
        await addUser(data);
        toast.success("User added successfully");
      }
      return true;
    } catch (error) {
      toast.error(id ? "Failed to update user" : "Failed to add user");
      return false;
    }
  };

  return {
    users,
    loading,
    showAddForm,
    deletingUserId,
    handleAddUser,
    handleCloseModal,
    handleEditUser,
    handleDeleteUser,
    handleConfirmDelete,
    handleCancelDelete,
    handleSaveUser,
  };
};
