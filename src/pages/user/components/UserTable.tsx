import { Users as UsersIcon, Pencil, Trash2 } from "lucide-react";
import Button from "../../../shared/components/atoms/Button";
import type { UserType } from "../types/UserType";
import { Tr, Td } from "../../../shared/components/atoms/TableAtoms";
import Typography from "../../../shared/components/atoms/Typography";

import { useUserManagement } from "../hooks/useUserManagement";
import Loader from "../../../shared/components/atoms/Loader";

interface UserTableProps {
  users: UserType[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onAddFirst: () => void;
}

const UserTable = ({ users, onEdit, onDelete, onAddFirst }: UserTableProps) => {
  const { loading } = useUserManagement();

  // --- Render Functions ---

  const renderLoader = () => (
    <div className="flex items-center justify-center p-20 glass-dark rounded-3xl border border-slate-700/50">
      <Loader />
    </div>
  );

  const renderTableHeader = () => (
    <thead>
      <Tr hover={false} className="bg-slate-800/50">
        <Td isHeader className="pl-6">
          Name
        </Td>
        <Td isHeader>Email</Td>
        <Td isHeader>Mobile</Td>
        <Td isHeader align="center">
          Age
        </Td>
        <Td isHeader>Description</Td>
        <Td isHeader align="right" className="pr-6">
          Action
        </Td>
      </Tr>
    </thead>
  );

  const renderEmptyState = () => (
    <Tr hover={false}>
      <Td align="center" className="p-12" colSpan={6}>
        <div className="flex flex-col items-center gap-3">
          <div className="w-16 h-16 rounded-full bg-slate-800/50 flex items-center justify-center text-slate-600">
            <UsersIcon size={32} />
          </div>
          <Typography>No users found in the system</Typography>
          <button
            onClick={onAddFirst}
            className="text-indigo-400 text-sm font-semibold hover:text-indigo-300 transition-colors"
          >
            Create your first user
          </button>
        </div>
      </Td>
    </Tr>
  );

  const renderUserRow = (user: UserType, index: number) => (
    <Tr key={user.id || index}>
      <Td className="pl-6 font-medium text-slate-200">{user.name}</Td>
      <Td className="text-slate-400">{user.email}</Td>
      <Td>
        <span className="font-mono">{user.mobile}</span>
      </Td>
      <Td align="center">
        <span className="font-medium text-slate-300">{user.age}</span>
      </Td>
      <Td>
        <p className="truncate max-w-xs">{user.description || "—"}</p>
      </Td>
      <Td align="right" className="pr-6">
        <div className="flex justify-end gap-2">
          <Button
            size="sm"
            onClick={() => onEdit(user.id)}
            title="Edit User"
            className="bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 border-none shadow-none"
          >
            <Pencil size={16} />
          </Button>
          <Button
            size="sm"
            variant="danger"
            onClick={() => onDelete(user.id)}
            title="Delete User"
            className="bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border-none shadow-none"
          >
            <Trash2 size={16} />
          </Button>
        </div>
      </Td>
    </Tr>
  );

  if (loading) return renderLoader();

  return (
    <div className="glass-dark rounded-3xl border border-slate-700/50 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          {renderTableHeader()}
          <tbody className="divide-y divide-slate-800/50">
            {users.length === 0
              ? renderEmptyState()
              : users.map((user, index) => renderUserRow(user, index))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserTable;
