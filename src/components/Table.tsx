import { ArrowFatLineLeft, ArrowFatLineRight, ChatCenteredText, Cursor, Trash } from "phosphor-react";
import React, { ReactNode } from "react";

interface IProps {
  children: JSX.Element | JSX.Element[] | undefined | string | number | any;
  className?: string
} 
interface IFooterProps {
  className?: string
}

interface RowIProps {
  onDoubleClick?: () => void
  children: JSX.Element | JSX.Element[] | undefined | string | number | any;
}

interface ButtonIProps {
    onClick?: () => void;
}

interface TitleIProps {
    className?: string
    title: string
}

interface DataIProps {
    className?: string
    children: JSX.Element | JSX.Element[] | undefined | string | number;
}

const Container = ({ children }: IProps) => {
  return <table className="table-auto w-full h-full flex flex-col border-base rounded-lg  shrink">{children}</table>;
};

const Head = ({ children }: IProps) => {
  return (
    <thead>
      <tr className="flex h-auto border-b-base rounded-t-lg bg-brand-primary text-light-100 truncate">
        {children}
      </tr>
    </thead>
  );
};

const TitleColumns = ({ className, title }: TitleIProps) => {
  return <th className={`w-full px-1  ${className}`}>{title}</th>;
};

const Body = ({ children, className }: IProps) => {
  return <tbody className={className}>{children}</tbody>;
};

const Data = ({ className, children }: DataIProps) => {
  return <td className={`w-full text-left px-1 ${className} truncate`}>{children}</td>;
};

const Row = ({ children, onDoubleClick }: RowIProps) => {
  return (
    <tr className="flex text-ellipsis h-auto justify-around border-x-[1px] border-b-[1px] border-light-700 dark:border-dark-200 hover:bg-base-dark whitespace-nowrap" onDoubleClick={onDoubleClick}>
      {children}
    </tr>
  );
};
const Footer = ({ className }: IFooterProps) => {
  return <tfoot className="h-auto border-t-base rounded-b-lg bg-brand-primary text-light-100 truncate">
    <tr className="flex justify-center items-center" >
      <td>
        <button className="bg-light-300 p-1 rounded-lg shadow-md hover:bg-opacity-30 focus:outline-none
            transition duration-200"><ArrowFatLineLeft  size={16} color="#00466f" weight="fill"/></button>    
      </td>
      <td className="flex gap-x-2 items-center justify-center h-auto">
        <input type="text" className="input w-7 h-7 item-center"/>
        <span>de x.length</span> 
      </td>
      <td>
        <button className="bg-light-300 p-1 rounded-lg shadow-md hover:bg-opacity-30 focus:outline-none
            transition duration-200"><ArrowFatLineRight  size={16} color="#00466f" weight="fill"/></button>    
      </td>
    </tr>
  </tfoot>;
};

const DeleteButton = ({ onClick }: ButtonIProps) => {
  return (
    <button
      onClick={onClick}
      className="hover:bg-contrast-primary transition-all rounded-full p-1"
    >
      <Trash />
    </button>
  );
};

export const DetailsButton = ({ onClick }: ButtonIProps) => {
  return (
    <button
      onClick={onClick}
      className="hover:bg-brand-primary transition-all rounded-full p-1"
    >
      <ChatCenteredText />
    </button>
  );
};


export const SelectButton = ({ onClick }: ButtonIProps) => {
  return (
    <button
      onClick={onClick}
      className="hover:bg-brand-500 transition-all rounded-full p-1"
    >
      <Cursor />
    </button>
  );
};

const Table = {
  Container,
  Head,
  TitleColumns,
  Body,
  Row,
  Data,
  DeleteButton,
  DetailsButton,
  SelectButton,
  Footer,
};

export default Table;