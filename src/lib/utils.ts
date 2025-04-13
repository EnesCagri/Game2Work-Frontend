import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface CodeBlock {
  language: string;
  code: string;
}

export function parseCodeBlocks(text: string): {
  text: string;
  codeBlocks: CodeBlock[];
} {
  const regex = /```(\w+)?\n([\s\S]*?)```/g;
  const codeBlocks: CodeBlock[] = [];
  let processedText = text;

  let match;
  while ((match = regex.exec(text)) !== null) {
    const language = match[1] || "plaintext";
    const code = match[2].trim();

    // Replace the code block with a placeholder
    const placeholder = `{codeblock-${codeBlocks.length}}`;
    processedText = processedText.replace(match[0], placeholder);

    // Store the code block
    codeBlocks.push({ language, code });
  }

  return { text: processedText, codeBlocks };
}

export function extractCodeBlocks(text: string): {
  codeBlocks: CodeBlock[];
  textWithoutCode: string;
} {
  // Markdown code block regex with better handling of language and content
  const regex = /```([\w#+]*)\n?([\s\S]*?)```/g;
  const codeBlocks: CodeBlock[] = [];

  // Metnin kalan kısmını oluşturmak için kod bloklarını kaldırıyoruz
  let cleanedText = text;

  let match;
  while ((match = regex.exec(text)) !== null) {
    const [fullMatch, language, code] = match;
    // Handle empty language or special cases
    const normalizedLang = language?.trim() || "plaintext";

    // Add the code block if it's not empty
    if (code.trim()) {
      codeBlocks.push({
        language: normalizedLang,
        code: code.trim(),
      });
      // Replace the code block with a newline to maintain text flow
      cleanedText = cleanedText.replace(fullMatch, "\n\n");
    }
  }

  return {
    codeBlocks,
    textWithoutCode: cleanedText.trim(),
  };
}
