import {
  ActionIcon,
  Flex,
  Group,
  Input,
  Modal,
  Textarea,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import { useDisclosure, useLocalStorage } from "@mantine/hooks";
import { DownloadSimple, FloppyDisk, UploadSimple } from "@phosphor-icons/react";
import { Header } from "../../../shared/components/Header";
import { Wishlist } from "../@types";
import { useToasts } from "react-toast-notifications";
import { Item } from "../components/Item";
import { Button } from "../../../shared/components/Button";

export function Home() {
  const [checkIfNeedSave, setCheckIfNeedSave] = useState(false);
  const [addHotWheelsModalOpened, addHotWheelsModal] = useDisclosure();
  const [importModalOpened, importModal] = useDisclosure();
  const [hws, setHws] = useState<Wishlist[]>([]);
  const [input, setInput] = useState("");
  const [id, setId] = useState<string | null>(null)
  const [localStorageValue, setLocalStorage] = useLocalStorage<Wishlist[]>({
    key: "hotwheels",
    defaultValue: [],
  });

  const { addToast } = useToasts();

  const handlerSubmit = () => {
    if (!input) return;
    if (id) {
      console.log(input.toUpperCase())
      setHws(prev => prev.map((p) => {
        if (p.id === id) {
          p.name = input.toUpperCase()
        }
        return p
      }))

    } else {
      setHws((prev) => [
        ...prev,
        {
          id: nanoid(),
          name: input.toUpperCase(),
          checked: false,
        },
      ]);
    }
    setId(null)
    setInput("");
    setCheckIfNeedSave(true);
    addToast(id ? 'Edited Successfully' : 'Saved Successfully', { appearance: 'success' });

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

  const onEdit = (id: string, value: string) => {
    setId(id)
    setInput(value)
    addHotWheelsModal.open()
  }

  useEffect(() => {
    getLocalStorage();
  }, [localStorageValue]);

  return (
    <div className="flex flex-col p-8 gap-8">
      <Header />
      <fieldset>
        <div className="flex flex-col xs:flex-row items-center justify-between">
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

          <div className="flex items-center gap-2 w-full justify-end">
            <ActionIcon onClick={() => navigator.clipboard.writeText(JSON.stringify(hws))}>
              <UploadSimple size={24} />
            </ActionIcon>
            <ActionIcon onClick={importModal.open}>
              <DownloadSimple size={24} />
            </ActionIcon>
            {checkIfNeedSave && (
              <ActionIcon onClick={saveLocalStorage} color="blue">
                <FloppyDisk size={24} />
              </ActionIcon>
            )}
            <Button
              onClick={addHotWheelsModal.open}
              className="max-w-[100px]"
            >
              New Item
            </Button>

          </div>
        </div>

        <div className="mt-4 divide-y divide-gray-200 border-b border-t border-gray-200">
          {hws
            .sort((hw) => (!hw.checked ? -1 : 1))
            .map((hw) => (
              <Item
                id={hw.id}
                checked={hw.checked}
                name={hw.name}
                key={hw.id}
                onEdit={() => onEdit(hw.id, hw.name)}
                onCheckHandler={(isChecked) =>
                  changeCheckedById(hw.id, isChecked)
                }
                onDelete={() => {
                  addToast('Deleted Successfully', { appearance: 'success' });
                  setHws(prev =>
                    prev.filter(p => p.id !== hw.id)
                  )
                  setCheckIfNeedSave(true)

                }}
              />
            ))}
        </div>
      </fieldset >
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
          <Button onClick={handlerSubmit}>{id ? 'Edit it' : 'Add it'}</Button>
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
            onPaste={(e) => {
              const pasteData = e.clipboardData.getData('text')
              try {
                const itPrased = JSON.parse(pasteData)
                setLocalStorage(itPrased)
                setHws(itPrased)
                setCheckIfNeedSave(false)

              } catch (error) {
              }
              finally {
                importModal.close()
                setInput('')
              }
            }}
          />
          <Button onClick={importHandleSubmit}>Import it</Button>
        </Flex>
      </Modal>
    </div>
  );
}
