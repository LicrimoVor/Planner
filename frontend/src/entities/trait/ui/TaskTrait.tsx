import React, {FC, HTMLAttributes} from 'react';
import {ITrait} from "@entities/trait";

import s from "./styles.module.scss";
import {ASSETS} from "@shared/config";

type TaskTraitProps = {
    trait: ITrait;

    removable?: boolean;
    onRemove?: (traitId: number) => void;
} & HTMLAttributes<HTMLElement>;

export const TaskTrait: FC<TaskTraitProps> = (props) => {
    const {trait, removable, onRemove} = props;

    return (
        <div className={s.taskTrait} style={{
            "--trait-color": trait.color
        } as React.CSSProperties}>
            <p className={s.taskTrait__label}>{trait.name}</p>
            {
                removable && (
                    <img
                        className={s.taskTrait__remove}
                        src={ASSETS.IMAGE.GET("CLEAR")}
                        title={"Удалить"}
                        alt={""}
                        onClick={() => {
                            onRemove!(trait.id);
                        }}
                    />
                )
            }
        </div>
    );
};