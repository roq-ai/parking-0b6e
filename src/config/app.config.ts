interface AppConfigInterface {
  ownerRoles: string[];
  customerRoles: string[];
  tenantRoles: string[];
  tenantName: string;
  applicationName: string;
  addOns: string[];
  ownerAbilities: string[];
  customerAbilities: string[];
}
export const appConfig: AppConfigInterface = {
  ownerRoles: ['Business Owner'],
  customerRoles: ['Guest'],
  tenantRoles: ['Business Owner', 'Parking Manager', 'Cashier', 'System Administrator'],
  tenantName: 'Organization',
  applicationName: 'Parking',
  addOns: ['file upload', 'chat', 'notifications', 'file'],
  customerAbilities: ['View total cost of parking'],
  ownerAbilities: [
    'Manage Organization profile',
    'Invite Parking Managers, Cashiers, and System Administrators to the Organization',
    'Manage user profiles within the Organization',
  ],
};
