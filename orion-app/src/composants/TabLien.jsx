/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { useState } from "react";
import Lien from "./ui/Lien";


const TabLien = () => {
  const tabs = [
    { label: "Dashboard", chemin: "/dash" },
    { label: "Classes", chemin: "/classes" },
    { label: "Projets", chemin: "/projets" },
    { label: "API", chemin: "/api" },
    { label: "Docs", chemin: "/docs" },
    //{ label: "Pricing", chemin: "/pricing" },
    { label: "API KEY", chemin: "/cle-env" },
  ];

  const [activeTab, setActiveTab] = useState(0);

  return (
    <div
    className={"aff-myn-none aff-flex mb-8"}
      style={{
        position: "relative",
        gap: "1.5rem",
        padding: "1rem",
        borderBottom: "1px solid var(--border)",
      }}
    >
      {tabs.map((tab, index) => (
        <div
          key={index}
          style={{
            position: "relative",
          }}
          onClick={() => setActiveTab(index)}
        >
          <Lien
            chemin={tab.chemin}
            className="taille-pt"
            style={{
              color: activeTab === index ? "var(--primary)" : "var(--text-main)",
              fontWeight: activeTab === index ? 600 : 400,
              padding: "0.5rem 0",
              display: "inline-block",
            }}
          >
            {tab.label}
          </Lien>

          {activeTab === index && (
            <motion.div
              layoutId="underline"
              style={{
                position: "absolute",
                height: 3,
                background: "var(--primary)",
                width: "100%",
                bottom: 0,
                left: 0,
                borderRadius: 3,
              }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default TabLien;
