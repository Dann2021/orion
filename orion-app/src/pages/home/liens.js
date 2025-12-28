import { LayoutDashboard, Folder, FileBadge, Code, BracesIcon, Book } from "lucide-react";

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
    label: "Projet",
    icone: Folder,
    etat: true
  },
  {
    id: 4,
    lien: "docs",
    label: "Documentation",
    icone: Book,
    etat: true
  },

  
];
