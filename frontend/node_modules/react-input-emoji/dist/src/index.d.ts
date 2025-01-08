export default InputEmojiWithRef;
export type MetionUser = import('./types/types').MentionUser;
export type ListenerObj = import('./types/types').ListenerObj<any>;
export type Props = {
    value: string;
    onChange: (value: string) => void;
    theme?: ("light" | "dark" | "auto") | undefined;
    cleanOnEnter?: boolean | undefined;
    onEnter?: (text: string) => void;
    placeholder?: string | undefined;
    placeholderColor?: string | undefined;
    color?: string | undefined;
    onResize?: (size: {
        width: number;
        height: number;
    }) => void;
    onClick?: (() => void) | undefined;
    onFocus?: (() => void) | undefined;
    onBlur?: (() => void) | undefined;
    shouldReturn: boolean;
    maxLength?: number | undefined;
    keepOpened?: boolean | undefined;
    onKeyDown?: (event: KeyboardEvent) => void;
    inputClass?: string | undefined;
    disableRecent?: boolean | undefined;
    tabIndex?: number | undefined;
    height?: number | undefined;
    borderRadius?: number | undefined;
    borderColor?: string | undefined;
    fontSize?: number | undefined;
    fontFamily?: string | undefined;
    background?: string | undefined;
    customEmojis?: {
        id: string;
        name: string;
        emojis: {
            id: string;
            name: string;
            keywords: string[];
            skins: {
                src: string;
            }[];
        };
    }[] | undefined;
    language?: import('./types/types').Languages | undefined;
    searchMention?: (text: string) => Promise<MetionUser[]>;
    buttonElement?: HTMLDivElement | undefined;
    buttonRef?: React.MutableRefObject<any> | undefined;
    shouldConvertEmojiToImage: boolean;
};
declare const InputEmojiWithRef: React.ForwardRefExoticComponent<Props & React.RefAttributes<any>>;
import React from "react";
