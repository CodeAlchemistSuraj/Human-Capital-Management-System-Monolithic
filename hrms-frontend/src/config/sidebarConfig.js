// src/config/sidebarConfig.js

export const allSidebarItems = [
  // Employee Sidebar Items
  { label: "Dashboard", href: "/employee-dashboard", roles: ["EMPLOYEE"] },
  { label: "Leaves", href: "/leaves", roles: ["EMPLOYEE"] },
  { label: "Payroll", href: "/payroll", roles: ["EMPLOYEE"] },
  { label: "Profile", href: "/profile", roles: ["EMPLOYEE"] },

  // Admin Sidebar Items
  { label: "Dashboard", href: "/admin-dashboard", roles: ["ADMIN"] },
  { label: "Users", href: "/users", roles: ["ADMIN"] },
  { label: "Settings", href: "/settings", roles: ["ADMIN"] },

  // HR Sidebar Items (Reordered as requested)
  { label: "Dashboard", href: "/hr-dashboard", roles: ["HR"] },
  { label: "Recruitment", href: "/recruitment", roles: ["HR"] },
  { label: "Onboarding", href: "/onboarding", roles: ["HR"] },
  { label: "Training", href: "/training", roles: ["HR"] },
  { label: "Employee Directory", href: "/employee-directory", roles: ["HR"] },
  { label: "Employee Requests", href: "/employee-requests", roles: ["HR"] },
  { label: "Payroll", href: "/payroll", roles: ["HR"] },
  { label: "Performance", href: "/performance", roles: ["HR"] },
  { label: "Time & Attendance", href: "/time-attendance", roles: ["HR"] },
  { label: "Reports", href: "/reports", roles: ["HR"] },
  { label: "Benefits", href: "/benefits", roles: ["HR"] },
];

// Helper function to get sidebar items for a specific role
export const getSidebarItemsForRole = (role) => {
  if (!role) return [];
  // Filter items that include the given role
  const items = allSidebarItems.filter(item => item.roles.includes(role));
  
  // Optional: If you have duplicate "Dashboard" or "Payroll" links
  // from different roles, and a user has multiple roles,
  // you might want to deduplicate here based on 'href' or 'label'.
  // For now, this will return all items relevant to the role.

  return items;
};