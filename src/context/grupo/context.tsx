import { createContext } from "react";
import { IGrupoContext } from "./interface";


export const GrupoContext = createContext<IGrupoContext>({} as IGrupoContext);

