import React, {useContext, useEffect, useState} from 'react';
import {Route, Routes} from 'react-router-dom'
import * as routes from '../routes'
import ForbiddenPage from "../pages/ForbiddenPage";

import {Context} from "../index";
import {checkAuth} from "../api/userApi";
import {Spinner} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {getAllDevices} from "../api/deviceApi";


const AppRouter = observer(() => {
    const {user,device} = useContext(Context)
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
         const checkToken = async () => {
            try {
                const response = await checkAuth()
                if (response) {
                    localStorage.setItem('token', response.token)
                    user.setIsAuth(true)
                }
            } catch (e) {
                if (e.response.status === 401) {
                    user.setIsAuth(false)
                    localStorage.removeItem('token')
                }
            } finally {
                setIsLoading(false)
            }
        }

        checkToken()


    }, [])


    return (


        isLoading ? <Spinner/> : <Routes>
            {routes.routes.map(route => {
                if (route.isAuth && user.user?.isAuth === false) return <Route key={'Key' + route.path} path={'*'}
                                                                               element={<ForbiddenPage/>}/>
                return <Route path={route.path} element={<route.Component/>} key={`route ${route.path}`}/>
            })}
        </Routes>


    );
});

export default AppRouter;
