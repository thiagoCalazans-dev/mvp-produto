import { CircleNotch } from "phosphor-react"


export const Loading = () => {
    return (
        <div className="flex w-full h-full items-center justify-center overflow-hidden"><CircleNotch weight="bold" className="w-8 h-8 animate-spin"/></div>
    )
}

export const TableLoading = () => {
    return (
        <tbody className="flex w-full h-full items-center justify-center overflow-hidden"><tr><td><CircleNotch weight="bold" className="w-8 h-8 animate-spin"/></td></tr></tbody>
    )
}