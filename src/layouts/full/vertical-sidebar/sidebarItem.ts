import { CircleIcon, WindmillIcon } from "vue-tabler-icons";

export interface menu {
  header?: string;
  title?: string;
  icon?: object;
  to?: string;
  divider?: boolean;
  chip?: string;
  chipColor?: string;
  chipVariant?: string;
  chipIcon?: string;
  children?: menu[];
  disabled?: boolean;
  type?: string;
  subCaption?: string;
}

const sidebarItem: menu[] = [
  { header: "Dashboard" },
  {
    title: "Default",
    icon: CircleIcon,
    to: "/",
  },
  { divider: true },
  { header: "Pages" },
  {
    title: "Authentication",
    icon: WindmillIcon,
    to: "/",
    children: [
      {
        title: "Login",
        icon: WindmillIcon,
        to: "/",
      },
      {
        title: "Not Found",
        icon: WindmillIcon,
        to: "/error",
      },
      {
        title: "Typography",
        icon: WindmillIcon,
        to: "/typography",
      },
    ],
  },
];

export default sidebarItem;
