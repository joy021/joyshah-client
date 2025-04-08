import { useState } from "react";
import { Button, Input, message, Spin } from "antd";
import PageTitle from "../../../components/page-title";
import { getDateTimeFormat } from "../../../helpers/date-time-formats";
import usersGlobalStore, { UsersStoreType } from "../../../store/users-store";
import { updateUserProfile } from "../../../api-services/users-service";

function ProfilePage() {
  const { currentUser, setCurrentUser }: UsersStoreType =
    usersGlobalStore() as UsersStoreType;

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: currentUser?.name || "",
    email: currentUser?.email || "",
    oldPassword: "",
    newPassword: "",
  });

  if (!currentUser) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const updatedUser = await updateUserProfile(formData);
      setCurrentUser(updatedUser.user); // Update global store
      message.success("Profile updated successfully!");
      setIsEditing(false);
    } catch (error: any) {
      message.error(error.message || "Failed to update profile");
    }
    setLoading(false);
  };

  const renderUserProperty = (label: string, value: any) => (
    <div className="flex flex-col text-sm">
      <span className="text-gray-500">{label}</span>
      <span className="text-gray-800 font-semibold">{value}</span>
    </div>
  );

  return (
    <div>
      <PageTitle title="Profile" />

      {!isEditing ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-7">
            {renderUserProperty("User Id", currentUser?._id)}
            {renderUserProperty("Name", currentUser?.name)}
            {renderUserProperty("Email", currentUser?.email)}
            {renderUserProperty("Joined At", getDateTimeFormat(currentUser.createdAt!))}
            {renderUserProperty("Status", currentUser?.isActive ? "Active" : "Inactive")}
            {renderUserProperty("Role", currentUser?.isAdmin ? "Admin" : "User")}
          </div>

          <div className="flex justify-end mt-5">
            <Button type="primary" onClick={() => setIsEditing(true)}>
              Edit Profile
            </Button>
          </div>
        </>
      ) : (
        <div className="mt-5 p-5 bg-white rounded shadow-md">
          <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input name="name" value={formData.name} onChange={handleChange} placeholder="Name" />
            <Input name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
            <Input.Password name="oldPassword" value={formData.oldPassword} onChange={handleChange} placeholder="Old Password" />
            <Input.Password name="newPassword" value={formData.newPassword} onChange={handleChange} placeholder="New Password" />
          </div>

          <div className="flex justify-end gap-3 mt-4">
            <Button onClick={() => setIsEditing(false)}>Cancel</Button>
            <Button type="primary" onClick={handleSubmit} disabled={loading}>
              {loading ? <Spin /> : "Update Profile"}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfilePage;