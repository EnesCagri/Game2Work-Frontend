"use client";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/cjs/styles/prism";

export interface CodeBlockProps {
  language?: string;
  code: string;
}

export const CodeBlock = ({
  language = "typescript",
  code,
}: CodeBlockProps) => {
  return (
    <div className="rounded-xl overflow-hidden border border-muted bg-black/40 backdrop-blur-sm p-2 my-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs text-muted-foreground">{language}</span>
        <button
          onClick={() => navigator.clipboard.writeText(code)}
          className="text-xs text-muted-foreground hover:text-primary transition-colors"
        >
          Copy code
        </button>
      </div>
      <SyntaxHighlighter
        language={language}
        style={dracula}
        wrapLines={true}
        customStyle={{
          background: "transparent",
          fontSize: "0.875rem",
          lineHeight: "1.5",
          margin: 0,
        }}
      >
        {code.trim()}
      </SyntaxHighlighter>
    </div>
  );
};
