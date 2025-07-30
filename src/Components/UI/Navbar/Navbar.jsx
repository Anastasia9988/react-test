import React, {useContext} from 'react';
import {Link} from "react-router-dom";
import MyButton from "../Button/MyButton";
import {AuthContext} from "../../../Context";

const Navbar  = () => {
        const {setIsAuth} = useContext(AuthContext);

        const logout = () => {
            setIsAuth(false);
            localStorage.removeItem('auth');
        }

        return (
            <div className="navbar">
                <MyButton onClick={logout}>
                    Выйти
                </MyButton>
                <div className="navbar__links">
                    <Link
                        className='navbar__links__item'  to="/about">
                        О сайте
                    </Link>
                    <Link
                        className='navbar__links__item' to="/posts">
                        Посты
                    </Link>
                </div>
            </div>
        );
};

export default Navbar;