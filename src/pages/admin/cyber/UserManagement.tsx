import SuperAdminUserManagement from "@/components/admin/super/SuperAdminUserManagement";

export default function UserManagement() {
  return (
    <div className="p-4 max-w-7xl mx-auto space-y-4">
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-[#F9FAFB]">User Management</h1>
        <p className="text-[#9CA3AF]">
          Manage all registered clients and their permissions
        </p>
      </div>
      <SuperAdminUserManagement />
    </div>
  );
}
