import {
  ActionIcon,
  Box,
  Button,
  Checkbox,
  Flex,
  Group,
  Input,
  Modal,
  Textarea,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import { useDisclosure, useLocalStorage } from "@mantine/hooks";
import { DownloadSimple, FloppyDisk } from "@phosphor-icons/react";
import { Header } from "./shared/components/header";

type ItemProps = {
  onCheckHandler: (checked: boolean) => void;
} & Wishlist;

function Item({ name, checked, id, onCheckHandler }: ItemProps) {
  return (
    <Flex gap="sm">
      <Checkbox
        checked={checked}
        onChange={(e) => onCheckHandler(e.currentTarget.checked)}
      />
      <span>{name}</span>
    </Flex>
  );
}

type List = {
  name: string;
};

type Wishlist = {
  id: string;
  checked: boolean;
} & List;

function App() {
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
    <Flex direction="column" p="24px">
      <Header />
      <Flex gap="sm" align="center" justify="space-between">
        <Group spacing="xs">
          <h3>Wishlist</h3>
          {!!hws.length && (
            <strong>
              {hws.length - toBuy.length}/{hws.length}
            </strong>
          )}
        </Group>
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
      <Flex px="sm" direction="column">
        {hws
          .sort((hw) => (!hw.checked ? -1 : 1))
          .map((hw) => {
            return (
              <Item
                {...hw}
                key={hw.id}
                onCheckHandler={(checked) => changeCheckedById(hw.id, checked)}
              />
            );
          })}
      </Flex>
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

export default App;
