import React, {
    ChangeEvent,
    FC,
    InputHTMLAttributes,
    MouseEvent, MouseEventHandler,
    PropsWithChildren,
    useRef,
    useState
} from 'react';
import {ASSETS} from "@shared/config";
import cn from "classnames";

import s from "./styles/TaskName.module.scss";

type TaskNameProps = PropsWithChildren<{
    name: string;

    onChange: (e: ChangeEvent<HTMLElement>) => void;
    passHtml?: boolean;

    deletable?: boolean;
    onDelete?: MouseEventHandler;
}> & InputHTMLAttributes<HTMLInputElement>;

export const TaskName: FC<TaskNameProps> = (props) => {
    const {name, onChange, passHtml, deletable, onDelete} = props;

    const input = useRef<HTMLDivElement>(null);
    const [range] = useState<Range>(document.createRange());
    const [selection] = useState<Selection | null>(window.getSelection());

    const onInputFocus = (e: MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if(name?.length) {
            range.setStart(input.current!.childNodes[0], name.length);
            range.collapse(true);
            selection?.removeAllRanges();
            selection?.addRange(range);
        }
        input.current!.focus();
    }

    return (
        <div className={s.taskName}>
            {
                deletable && (
                    <img
                        src={ASSETS.IMAGE.GET("CLEAR")}
                        className={s.taskName__remove}
                        onClick={onDelete}
                    />
                )
            }
            <div
                className={cn(s.taskName__name)}
                contentEditable={true}
                suppressContentEditableWarning={true}
                ref={input}
                onBlur={onChange}
                onKeyDown={(e) => {
                    if(e.key === "Enter") {
                        e.preventDefault();
                        e.stopPropagation();
                        input.current!.blur();
                    }
                    if(e.key === "Escape") {
                        e.preventDefault();
                        e.stopPropagation();
                        input.current!.textContent = name;
                        input.current!.blur();
                    }
                }}
                dangerouslySetInnerHTML={passHtml ? {
                    __html: name
                } : undefined}
            >
                {!passHtml ? name : null}
            </div>
            <img
                className={cn(s.taskName__button, s.taskName__button_edit)}
                src={ASSETS.IMAGE.GET("EDIT")}
                title={"Изменить"}
                alt={""}
                onClick={onInputFocus}
            />
        </div>
    );
};