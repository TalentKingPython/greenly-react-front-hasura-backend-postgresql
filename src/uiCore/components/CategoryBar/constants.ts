export interface IMenuItem {
  label: string;
  link: string;
}

export const MENU_ITEMS: Array<IMenuItem> = [
  {
    label: "All Topics",
    link: "/",
  },
  {
    label: "Environment",
    link: "/browse/environment",
  },
  {
    label: "Technology",
    link: "/browse/technology",
  },
  {
    label: "Investing",
    link: "/browse/investing",
  },
  {
    label: "Society",
    link: "/browse/society",
  },
  {
    label: "Energy",
    link: "/browse/energy",
  },
];

export interface ICategoryBarProps {
  variant: "primary" | "secondary";
}
