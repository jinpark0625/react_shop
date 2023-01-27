import { React } from 'react';
import { Link } from 'react-router-dom';
import { FiShoppingBag } from 'react-icons/fi';
import { BsFillPencilFill } from 'react-icons/bs';

const NavBar = () => {
  return (
    <header className="h2-d flex justify-between">
      <Link to="/">
        <FiShoppingBag />
        <h1>Shoppy</h1>
      </Link>
      <nav className="h-3x">
        <Link to="/products">Products</Link>
        <Link to="/carts">Carts</Link>
        <Link to="/products/new">
          <BsFillPencilFill />
        </Link>
        <button>Login</button>
      </nav>
    </header>
  );
};

export default NavBar;
