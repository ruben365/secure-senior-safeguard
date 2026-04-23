import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SiteSettings from "./settings/SiteSettings";
import EmailSettings from "./settings/EmailSettings";
import PaymentSettings from "./settings/PaymentSettings";
import SuperAdminUserManagement from "@/components/admin/super/SuperAdminUserManagement";

// Discount Codes tab/route removed Phase 4.9d — `discount_codes` table was
// dropped and the product policy is "no free / no discounts" (only the
// veteran flag in payments survives, and that's a separate flow).

const Settings = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const currentTab = location.pathname.split("/").pop() || "site";

  return (
    <div className="p-4 max-w-7xl mx-auto space-y-4">
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-[#F9FAFB]">Settings</h1>
        <p className="text-[#9CA3AF]">
          Manage your site configuration and preferences
        </p>
      </div>

      <Tabs
        value={currentTab}
        onValueChange={(value) => navigate(`/admin/settings/${value}`)}
      >
        <TabsList className="grid w-full grid-cols-4 bg-[#111827]">
          <TabsTrigger value="site">Site Settings</TabsTrigger>
          <TabsTrigger value="email">Email Settings</TabsTrigger>
          <TabsTrigger value="payment">Payment Settings</TabsTrigger>
          <TabsTrigger value="users">User Management</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="bg-[#111827] border border-gray-800 rounded-lg shadow-sm p-4">
        <Routes>
          <Route
            index
            element={<Navigate to="/admin/settings/site" replace />}
          />
          <Route path="site" element={<SiteSettings />} />
          <Route path="email" element={<EmailSettings />} />
          <Route path="payment" element={<PaymentSettings />} />
          <Route path="users" element={<SuperAdminUserManagement />} />
        </Routes>
      </div>
    </div>
  );
};

export default Settings;
