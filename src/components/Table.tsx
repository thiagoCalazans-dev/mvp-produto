import { ChatCenteredText, Cursor, Trash } from "phosphor-react";
import React, { ReactNode } from "react";

interface IProps {
  children: JSX.Element | JSX.Element[] | undefined | string | number | any;
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
  return <table className="w-full h-full flex flex-col shrink">{children}</table>;
};

const Head = ({ children }: IProps) => {
  return (
    <thead>
      <tr className="h-auto flex border-base-100 border-b-2 ">
        {children}
      </tr>
    </thead>
  );
};

const TitleColumns = ({ className, title }: TitleIProps) => {
  return <th className={`w-full ${className}`}>{title}</th>;
};

const Body = ({ children }: IProps) => {
  return <tbody>{children}</tbody>;
};

const Data = ({ className, children }: DataIProps) => {
  return <td className={`w-full text-center ${className}`}>{children}</td>;
};

const Row = ({ children, onDoubleClick }: RowIProps) => {
  return (
    <tr className="h-auto flex justify-around border-b-2 py-1 hover:bg-base-700" onDoubleClick={onDoubleClick}>
      {children}
    </tr>
  );
};

const DeleteButton = ({ onClick }: ButtonIProps) => {
  return (
    <button
      onClick={onClick}
      className="hover:bg-contrast-500 transition-all rounded-full p-1"
    >
      <Trash />
    </button>
  );
};

export const DetailsButton = ({ onClick }: ButtonIProps) => {
  return (
    <button
      onClick={onClick}
      className="hover:bg-brand-500 transition-all rounded-full p-1"
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
};

export default Table;