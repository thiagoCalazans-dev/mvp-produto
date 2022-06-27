import { ArrowFatLineLeft, ArrowFatLineRight, ChatCenteredText, Cursor, Trash } from "phosphor-react";
import React, { ReactNode } from "react";

interface IProps {
  children: JSX.Element | JSX.Element[] | undefined | string | number | any;
  className?: string
} 
interface IFooterProps {
  className?: string,
  rigthClick: () => void,
  leftClick: () => void,
  page: number,
  totalPages: number,
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

const Container = ({ children, className }: IProps) => {
  return <table className={`table-auto w-full h-full flex flex-col border-base rounded-lg shrink overflow-hidden ${className}`}>{children}</table>;
};

const Head = ({ children }: IProps) => {
  return (
    <thead>
      <tr className="flex h-auto w-full border-b-base  bg-brand-primary text-light-100 truncate">
        {children}
      </tr>
    </thead>
  );
};

const TitleColumns = ({ className, title }: TitleIProps) => {
  return <th className={`px-1  ${className}`}>{title}</th>;
};

const Body = ({ children, className }: IProps) => {
  return <tbody className={`flex-1 ${className}`}>{children}</tbody>;
};

const Data = ({ className, children }: DataIProps) => {
  return <td className={`text-left px-1 ${className} truncate`}>{children}</td>;
};

const Row = ({ children, onDoubleClick }: RowIProps) => {
  return (
    <tr className="flex text-ellipsis h-auto  border-b-base border-light-700 dark:border-dark-200 hover:bg-base-dark whitespace-nowrap" onDoubleClick={onDoubleClick}>
      {children}
    </tr>
  );
};
const Footer = ({leftClick, rigthClick, page, totalPages}: IFooterProps) => {
  return <tfoot className="h-auto rounded-b-lg bg-brand-primary text-light-100 truncate py-1 px-3">
    <tr className="flex justify-center items-center" >
      <td>
        <button onClick={leftClick}
        className="bg-light-300 p-1 rounded-lg shadow-md hover:bg-opacity-30 focus:outline-none
            transition duration-200"><ArrowFatLineLeft  size={16} color="#00466f" weight="fill"/></button>    
      </td>
      <td className="flex flex-1 items-center justify-center h-full">
        <span className="h-full">página {page} de {totalPages}</span> 
      </td>
      <td>
        <button 
        onClick={rigthClick}
        className="bg-light-300 p-1 rounded-lg shadow-md hover:bg-opacity-30 focus:outline-none
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
      onClick={() => onClick}
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