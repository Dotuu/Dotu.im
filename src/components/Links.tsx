import { getIcon } from "./Icon";
import "./Links.css";

interface Link {
  name: string;
  redir: string;
}

const links: Link[] = [
  { name: "DDnet", redir: "https://ddnet.org/players/Dotu/" },
  { name: "Github", redir: "https://github.com/Dotuu" },
  { name: "Discord", redir: "https://discord.com/users/290730664687566849" },
  { name: "Steam", redir: "https://steamcommunity.com/id/Beyondd/" },
];

export const Links = () => {
  return (
    <div className="icon">
      {links.map((link) => {
        const Icon = getIcon(link.name.toLowerCase());
        return (
          <a key={link.name} href={link.redir} target={"_blank"}>
            {Icon && <Icon />}
            {link.name}
          </a>
        );
      })}
    </div>
  );
};
