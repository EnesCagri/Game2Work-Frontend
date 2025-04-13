"use client";

import { CodeBlock } from "@/components/ui/code-block";
import { extractCodeBlocks } from "@/lib/utils";

interface GeminiResponseRendererProps {
  content: string;
}

export function GeminiResponseRenderer({
  content,
}: GeminiResponseRendererProps) {
  const { codeBlocks, textWithoutCode } = extractCodeBlocks(content);

  return (
    <div className="prose prose-invert max-w-none text-sm space-y-4">
      {/* Ana metin içeriği */}
      <div className="whitespace-pre-wrap">{textWithoutCode}</div>

      {/* Kod blokları */}
      {codeBlocks.map((block, i) => (
        <CodeBlock key={i} language={block.language} code={block.code} />
      ))}
    </div>
  );
}
