import Link from 'next/link';
import React from 'react'
import AuthContext from '../AuthProvider/AuthContext';

type Props = {}

const LoginState = (props: Props) => {
  const { isAuthenticated, user, logout, setRedirectUrl } = React.useContext(AuthContext);
  return (
    <div>
      {isAuthenticated ? (
        <div>
          <span>Logged in as {user.email}</span>
          <button onClick={logout}>Logout</button>
        </div>
      ) : 
        <Link  href="/login">
          <a onClick={(e) => setRedirectUrl(window.location.href)}>Login</a>
          </Link>
     }
    </div>
  )
}

export default LoginState