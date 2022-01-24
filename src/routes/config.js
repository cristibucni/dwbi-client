import Dashboard from '../containers/dashboard';
import { Receipt, Summarize, Paid } from '@mui/icons-material';
import Menus from '../containers/menus';
import { Reports } from '../containers/reports';

export const routes = [
  {
    href: '/dashboard',
    component: Dashboard,
    roles: ['Manager, customer, employee'],
    name: 'Orders',
    icon: <Receipt />,
  },
  {
    href: '/menus',
    component: Menus,
    roles: ['Manager, customer, employee'],
    name: 'Menus',
    icon: <Receipt />,
  },
  {
    href: '/sales',
    component: Dashboard,
    roles: ['Manager'],
    name: 'Sales',
    icon: <Paid />,
  },
  {
    href: '/reports',
    component: Reports,
    roles: ['Manager'],
    name: 'Reports',
    icon: <Summarize />,
  },
];
