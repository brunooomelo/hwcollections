import { Menu, Transition } from "@headlessui/react";
import { DotsThreeVertical } from "@phosphor-icons/react";
import { Fragment } from "react";
import { Wishlist } from "../@types";
import cls from 'classnames'

type ItemProps = {
  onCheckHandler: (checked: boolean) => void;
  onEdit: () => void
  onDelete: () => void
} & Wishlist;

export function Item({ name, checked, id, onCheckHandler, onEdit, onDelete }: ItemProps) {
  return (
    <label htmlFor={id} key={id} className="relative  cursor-pointer flex gap-3 py-4 justify-between">
      <div className='flex gap-3 items-center'>
        <input
          id={id}
          name={id}
          type="checkbox"
          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600 cursor-pointer"
          checked={checked}
          onChange={(e) => onCheckHandler(e.target.checked)}

        />
        <div className="flex h-6 items-center">
          <div className="select-none font-medium text-gray-900">
            {name}
          </div>
        </div>
      </div>
      <Menu as="div" className="relative flex-none">
        <Menu.Button className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
          <span className="sr-only">Open options</span>
          <DotsThreeVertical className="h-5 w-5" aria-hidden="true" />
        </Menu.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={onEdit}
                  className={cls(
                    active ? 'bg-gray-50' : '',
                    ' text-start  px-3 py-1 text-sm leading-6 text-gray-900 w-full'
                  )}
                >
                  Edit<span className="sr-only">, {name}</span>
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  className={cls(
                    active ? 'bg-gray-50' : '',
                    'text-start  px-3 py-1 text-sm leading-6 text-gray-900 w-full'
                  )}
                >
                  Move<span className="sr-only">, {name}</span>
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  className={cls(
                    active ? 'bg-gray-50' : '',
                    ' text-start  px-3 py-1 text-sm leading-6 text-gray-900 w-full'
                  )}
                  onClick={onDelete}
                >
                  Delete<span className="sr-only">, {name}</span>
                </button>
              )}
            </Menu.Item>
          </Menu.Items>
        </Transition>
      </Menu>
    </label>
  );
}
