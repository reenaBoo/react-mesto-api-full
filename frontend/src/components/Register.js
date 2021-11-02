import { useState } from 'react';
import { Link } from 'react-router-dom';

function Register({onSubmit}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleChangeEmail(evt) {
        setEmail(evt.target.value)
    }

    function handleChangePassword(evt) {
        setPassword(evt.target.value)
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        onSubmit({
            email,
            password
        })
    }

    return (
        <form className="form-auth" onSubmit={handleSubmit}>
            <h3 className="form-auth__title">Регистрация</h3>
            <input className="form-auth__input" type="email" placeholder="Email" required value={email || ''} onChange={handleChangeEmail}/>
            <input className="form-auth__input" type="text" placeholder="Пароль" required  value={password || ''} onChange={handleChangePassword}/>
            <button className="form-auth__button">Зарегистрироваться</button>
            <div className="form-auth__text-container">
                <p className="form-auth__caption">Уже зарегистрированы?</p>
                <Link to="/sign-in" className="form-auth__caption form-auth__caption-hover"> &#8194; Войти</Link>
            </div>
        </form>
    )
}
export default Register;