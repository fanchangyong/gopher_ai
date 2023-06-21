'use client'

import { FC, ReactNode, useEffect } from "react";
import { useRouter } from 'next/navigation';
import NavMenu from "./nav_menu";
import { useAuth } from "../contexts";

type Props = {
  children: ReactNode;
};

const Layout: FC<Props> = ({ children }) => {
  const router = useRouter();
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/login');
    }
  }, [isLoggedIn, router]);

  return (
    <div className="flex h-full">
      <div className="border-r border-slate-400">
        <NavMenu />
      </div>
      <div className="w-full px-8 py-8">
        {children}
      </div>
    </div>
  );
};

export default Layout;
