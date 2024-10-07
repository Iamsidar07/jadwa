"use client";

import {
  EditorContent,
  EditorRoot,
  EditorCommand,
  EditorCommandEmpty,
  EditorCommandList,
  EditorCommandItem,
  EditorInstance,
  JSONContent,
} from "novel";
import { useState } from "react";
import { defaultExtensions } from "./extensions";
import { handleCommandNavigation } from "novel/extensions";
import { useDebouncedCallback } from "use-debounce";
import { slashCommand, suggestionItems } from "./slashCommand";

const extensions = [...defaultExtensions, slashCommand];

interface Props {
  defaultValue?: JSONContent;
  setValue?: React.Dispatch<React.SetStateAction<string>>;
  isEditable?: boolean;
}

const TailwindEditor = ({
  defaultValue,
  setValue,
  isEditable = true,
}: Props) => {
  const [content, setContent] = useState<JSONContent>(
    defaultValue || {
      type: "doc",
      content: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "/ Start typing...",
            },
          ],
        },
      ],
    }
  );

  const debouncedUpdates = useDebouncedCallback(
    async ({ editor }: { editor: EditorInstance }) => {
      console.log("debouncedUpdates", editor.getJSON());
      const json = editor.getJSON();
      setContent(json);
      if (setValue) {
        setValue(JSON.stringify(json));
      }
    },
    500
  );

  return (
    <EditorRoot>
      <EditorContent
        editable={isEditable}
        initialContent={content}
        onUpdate={debouncedUpdates}
        extensions={extensions}
        editorProps={{
          handleDOMEvents: {
            keydown: (_view, event) => handleCommandNavigation(event),
          },
          attributes: {
            class: `py-8 px-4 prose prose-lg prose-headings:font-title font-default focus:outline-none max-w-full border rounded-md`,
          },
        }}
      >
        <EditorCommand className="z-50 h-auto max-h-[330px]  w-72 overflow-y-auto rounded-md border border-muted bg-background px-1 py-2 shadow-md transition-all">
          <EditorCommandEmpty className="px-2 text-muted-foreground">
            No results
          </EditorCommandEmpty>
          <EditorCommandList>
            {suggestionItems.map((item) => (
              <EditorCommandItem
                value={item.title}
                // @ts-expect-error item can be null
                onCommand={(val) => item.command(val)}
                className={`flex w-full items-center space-x-2 rounded-md px-2 py-1 text-left text-sm hover:bg-accent aria-selected:bg-accent`}
                key={item.title}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-md border border-muted bg-background">
                  {item.icon}
                </div>
                <div>
                  <p className="font-medium">{item.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </EditorCommandItem>
            ))}
          </EditorCommandList>
        </EditorCommand>
      </EditorContent>
    </EditorRoot>
  );
};
export default TailwindEditor;
