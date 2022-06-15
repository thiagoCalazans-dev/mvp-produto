import React, { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import Link from "next/link";
import { CaretDown } from "phosphor-react";

const Navitens = {
  Cadastro: {
    1: {
      name: "Grupo",
      href: "/cadastro/grupo",
    },
    2: {
      name: "Produto",
      href: "/cadastro/produto",
    },
  },
  Relatórios: {
    1: {
      name: "Estoque",
      href: "/relatorios/estoque",
    },
  },
};

export const Navbar = () => {
  return (
    <header className="bg-brand-secondary-light flex justify-between py-2 z-10 dark:bg-dark-500 dark:border-dark-500">
     <Link href="/"><a><h1 className="font-bold color-base text-3xl ml-3">G-LOGO</h1></a></Link> 
      <ul className="flex items-center">
        {Object.entries(Navitens).map(([navmenu, navitens]) => {
          return (
            <li key={navmenu} className="px-2">
              <Menu as="div" className="relative inline-block text-left">
                <Menu.Button
                  className="font-semibold color-base px-2 py-1 bg-light-100 ring-light-300 ring-1 rounded-lg flex  items-end gap-2 hover:bg-base-dark dark:bg-dark-500 dark:ring-dark-200"
                >
                  {navmenu}<CaretDown weight="bold"/>
                </Menu.Button>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="font-medium color-base flex flex-col  w-auto min-w-full absolute right-0 mt-2 origin-top-right rounded-lg bg-light-300 dark:bg-dark-500 dark:border-dark-200 border-light-700 border-[1px] shadow-lg">
                    {Object.entries(navitens).map(([navitem, value]) => {
                      return (
                        <Menu.Item key={navitem}>
                          {({ active }) => (
                            <div
                              className={`${
                                active && "bg-base-dark"
                              } flex items-center w-full px-2 my-1`}
                            >
                              <Link href={value.href}>
                                <a className="grow">{value.name}</a>
                              </Link>
                            </div>
                          )}
                        </Menu.Item>
                      );
                    })}
                  </Menu.Items>
                </Transition>
              </Menu>
            </li>
          );
        })}
      </ul>
    </header>
  );
};