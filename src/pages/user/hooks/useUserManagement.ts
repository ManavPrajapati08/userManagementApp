import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";

// 1. Import Redux Selector Hook
import { useAppSelector } from "../../../store/hooks";

// 2. Import Architecture Layers
import { UserRepositoryImpl } from "../repositories/userRepositoryImpl";
import { SonnerToasterService } from "../../../shared/services/SonnerToasterService";
import { CreateUserUseCase } from "../application/use-cases/createUser.usecase";
import { UpdateUserUseCase } from "../application/use-cases/updateUser.usecase";
import { DeleteUserUseCase } from "../application/use-cases/deleteUser.usecase";

export const useUserManagement = () => {
  const navigate = useNavigate();
  const { users, loading } = useAppSelector((state) => state.user);

  const [showAddForm, setShowAddForm] = useState(false);
  const [deletingUserId, setDeletingUserId] = useState<string | null>(null);

  const services = useMemo(() => {
    const userRepository = new UserRepositoryImpl();
    const toasterService = new SonnerToasterService();

    return {
      createUser: new CreateUserUseCase(userRepository, toasterService),
      updateUser: new UpdateUserUseCase(userRepository, toasterService),
      deleteUser: new DeleteUserUseCase(userRepository, toasterService),
    };
  }, []);

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
      await services.deleteUser.execute(id);
    } catch (error) {
      // Error is already handled inside the UseCase by the ToasterService
      console.error("Delete failed", error);
    }
  };

  const handleCancelDelete = () => {
    setDeletingUserId(null);
  };

  const handleSaveUser = async (id: string | undefined, data: any) => {
    handleCloseModal();

    try {
      if (id) {
        await services.updateUser.execute(id, data);
      } else {
        await services.createUser.execute(data);
      }
      return true;
    } catch (error) {
      // Error is already handled inside the UseCase by the ToasterService
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
