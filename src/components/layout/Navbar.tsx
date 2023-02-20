import { useState, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';
import useUser from '../../hooks/useUser';
import MenuMobile from './MenuMobile';
import MenuDesktop from './MenuDesktop';

export default function Navbar() {
  const { ...contextData } = useAuthContext();
  const { user, loading } = contextData;
  const { logOutQuery } = useUser();

  const userData = user ?? null;
  const isAdmin = userData?.isAdmin;

  const navigate = useNavigate();

  const logout = () => {
    logOutQuery.mutate();
  };

  const [open, setOpen] = useState(false);

  const buttonRef = useRef<HTMLButtonElement>(null);
  const timeoutDuration = 200;
  let timeout: string | number | NodeJS.Timeout | undefined;

  const closePopover = () => {
    return buttonRef.current?.dispatchEvent(
      new KeyboardEvent('keydown', {
        key: 'Escape',
        bubbles: true,
        cancelable: true,
      }),
    );
  };

  const onMouseEnter = (open: boolean) => {
    clearTimeout(timeout);
    if (open) return;
    return buttonRef.current?.click();
  };

  const onMouseLeave = (open: boolean) => {
    if (!open) return;
    timeout = setTimeout(() => closePopover(), timeoutDuration);
  };

  const classNames = useCallback((...classes: string[]) => {
    return classes.filter(Boolean).join(' ');
  }, []);

  return (
    <header className="border-b">
      <MenuMobile
        open={open}
        classNames={classNames}
        setOpen={setOpen}
        userData={userData}
        navigate={navigate}
        loading={loading}
        logout={logout}
        isAdmin={isAdmin}
      />
      <MenuDesktop
        classNames={classNames}
        setOpen={setOpen}
        userData={userData}
        navigate={navigate}
        loading={loading}
        logout={logout}
        isAdmin={isAdmin}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        ref={buttonRef}
      />
    </header>
  );
}
