const ORDER_STATUSES = {
  New: 0,
  Paid: 1,
  Shipped: 2,
  Returned: 3,
  Complete: 4,
};

export const ALL_ROLES = ['Manager', 'employee', 'customer'];

export const isManager = (user) => user.role === 'Manager';
export const isCustomer = (user) => user.role === 'customer';
export const isEmployee = (user) => user.role === 'employee';

export const tableConfig = {
  rowsPerPageOptions: [10, 20, 30, 50, 100],
  checkboxSelection: false,
};

export { ORDER_STATUSES };
