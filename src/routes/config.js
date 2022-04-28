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
    name: 'First DB',
    icon: <Storage />,
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
        name: 'Order',
        icon: <ShoppingBag />,
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
    name: 'Second DB',
    icon: <Storage />,
    items: [
      {
        href: '/seconddb/item',
        component: Item,
        name: 'Item',
        icon: <Inventory />,
      },
      {
        href: '/seconddb/menu',
        component: Menus,
        name: 'Menu',
        icon: <MenuBook />,
      },
      {
        href: '/seconddb/order',
        component: Orders,
        name: 'Order',
        icon: <ShoppingBag />,
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
    name: 'Global DB',
    icon: <Storage />,
    items: [
      {
        href: '/globaldb/customer',
        component: Customer,
        name: 'Customer',
        icon: <Person />,
      },
      {
        href: '/globaldb/item',
        component: Item,
        name: 'Item',
        icon: <Inventory />,
      },
      {
        href: '/globaldb/location',
        component: Location,
        name: 'Location',
        icon: <LocationOn />,
      },
      {
        href: '/globaldb/menu',
        component: Menus,
        name: 'Menu',
        icon: <MenuBook />,
      },
      {
        href: '/globaldb/order',
        component: Orders,
        name: 'Order',
        icon: <ShoppingBag />,
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

const collect = (array, result) => {
  array.forEach((el) => {
    if (el.items) {
      collect(el.items, result);
    } else {
      result.push({ href: el.href, component: el.component });
    }
  });
};

const parsedRoutes = [];
collect(routes, parsedRoutes);
export const routeDefinitions = [
  { href: '/', component: Dashboard },
  ...parsedRoutes,
];
