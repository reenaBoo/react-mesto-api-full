import { useState } from 'react';

function Login({onSubmit}) {
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
            <h3 className="form-auth__title">Вход</h3>
            <input className="form-auth__input" type="email" placeholder="Email" required value={email || ''} onChange={handleChangeEmail}/>
            <input className="form-auth__input" type="text" placeholder="Пароль" required  value={password || ''} onChange={handleChangePassword}/>
            <button className="form-auth__button">Войти</button>
        </form>
    )
}
export default Login;