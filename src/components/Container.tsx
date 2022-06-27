import { ReactNode } from "react"

interface IContainerProps {
    children: ReactNode;
 }


export const Container = ({children}: IContainerProps) => {
    return  <main className="w-full h-full flex flex-col justify-center items-center py-5 px-16">{children}</main>     
     
}