import {
  ActionIcon,
  Button,
  Flex,
  Group,
  Input,
  Modal,
  Textarea,
} from "@mantine/core";
import { Fragment, useEffect, useState } from "react";
import { nanoid } from "nanoid";
import { useDisclosure, useLocalStorage } from "@mantine/hooks";
import { DotsThreeVertical, DownloadSimple, FloppyDisk } from "@phosphor-icons/react";
import { Header } from "../../../shared/components/Header";
import { Menu, Transition } from "@headlessui/react";
import { Wishlist } from "../@types";

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ')
}


export function Home() {
  const [checkIfNeedSave, setCheckIfNeedSave] = useState(false);
  const [addHotWheelsModalOpened, addHotWheelsModal] = useDisclosure();
  const [importModalOpened, importModal] = useDisclosure();
  const [hws, setHws] = useState<Wishlist[]>([]);
  const [input, setInput] = useState("");
  const [localStorageValue, setLocalStorage] = useLocalStorage<Wishlist[]>({
    key: "hotwheels",
    defaultValue: [],
  });

  const handlerSubmit = () => {
    if (!input) return;
    setHws((prev) => [
      ...prev,
      {
        id: nanoid(),
        name: input.toUpperCase(),
        checked: false,
      },
    ]);
    setInput("");
    setCheckIfNeedSave(true);
    addHotWheelsModal.close();
  };

  const importHandleSubmit = () => {
    if (!input) return;
    const hotWheelsImported = input
      .split("\n")
      .map((hotWheel) => hotWheel.trim())
      .filter((hotWheel) => !!hotWheel)
      .filter((hotWheel) => !hws.some((hw) => hotWheel.includes(hw.name)))
      .map(
        (hotWheel) =>
        ({
          id: nanoid(),
          name: hotWheel,
          checked: false,
        } as Wishlist)
      );

    setHws((prev) => [...prev, ...hotWheelsImported]);
    setCheckIfNeedSave(true);
    setInput("");
    importModal.close();
  };

  const changeCheckedById = (id: string, checked: boolean) => {
    setHws((prev) =>
      prev.map((pv) => (pv.id === id ? { ...pv, checked } : pv))
    );
    setCheckIfNeedSave(true);
  };

  const saveLocalStorage = () => {
    setLocalStorage(hws);
    setCheckIfNeedSave(false);
  };

  const getLocalStorage = () => {
    if (!hws.length && !!localStorageValue) {
      setHws(localStorageValue);
    }
  };

  const toBuy = hws.filter((hw) => !hw.checked);

  useEffect(() => {
    getLocalStorage();
  }, [localStorageValue]);

  return (
    <Flex direction="column" p="24px" gap="md">
      <Header />
      <fieldset>
        <Flex gap="sm" align="center" justify="space-between">
          <legend className="text-base font-semibold leading-6 text-gray-900 flex gap-3">
            <span>
              Collection
            </span>
            {!!hws.length && (
              <strong>
                {hws.length - toBuy.length}/{hws.length}
              </strong>
            )}
          </legend>
          <Group position="center" spacing="xs">
            <ActionIcon onClick={importModal.open}>
              <DownloadSimple size={24} />
            </ActionIcon>
            {checkIfNeedSave && (
              <ActionIcon onClick={saveLocalStorage} color="blue">
                <FloppyDisk size={24} />
              </ActionIcon>
            )}
            <Button onClick={addHotWheelsModal.open} size="xs">
              New Item
            </Button>
          </Group>

        </Flex>

        <div className="mt-4 divide-y divide-gray-200 border-b border-t border-gray-200">
          {hws
            .sort((hw) => (!hw.checked ? -1 : 1))
            .map((hw) => (
              <label htmlFor={hw.id} key={hw.id} className="relative  cursor-pointer flex gap-3 py-4 justify-between">
                <div className='flex gap-3 items-center'>
                  <input
                    id={hw.id}
                    name={hw.id}
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    checked={hw.checked}
                    onChange={(e) => changeCheckedById(hw.id, e.target.checked)}

                  />
                  <div className="flex h-6 items-center">
                    <div className="select-none font-medium text-gray-900">
                      {hw.name}
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
                          <a
                            href="#"
                            className={classNames(
                              active ? 'bg-gray-50' : '',
                              'block px-3 py-1 text-sm leading-6 text-gray-900'
                            )}
                          >
                            Edit<span className="sr-only">, {hw.name}</span>
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active ? 'bg-gray-50' : '',
                              'block px-3 py-1 text-sm leading-6 text-gray-900'
                            )}
                          >
                            Move<span className="sr-only">, {hw.name}</span>
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active ? 'bg-gray-50' : '',
                              'block px-3 py-1 text-sm leading-6 text-gray-900'
                            )}
                          >
                            Delete<span className="sr-only">, {hw.name}</span>
                          </a>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </label>
            ))}
        </div>
      </fieldset>
      <Modal
        opened={addHotWheelsModalOpened}
        onClose={addHotWheelsModal.close}
        title="Add your hot wheels!"
      >
        <Flex gap="sm" direction="column">
          <Input
            placeholder="Hot wheels name"
            onChange={(e: any) => setInput(e.target.value)}
            value={input}
            sx={{
              textTransform: "uppercase",
            }}
          />
          <Button onClick={handlerSubmit}>Add it</Button>
        </Flex>
      </Modal>

      <Modal
        opened={importModalOpened}
        onClose={importModal.close}
        title="Import your text of the hot wheels!"
      >
        <Flex gap="sm" direction="column">
          <Textarea
            placeholder="Paste it"
            onChange={(e: any) => setInput(e.target.value)}
            value={input}
            sx={{
              textTransform: "uppercase",
            }}
          />
          <Button onClick={importHandleSubmit}>Import it</Button>
        </Flex>
      </Modal>
    </Flex>
  );
}
