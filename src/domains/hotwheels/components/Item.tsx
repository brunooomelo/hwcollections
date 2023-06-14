import { Checkbox, Flex } from "@mantine/core";
import { Wishlist } from "../@types";

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
