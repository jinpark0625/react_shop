import { Link } from 'react-router-dom';
import { FiShoppingBag } from 'react-icons/fi';
import { BsFillPencilFill } from 'react-icons/bs';
import User from './User';
import Button from './ui/Button';
import { useAuthContext } from './context/AuthContext';

export default function Navbar() {
  const { ...contextData } = useAuthContext();
  const { user, login, logout } = contextData;
  const userData = user ?? null;
  const isAdmin = userData ? 'isAdmin' in userData : null;

  return (
    <header className="flex justify-between border-b border-gray-300 p-2 ">
      <Link to="/" className="flex items-center text-4xl text-brand">
        <FiShoppingBag />
        <h1>Shoppy</h1>
      </Link>
      <nav className="flex items-center gap-4 font-semibold">
        <Link to="/products">Products</Link>
        {userData && <Link to="/carts">Carts</Link>}
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
