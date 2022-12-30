import {
    ADMIN_ROUTE,
    BASKET_ROUTE,
    DEVICE_ROUTE,
    LOGIN_ROUTE,
    MAIN_ROUTE,
    REGISTRATION_ROUTE
} from "./utils/const";
import DevicePage from "./pages/DevicePage";
import Admin from "./pages/Admin";
import Basket from './pages/Basket'
import Shop from "./pages/Shop";
import Auth from "./pages/Auth";
import Registration from "./pages/Registration";

export const routes = [
    {
        path: ADMIN_ROUTE,
        Component: Admin,
        isAuth: true
    },
    {
        path: BASKET_ROUTE,
        Component: Basket,
        isAuth: true
    }, {
        path: MAIN_ROUTE,
        Component: Shop,
        isAuth: false
    },
    {
        path: `${DEVICE_ROUTE}:id`,
        Component: DevicePage,
        isAuth: false
    },
    {
        path: LOGIN_ROUTE,
        Component: Auth,
        isAuth: false
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Registration,
        isAuth: false
    }
]
