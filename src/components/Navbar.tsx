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
};

export const Navbar = () => {
  return (
    <div className="w-screen flex justify-between bg-base-800 py-4 px-4 ">
      <h1 className="font-bold text-3xl border-b-4 border-brand-500 ">  G-ALMOX  </h1>
      <ul className="flex items-center">
        {Object.entries(Navitens).map(([navmenu, navitens]) => {
          return (
            <li key={navmenu} className="px-2">
              <Menu as="div" className="relative inline-block text-left">
                <Menu.Button
                  className={`bg-brand-500 font-bold rounded-md px-4 py-2 text-sm  hover:bg-opacity-30 flex  items-end gap-2`}
                >
                  {navmenu} <CaretDown weight="bold" />
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
                  <Menu.Items className="flex flex-col  w-auto min-w-full absolute right-0 mt-2 origin-top-right rounded-md bg-base-700 shadow-lg p-2 ">
                    {Object.entries(navitens).map(([navitem, value]) => {
                      return (
                        <Menu.Item key={navitem}>
                          {({ active }) => (
                            <div
                              className={`${
                                active && "bg-brand-500"
                              } flex items-center rounded-md px-2 py-2`}
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
    </div>
  );
};