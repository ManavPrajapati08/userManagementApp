import Button from "../../../shared/components/atoms/Button";
import UserTable from "../components/UserTable";
import type { UserType } from "../types/UserType";
import Typography from "../../../shared/components/atoms/Typography";
import UserFormModal from "../components/UserFormModal";
import ConfirmDialog from "../../../shared/components/molecules/ConfirmDialog";

interface UserManagementTemplateProps {
  users: UserType[];
  onAddUser: () => void;
  onEditUser: (id: string) => void;
  onDeleteUser: (id: string) => void;
  showAddForm: boolean;
  onCloseModal: () => void;
  deletingUserId: string | null;
  onConfirmDelete: () => void;
  onCancelDelete: () => void;
}

const UserManagementTemplate = ({
  users,
  onAddUser,
  onEditUser,
  onDeleteUser,
  showAddForm,
  onCloseModal,
  deletingUserId,
  onConfirmDelete,
  onCancelDelete,
}: UserManagementTemplateProps) => {
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <Typography variant="h1">User Management</Typography>
          <Typography variant="p" className="mt-1">
            Manage and monitor all system users from one place.
          </Typography>
        </div>
        <div className="flex gap-2">
          <Button
            text="Add New User"
            onClick={onAddUser}
            className="flex items-center gap-2"
          />
        </div>
      </div>

      <UserTable
        users={users}
        onEdit={onEditUser}
        onDelete={onDeleteUser}
        onAddFirst={onAddUser}
      />

      {showAddForm && <UserFormModal onClose={onCloseModal} />}

      <ConfirmDialog
        isOpen={deletingUserId !== null}
        title="Delete User?"
        message="This action cannot be undone. All user data will be permanently removed from the cloud."
        onConfirm={onConfirmDelete}
        onCancel={onCancelDelete}
        confirmText="Delete User"
        variant="danger"
      />
    </div>
  );
};

export default UserManagementTemplate;
