
import { createContext } from "react";
import { IProdutoContext } from "./interface";

export const ProdutoContext = createContext<IProdutoContext>({} as IProdutoContext);