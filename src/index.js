import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import UserStore from "./store/UserStore";
import DeviceStore from "./store/DeviceStore";
import {QueryClient, QueryClientProvider} from "react-query";
import CartStore from "./store/CartStore";

const queryClient = new QueryClient({
    defaultOptions: {queries: {refetchOnWindowFocus: false}}
})
export const Context = createContext(null)
const cart = new CartStore()
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <Context.Provider value={{user: new UserStore(), device: new DeviceStore(), cart}}>
                <BrowserRouter>
                    <App/>
                </BrowserRouter>
            </Context.Provider>
        </QueryClientProvider>
    </React.StrictMode>
);
