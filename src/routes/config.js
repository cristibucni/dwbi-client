import {
  Storage,
  Person,
  LocationOn,
  Inventory,
  MenuBook,
  ShoppingBag,
  Store,
} from '@mui/icons-material';
import Menus from '../containers/menus';
import Orders from '../containers/orders';
import Dashboard from '../containers/dashboard';
import Customer from '../containers/customer';
import Item from '../containers/item';
import Location from '../containers/location';
import Vendor from '../containers/vendor';

export const routes = [
  {
    href: '/',
    component: Dashboard,
    roles: ['Manager', 'customer', 'employee'],
    name: 'First DB',
    icon: <Storage />,
    description: 'Dashboard panel',
    items: [
      {
        href: '/firstdb/customer',
        component: Customer,
        name: 'Customer',
        icon: <Person />,
      },
      {
        href: '/firstdb/item',
        component: Item,
        name: 'Item',
        icon: <Inventory />,
      },
      {
        href: '/firstdb/location',
        component: Location,
        name: 'Location',
        icon: <LocationOn />,
      },
      {
        href: '/firstdb/menu',
        component: Menus,
        name: 'Menu',
        icon: <MenuBook />,
      },
      {
        href: '/firstdb/order',
        component: Orders,
        roles: ['Manager', 'customer', 'employee'],
        name: 'Order',
        icon: <ShoppingBag />,
        description: 'Place an order',
      },
      {
        href: '/firstdb/vendor',
        component: Vendor,
        name: 'Vendor',
        icon: <Store />,
      },
    ],
  },
  {
    href: '/',
    component: Dashboard,
    roles: ['Manager', 'customer', 'employee'],
    name: 'Second DB',
    icon: <Storage />,
    description: 'Dashboard panel',
    items: [
      {
        href: '/seconddb/item',
        component: Item,
        name: 'Item',
        icon: <Inventory />,
      },
      {
        href: '/seconddb/order',
        component: Orders,
        roles: ['Manager', 'customer', 'employee'],
        name: 'Order',
        icon: <ShoppingBag />,
        description: 'Place an order',
      },
      {
        href: '/seconddb/vendor',
        component: Vendor,
        name: 'Vendor',
        icon: <Store />,
      },
    ],
  },
  {
    href: '/',
    component: Dashboard,
    roles: ['Manager', 'customer', 'employee'],
    name: 'Global DB',
    icon: <Storage />,
    description: 'Dashboard panel',
    items: [
      {
        href: '/globaldb/item',
        component: Item,
        name: 'Item',
        icon: <Inventory />,
      },

      {
        href: '/globaldb/order',
        component: Orders,
        roles: ['Manager', 'customer', 'employee'],
        name: 'Order',
        icon: <ShoppingBag />,
        description: 'Place an order',
      },
      {
        href: '/globaldb/vendor',
        component: Vendor,
        name: 'Vendor',
        icon: <Store />,
      },
    ],
  },
];

export const routeDefinitions = [
  {
    href: '/',
    component: Dashboard,
  },
  {
    href: '/firstdb/order',
    component: Orders,
  },
  {
    href: '/firstdb/customer',
    component: Customer,
  },
  {
    href: '/firstdb/item',
    component: Item,
  },
  {
    href: '/firstdb/location',
    component: Location,
  },
  {
    href: '/firstdb/menu',
    component: Menus,
  },
  {
    href: '/firstdb/vendor',
    component: Vendor,
  },
  {
    href: '/seconddb/order',
    component: Orders,
  },
  {
    href: '/seconddb/item',
    component: Item,
  },

  {
    href: '/seconddb/vendor',
    component: Vendor,
  },
  {
    href: '/globaldb/order',
    component: Orders,
  },

  {
    href: '/globaldb/item',
    component: Item,
  },

  {
    href: '/globaldb/vendor',
    component: Vendor,
  },
];
