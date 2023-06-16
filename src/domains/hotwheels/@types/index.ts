
export type List = {
  name: string;
};

export type Wishlist = {
  id: string;
  checked: boolean;
} & List;
