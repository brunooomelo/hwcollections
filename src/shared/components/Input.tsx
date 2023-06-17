import { InputHTMLAttributes, useState } from "react"
import { Control, useController } from "react-hook-form"

type Props = {
  name: string
  label: string
  control: Control<any>
} & InputHTMLAttributes<HTMLInputElement>

export const Input = ({ control, name, className, label, placeholder, ...props }: Props) => {
  const { field: { onBlur,
    onChange,
    value },
    fieldState: { error } } = useController({
      name,
      control
    })
  return (
    <div className="relative mt-2">
      <label
        htmlFor={name}
        className="absolute -top-2 left-2 inline-block bg-white px-1 text-xs font-medium text-gray-900 text-uppercase"
      >
        {label}
      </label>
      <input
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        placeholder={placeholder}
        {...props}
      />
      {
        error?.message && (
          <p className="mt-2 text-sm text-red-600" id="email-error">
            {error?.message}
          </p>
        )
      }
    </div>
  )
}
