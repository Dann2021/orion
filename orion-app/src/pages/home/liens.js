import { Book, BracesIcon, Code, Folder, LayoutDashboard } from "lucide-react";

export const liens = [
  {
    id: 1,
    lien: "dash",
    label: "Dashboard",
    icone: LayoutDashboard ,
    etat: true
  },
  {
    id: 2,
    lien: "classes",
    label: "Classes",
    icone: BracesIcon,
    etat: false
  },

  {
    id: 3,
    lien: "projets",
    label: "Projets",
    icone: Folder,
    etat: true
  },
  {
    id: 4,
    lien: "api",
    label: "API",
    icone: Code,
    etat: true
  },
  {
    id: 5,
    lien: "docs",
    label: "Docs",
    icone: Book,
    etat: true
  },

  
];
