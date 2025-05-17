"use client";

import Heading from "@tiptap/extension-heading";
import BubbleMenu from '@tiptap/extension-bubble-menu'
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Toolbar from "./toolbar";

const DefaultDescription = "<p>Hello World! 🌎️</p>";
const isClient = typeof window !== "undefined";

export const Tiptap = ({
    description = DefaultDescription,
    onChange,
}: {
    description?: string;
    onChange?: (richText: string) => void;
}) => {
    const editor = useEditor({
        extensions: [
            StarterKit.configure(),
            Heading.configure({
                HTMLAttributes: {
                    class: "text-4xl",
                    level: [1],
                },
            }),
            BubbleMenu.configure({
                element: isClient ? document.querySelector('.menu-one') as HTMLElement : undefined,
            }),
        ],
        content: description,
        editorProps: {
            attributes: {
                class:
                    "min-h-[24dvh] border border-border rounded-lg p-4 outline-none focus:outline-primary",
            },
        },
        onUpdate: ({ editor }) => {
            onChange?.(editor.getHTML());
        },
        immediatelyRender: false,
    });

    return (
        <div className="grid grid-cols-1 gap-1">
            <Toolbar editor={editor} />
            <EditorContent editor={editor} />
        </div>
    );
};