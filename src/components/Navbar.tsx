import React, { Fragment, useEffect, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import Link from "next/link";
import { CaretDown, List } from "phosphor-react";

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
  
const [openMenu, setOpenMenu] = useState(false)

  return (
    <header className= "w-full sticky">   
     <nav className="md:flex md:items-center md:justify-between md:p-3 bg-brand-secondary h-auto dark:bg-dark-500 dark:border-dark-500">
      <div className="flex justify-between items-center p-3 md:p-0">
     <Link href="/"><a className="w-auto"><h1 className="font-bold color-base text-3xl">G-LOGO</h1></a></Link>
     <button name={openMenu ? 'close':'menu'} onClick={() => setOpenMenu(!openMenu)} className="h-8 color-base px-1 bg-light-100 ring-light-300 ring-1 rounded-lg flex hover:bg-base-dark dark:bg-dark-500 dark:ring-dark-200 md:invisible"><List size={32} /></button>
     </div>
     <div className={`p-1 md:m-0 border-t-base md:border-none md:p-0 ${openMenu? 'block' : 'hidden'} md:flex`}>
     <ul className={`flex flex-col md:flex-row items-center gap-1 py-1 md:py-0 md:static md:z-auto z-[-1] w-full md:w-auto transition-all duration-500 ease-in bg-brand-secondary
dark:bg-dark-500 dark:border-dark-500`}>
        {Object.entries(Navitens).map(([navmenu, navitens]) => {
          return (
            <li key={navmenu} className="w-full">
              <Menu as="div" className="relative p-1 text-left w-full">
                <Menu.Button
                  className="w-full font-semibold color-base px-2 py-1 bg-light-100 ring-light-300 ring-1 rounded-lg flex  justify-center items-end hover:bg-base-dark dark:bg-dark-500 dark:ring-dark-200"
                >
                  {navmenu}<CaretDown weight="bold"/>
                </Menu.Button>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-100"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-100"
                >
                  <Menu.Items className="md:absolute font-medium color-base flex flex-col w-full mt-2 origin-top-right rounded-lg bg-light-300 dark:bg-dark-500 dark:border-dark-200 border-light-700 border-[1px] shadow-lg">
                    {Object.entries(navitens).map(([navitem, value]) => {
                      return (
                        <Menu.Item key={navitem}>
                          {({ active }) => (
                            <div
                              className={`${
                                active && "bg-base-dark"
                              } w-full text-center md:text-left px-2 my-1`}                              
                            >
                              <Link href={value.href}>
                                <a onClick={() => setOpenMenu(false)} className="grow">{value.name}</a>
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
      </nav>
    </header>
  );
};