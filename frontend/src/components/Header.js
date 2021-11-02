import React from 'react';
import {Link, Route, Switch} from "react-router-dom";

function Header({userAuth, handleLogout}) {
  return (
      <header className="header">
          <Link to='/' className="header__logo"></Link>
          <div className="header__auth">
            <Switch>
                <Route exact path="/">
                    <p className="header__style">{userAuth.email}&#8194; | &#8194;</p>
                    <Link onClick={handleLogout} className="header__button" to="sign-in">Выйти</Link>
                </Route>
                <Route path="/sign-up">
                    <Link className="header__style" to="sign-in">Войти</Link>
                </Route>
                <Route path="/sign-in">
                    <Link className="header__style" to="sign-up">Регистрация</Link>
                </Route>
            </Switch>
        </div>
    </header>
  )
}

export default Header;