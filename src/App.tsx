import { Button, Checkbox, Flex, Group, Input, Modal } from "@mantine/core";
import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import { useLocalStorage } from "@mantine/hooks";

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
  const [opened, setOpened] = useState(false);
  const [hws, setHws] = useState<Wishlist[]>([]);
  const [input, setInput] = useState("");
  const [localStorageValue, setLocalStorage] = useLocalStorage<Wishlist[]>({
    key: "hotwheels",
  });

  const handlerSubmit = () => {
    if (!input) return;
    setHws((prev) => [
      ...prev,
      {
        id: nanoid(),
        name: input,
        checked: false,
      },
    ]);
    setInput("");
    setOpened(false);
  };

  const changeCheckedById = (id: string, checked: boolean) => {
    setHws((prev) =>
      prev.map((pv) => (pv.id === id ? { ...pv, checked } : pv))
    );
  };

  const saveLocalStorage = () => {
    setLocalStorage(hws);
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
    <div>
      <Flex gap="sm" align="center">
        <h1>Wishlist</h1>{" "}
        {!!hws.length && (
          <strong>
            {hws.length - toBuy.length}/{hws.length}
          </strong>
        )}{" "}
        <Group position="center">
          <Button onClick={() => setOpened(true)}>Add a hot wheels</Button>
          <Button onClick={saveLocalStorage}>Save</Button>
        </Group>
      </Flex>
      <Flex px="sm" direction="column">
        {hws.map((hw) => {
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
        opened={opened}
        onClose={() => setOpened(false)}
        title="Add your hot wheels!"
      >
        <Flex gap="sm" direction="column">
          <Input
            placeholder="Hot wheels name"
            onChange={(e: any) => setInput(e.target.value)}
            value={input}
          />
          <Button onClick={handlerSubmit}>Add it</Button>
        </Flex>
      </Modal>
    </div>
  );
}

export default App;
