import { Link } from 'react-router-dom';
import { BsFillPencilFill } from 'react-icons/bs';
import User from './User';
import Button from './ui/Button';
import { useAuthContext } from '../context/AuthContext';
import CartStatus from './CartStatus';
import { AiFillGithub } from 'react-icons/ai';
import { SiPrestashop } from 'react-icons/si';

export default function Navbar() {
  const { ...contextData } = useAuthContext();
  const { user, login, logout } = contextData;
  const userData = user ?? null;
  const isAdmin = userData ? 'isAdmin' in userData : null;

  return (
    <header className="m-auto grid max-w-screen-2xl grid-cols-[45%_10%_45%] border-b border-gray-300 p-5">
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
        {Boolean(isAdmin) && (
          <Link to="/products/new" className="text-2xl">
            <BsFillPencilFill />
          </Link>
        )}
        {userData && <User {...userData} />}
        {!userData && <Button onClick={login} text={'Login'} />}
        {userData && <Button onClick={logout} text={'Logout'} />}
      </nav>
    </header>
  );
}
