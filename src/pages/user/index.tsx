import { useUserManagement } from "./hooks/useUserManagement";
import MainTemplate from "../../shared/templates/MainTemplate";
import UserManagementTemplate from "./templates/UserTemplate";

const Users = () => {
  const {
    users,
    showAddForm,
    deletingUserId,
    handleAddUser,
    handleCloseModal,
    handleEditUser,
    handleDeleteUser,
    handleConfirmDelete,
    handleCancelDelete,
  } = useUserManagement();

  return (
    <MainTemplate>
      <UserManagementTemplate
        users={users}
        onAddUser={handleAddUser}
        onEditUser={handleEditUser}
        onDeleteUser={handleDeleteUser}
        showAddForm={showAddForm}
        onCloseModal={handleCloseModal}
        deletingUserId={deletingUserId}
        onConfirmDelete={handleConfirmDelete}
        onCancelDelete={handleCancelDelete}
      />
    </MainTemplate>
  );
};

export default Users;
