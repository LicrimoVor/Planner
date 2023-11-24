import React, {
    ChangeEvent,
    FC,
    MouseEvent,
    PropsWithChildren,
    useRef,
    useState
} from 'react';
import cn from "classnames";

import s from "./styles/TaskDescription.module.scss";

type TaskDescriptionProps = PropsWithChildren<{
    description: string;

    onChange: (e: ChangeEvent<HTMLDivElement>) => void;
}>;

export const TaskDescription: FC<TaskDescriptionProps> = (props) => {
    const {description, onChange} = props;

    const input = useRef<HTMLDivElement>(null);
    const [range] = useState<Range>(document.createRange());
    const [selection] = useState<Selection | null>(window.getSelection());

    const onInputFocus = (e: MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if(description.length) {
            range.setStart(input.current!.childNodes[0], description.length);
            range.collapse(true);
            selection?.removeAllRanges();
            selection?.addRange(range);
        }
        input.current!.focus();
    }

    return (
        <div className={s.taskDescription}>
            <div
                className={cn(s.taskDescription__description)}
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
                        input.current!.textContent = description;
                        input.current!.blur();
                    }
                }}
                dangerouslySetInnerHTML={{
                    __html: description
                }}
            >

            </div>
        </div>
    );
};