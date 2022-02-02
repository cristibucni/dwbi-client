import Dashboard from '../containers/dashboard';
import { Receipt, Summarize, Paid, Home, MenuBook } from '@mui/icons-material';
import Menus from '../containers/menus';
import { Reports } from '../containers/reports';
import Orders from '../containers/orders';

export const routes = [
  {
    href: '/dashboard',
    component: Orders,
    roles: ['Manager, customer, employee'],
    name: 'Home',
    icon: <Home />,
    description: 'Dashboard panel',
  },
  {
    href: '/orders',
    component: Orders,
    roles: ['Manager, customer, employee'],
    name: 'Orders',
    icon: <Receipt />,
    description: "Manage orders, keep track of what's new",
  },
  {
    href: '/menus',
    component: Menus,
    roles: ['Manager, customer, employee'],
    name: 'Menus',
    icon: <MenuBook />,
    description: 'Place an order',
  },
  {
    href: '/sales',
    component: Dashboard,
    roles: ['Manager'],
    name: 'Sales',
    icon: <Paid />,
    description: 'Manage sales, expenses',
  },
  {
    href: '/reports',
    component: Reports,
    roles: ['Manager'],
    name: 'Reports',
    icon: <Summarize />,
    description: 'Check out full detailed reports from our DW',
  },
];
