import { ButtonHTMLAttributes } from "react"
import cls from 'classnames'

type ButtonProps = {

} & React.ButtonHTMLAttributes<HTMLButtonElement>

export const Button = ({ children, className, ...props }: ButtonProps) => {
  return (
    <button
      className={
        cls(
          "px-3 py-1.5 flex w-full items-center justify-center gap-3 rounded-md bg-[#24292F] text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#24292F]",
          className
        )
      }
      {...props}
    >
      {children}
    </button >
  )
}
