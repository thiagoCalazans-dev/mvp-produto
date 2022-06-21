import { ReactNode } from "react"

interface ICardProps {
    children: ReactNode;
    className: string;

}

export const Card = ({children, className}: ICardProps) => {
    return <div className={`card ${className}`}>{children}</div>
}