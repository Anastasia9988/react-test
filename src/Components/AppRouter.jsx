import React, {useContext} from 'react';
import { Navigate, Route, Routes } from "react-router-dom";
import { publicRoutes, privateRoutes } from "../Router/Router_Index";
import {AuthContext} from "../Context";
import Loader from "./UI/Loader/Loader";

const AppRouter = () => {
    const {isAuth, isLoading} = useContext(AuthContext);
    console.log(isAuth);

    if (isLoading) {
        return <Loader/>
    }

    return (
        isAuth
            ? <Routes>
                {privateRoutes.map(route => {
                    const Component = route.component;
                    return (
                        <Route
                            key={route.path}
                            path={route.path}
                            element={<Component />}
                        />
                    );
                })}
                <Route path="*" element={<Navigate to="/posts" />} />
             </Routes>
            : <Routes>
                {publicRoutes.map(route => {
                    const Component = route.component;
                    return (
                        <Route
                            key={route.path}
                            path={route.path}
                            element={<Component />}
                        />
                    );
                })}
                <Route path="*" element={<Navigate to="/login" />} />
            </Routes>

    );

 };

export default AppRouter;