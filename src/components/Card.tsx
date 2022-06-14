import { ReactNode } from "react"

interface ICardProps {
    children: ReactNode
}

export const Card = ({children}: ICardProps) => {
    return <div className="bg-light-100 border-[1px] border-light-700 dark:bg-dark-500 p-5 rounded-lg">{children}</div>
}