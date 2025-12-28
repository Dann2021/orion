import Editor from "@monaco-editor/react";

// monacoTheme.js
const orionDarkTheme = {
  base: "vs-dark",
  inherit: true,
  rules: [
    { token: "string", foreground: "A5F3FC" }, // cyan doux
    { token: "number", foreground: "FACC15" }, // warning
    { token: "keyword", foreground: "38BDF8" }, // primary
    { token: "delimiter", foreground: "9CA3AF" }, // muted
    { token: "type", foreground: "22D3EE" },
  ],
  colors: {
    "editor.background": "#111827", // --bg-surface
    "editor.foreground": "#E5E7EB", // --text-main
    "editorLineNumber.foreground": "#6B7280",
    "editorCursor.foreground": "#38BDF8",

    "editor.selectionBackground": "#1F2933",
    "editor.inactiveSelectionBackground": "#1F2933",

    "editor.lineHighlightBackground": "#0B0F1A",

    "editorIndentGuide.background": "#1F2937",
    "editorIndentGuide.activeBackground": "#38BDF8",

    "editorWhitespace.foreground": "#1F2937",

    "editorBracketMatch.background": "#1F2933",
    "editorBracketMatch.border": "#38BDF8",
  },
};
export default function JsonEditor({ value, onChange, editer }) {
  const handleMount = (editor, monaco) => {
    monaco.editor.defineTheme("orion-dark", orionDarkTheme);
    monaco.editor.setTheme("orion-dark");
  };

  return (
    <Editor
      height="400px"
      language="json"
      value={value}
      onChange={onChange}
      onMount={handleMount}
      options={{
        readOnly: editer,
        formatOnPaste: true,
        formatOnType: true,
        folding: true,
        minimap: { enabled: false },
        fontFamily: "JetBrains Mono",
        fontSize: 13,
        lineHeight: 20,
        tabSize: 1,
        wordWrap: "on",
        scrollBeyondLastLine: false,
        automaticLayout: true,
        padding: { top: 12, bottom: 12 },
        scrollbar: {
          verticalScrollbarSize: 8,
          horizontalScrollbarSize: 8,
        },
      }}
    />
  );
}
