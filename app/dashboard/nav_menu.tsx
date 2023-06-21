import { FC } from "react";
import { Button } from "@/components/ui/button"
import Link from 'next/link'

const NavMenu: FC = () => {
    const menus = [
      {
        name: "Agents",
        path: "/dashboard/agents",
      },
      {
        name: "Settings",
        path: "/dashboard/settings",
      },
    ];

    return (
      <div className="px-4 py-6">
        <h2 className="font-bold">Gopher AI</h2>
        <ul className="mt-8">
          {menus.map((menu) => (
            <li key={menu.path} className="mt-2">
              <Button variant="outline" className="w-full">
                <Link href={menu.path}>
                    {menu.name}
                </Link>
              </Button>
            </li>
          ))}
        </ul>
      </div>
    );
};

export default NavMenu; 