import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "../../../shared/components/atoms/Input";
import Button from "../../../shared/components/atoms/Button";
import Dropdown from "../../../shared/components/molecules/Dropdown";
import { useParams, useNavigate } from "react-router-dom";
import { useUserManagement } from "../hooks/useUserManagement";
import Typography from "../../../shared/components/atoms/Typography";
import { userFormSchema, type UserFormData } from "../types/user.schema";

type Props = {
  onClose?: () => void;
};

const UserFormModal = ({ onClose }: Props) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { users, handleSaveUser } = useUserManagement();

  const isEdit = id !== undefined;

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<UserFormData>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      name: "",
      email: "",
      age: "",
      gender: "",
      mobile: "",
      description: "",
    },
  });

  const genderValue = watch("gender");

  // Load user data on edit
  useEffect(() => {
    if (isEdit && id) {
      const userToEdit = users.find((u) => u.id === id);
      if (userToEdit) {
        reset({
          name: userToEdit.name,
          email: userToEdit.email,
          age: userToEdit.age,
          gender: userToEdit.gender,
          mobile: userToEdit.mobile,
          description: userToEdit.description || "",
        });
      }
    }
  }, [id, users, isEdit, reset]);

  // --- Handlers ---

  const onSubmit = async (data: UserFormData) => {
    const success = await handleSaveUser(id, data);
    if (success) {
      if (onClose) onClose();
      else navigate("/users");
    }
  };

  const handleCancel = () => {
    if (onClose) onClose();
    else navigate("/users");
  };

  // --- Render Functions ---

  const renderHeader = () => (
    <div className="flex justify-between items-center mb-8">
      <div>
        <Typography variant="h2">
          {isEdit ? "Edit User Profile" : "Create New User"}
        </Typography>
        <Typography variant="p" className="text-sm mt-1">
          {isEdit
            ? "Modify existing user information."
            : "Fill in the details to add a member."}
        </Typography>
      </div>
    </div>
  );

  const renderFormFields = () => (
    <div className="grid grid-cols-1 gap-5">
      <Input
        label="Full Name"
        placeholder="John Doe"
        error={errors.name?.message}
        {...register("name")}
      />
      <Input
        label="Email"
        type="email"
        placeholder="john@example.com"
        error={errors.email?.message}
        {...register("email")}
      />
      <Input
        label="Mobile Number"
        type="text"
        placeholder="10 digit mobile number"
        error={errors.mobile?.message}
        {...register("mobile")}
      />
      <Input
        label="Age"
        type="number"
        placeholder="25"
        error={errors.age?.message}
        {...register("age")}
      />

      <Dropdown
        label="Gender"
        value={genderValue}
        options={["male", "female"]}
        onChange={(value) => setValue("gender", value, { shouldValidate: true })}
        placeholder="Select Gender"
        error={errors.gender?.message}
      />

      <div className="w-full space-y-1.5">
        <Typography variant="label">Description</Typography>
        <textarea
          placeholder="User bio or additional notes..."
          rows={3}
          className={`w-full bg-slate-800/50 text-white px-4 py-3 rounded-xl border ${
            errors.description ? "border-rose-500" : "border-slate-700"
          } focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all outline-none resize-none`}
          {...register("description")}
        />
        {errors.description && (
          <Typography variant="small" className="text-rose-500 ml-1">
            {errors.description.message}
          </Typography>
        )}
      </div>
    </div>
  );

  const renderActions = () => (
    <div className="flex gap-4 mt-10">
      <Button
        text="Cancel"
        variant="secondary"
        onClick={handleCancel}
        className="flex-1 py-3"
        disabled={isSubmitting}
      />
      <Button
        text={isEdit ? "Update User" : "Save User"}
        onClick={handleSubmit(onSubmit)}
        className="flex-[1.5] py-3"
        isLoading={isSubmitting}
      />
    </div>
  );

  // --- Main Execution ---

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
      <div
        className="absolute inset-0 bg-slate-950/40 backdrop-blur-sm"
        onClick={handleCancel}
      />

      <div className="glass-dark w-full max-w-lg rounded-[32px] border border-slate-700/50 shadow-2xl relative z-10 overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="p-8">
          {renderHeader()}
          {renderFormFields()}
          {renderActions()}
        </div>
      </div>
    </div>
  );
};

export default UserFormModal;
