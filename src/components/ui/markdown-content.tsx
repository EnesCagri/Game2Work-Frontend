"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { cn } from "@/lib/utils";
import { CodeBlock } from "./code-block";

interface MarkdownContentProps {
  content: string;
  className?: string;
}

export function MarkdownContent({ content, className }: MarkdownContentProps) {
  return (
    <div className={cn("prose prose-invert max-w-none", className)}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          p: ({ children }) => <p className="text-gray-400 my-2">{children}</p>,
          strong: ({ children }) => (
            <strong className="text-gray-200">{children}</strong>
          ),
          em: ({ children }) => <em className="text-gray-300">{children}</em>,
          code: ({ node, inline, className, children, ...props }) => {
            if (inline) {
              return (
                <code
                  className="text-pink-500 bg-gray-800/50 rounded px-1"
                  {...props}
                >
                  {children}
                </code>
              );
            }
            const match = /language-(\w+)/.exec(className || "");
            const language = match?.[1] || "text";
            const code = String(children).replace(/\n$/, "");

            return (
              <div className="my-4">
                <CodeBlock
                  code={code}
                  language={language}
                  showLineNumbers={true}
                />
              </div>
            );
          },
          ul: ({ children }) => (
            <ul className="text-gray-400 my-2 list-disc pl-6">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="text-gray-400 my-2 list-decimal pl-6">{children}</ol>
          ),
          li: ({ children }) => <li className="my-0">{children}</li>,
          a: ({ href, children }) => (
            <a
              href={href}
              className="text-blue-400 hover:text-blue-300 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              {children}
            </a>
          ),
          h1: ({ children }) => (
            <h1 className="text-3xl font-bold text-white mt-6 mb-4">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-2xl font-bold text-white mt-5 mb-3">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-xl font-semibold text-white mt-4 mb-2">
              {children}
            </h3>
          ),
          h4: ({ children }) => (
            <h4 className="text-lg font-semibold text-white mt-3 mb-2">
              {children}
            </h4>
          ),
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-blue-500/50 pl-4 my-4 text-gray-400 italic">
              {children}
            </blockquote>
          ),
          pre: ({ children }) => children,
          table: ({ children }) => (
            <div className="overflow-x-auto my-4">
              <table className="min-w-full divide-y divide-gray-700">
                {children}
              </table>
            </div>
          ),
          th: ({ children }) => (
            <th className="px-4 py-2 text-left text-gray-300 font-semibold bg-gray-800/50">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="px-4 py-2 text-gray-400 border-t border-gray-700">
              {children}
            </td>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
