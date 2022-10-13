import dynamic from 'next/dynamic'

type Props = {};

const AuthLogin = dynamic(
    () => import("../../components/Nav/AuthLogin"),
    { ssr: false }
  );

const Login = () => {
    return (
      <div>
        Hello
        <AuthLogin />
      </div>
    )
  }

export default Login;
