import firebase from 'firebase/compat/app';
import * as firebaseui from 'firebaseui';
import 'firebaseui/dist/firebaseui.css';
import { useContext, useEffect } from 'react';
import { auth } from '../../firebase/setup';
import AuthContext from '../AuthProvider/AuthContext';

type Props = {};

function AuthLogin() {

  const { redirectUrl } = useContext(AuthContext);

  useEffect(() => {
    if(firebase){
    const ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(auth);
    const uiConfig = {
      signInFlow: 'popup',
      signInSuccessUrl: redirectUrl,     
      signInOptions: [
        {
          provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
          requireDisplayName: false
        },
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.FacebookAuthProvider.PROVIDER_ID
      ]
    };
    ui.start('#firebaseuiAuthContainer', uiConfig);
  }
  }, [])
  

  return (
    <div>
      <div id="firebaseuiAuthContainer"></div>
    </div>
  );
}

export default AuthLogin;
