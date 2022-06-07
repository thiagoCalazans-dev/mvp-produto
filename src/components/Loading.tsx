import { CircleNotch } from "phosphor-react"

export const Loading = () => {
    return (
        <div className="flex items-center justify-center overflow-hidden"><CircleNotch weight="bold" className="w-8 h-8 animate-spin"/></div>
    )
}