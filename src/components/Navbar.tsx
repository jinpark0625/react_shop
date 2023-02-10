import { Link } from 'react-router-dom';
import { BsFillPencilFill } from 'react-icons/bs';
import User from './User';
import Button from './ui/Button';
import { useAuthContext } from '../context/AuthContext';
import CartStatus from './CartStatus';
import { AiFillGithub } from 'react-icons/ai';
import { SiPrestashop } from 'react-icons/si';
import useUser from '../hooks/useUser';

export default function Navbar() {
  const { ...contextData } = useAuthContext();
  const { user } = contextData;
  const { logOutQuery } = useUser();

  const userData = user ?? null;
  const isAdmin = userData?.isAdmin;

  const logout = () => {
    logOutQuery.mutate();
  };

  return (
    <header className="m-auto grid max-w-screen-2xl grid-cols-[45%_10%_45%]  p-5">
      <div className="flex items-center">
        <Link to="/" className="flex text-2xl">
          <AiFillGithub />
        </Link>
      </div>
      <Link
        to="/"
        className="flex items-center justify-center text-5xl text-brand"
      >
        <SiPrestashop />
      </Link>
      <nav className="flex items-center justify-end gap-4 font-semibold">
        <Link to="/products">Products</Link>
        {userData && (
          <Link to="/carts">
            <CartStatus />
          </Link>
        )}
        {isAdmin && (
          <Link to="/products/new" className="text-2xl">
            <BsFillPencilFill />
          </Link>
        )}
        {userData && <User {...userData} />}
        {!userData && (
          <>
            <Link to="/login">Login</Link>
            <Link
              to="/register"
              className="flex items-center justify-center rounded-full bg-neutral-800 py-2 px-4 text-white hover:brightness-110"
            >
              Register
            </Link>
          </>
        )}
        {userData && <Button onClick={logout} text={'Logout'} />}
      </nav>
    </header>
  );
}
