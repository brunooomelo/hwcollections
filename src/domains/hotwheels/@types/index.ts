
export type List = {
  name: string;
};

export type Wishlist = {
  id: string;
  checked: boolean;
} & List;

export type IItem = {
  id: string
  name: string
  description: string | null
  is_done: boolean
  is_active: boolean
  owner: string
}
