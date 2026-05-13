import { PortableText } from "@portabletext/react";
import type { PortableTextBlock } from "@/lib/posts";

type Props = {
  value: PortableTextBlock[];
};

export function PortableTextContent({ value }: Props) {
  return (
    <div className="prose prose-zinc max-w-none dark:prose-invert">
      <PortableText
        value={value}
        components={{
          block: {
            normal: ({ children }) => (
              <p className="mb-5 leading-8 text-zinc-700 dark:text-zinc-200">{children}</p>
            ),
            h2: ({ children }) => (
              <h2 className="mb-3 mt-8 text-2xl font-semibold tracking-tight">{children}</h2>
            ),
            h3: ({ children }) => (
              <h3 className="mb-2 mt-6 text-xl font-semibold tracking-tight">{children}</h3>
            ),
          },
          marks: {
            link: ({ children, value: linkValue }) => (
              <a
                href={typeof linkValue?.href === "string" ? linkValue.href : "#"}
                target="_blank"
                rel="noreferrer noopener"
                className="text-blue-600 underline underline-offset-4 hover:text-blue-500 dark:text-blue-400"
              >
                {children}
              </a>
            ),
          },
        }}
      />
    </div>
  );
}
