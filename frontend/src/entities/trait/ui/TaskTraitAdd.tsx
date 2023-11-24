import React, {FC, MouseEvent, useState} from 'react';
import { ClickAwayListener } from "@mui/base/ClickAwayListener";
import {ITrait} from "@entities/trait";
import {ASSETS} from "@shared/config";

import s from "./styles.module.scss";

type TaskTraitAddProps = {
    list?: ITrait[];

    onTraitSelect: (traitId: number) => void;
};

export const TaskTraitAdd: FC<TaskTraitAddProps> = (props) => {
    const {list, onTraitSelect} = props;

    const [isMenu, setIsMenu] = useState(false);
    const [position, setPosition] = useState<{x: number, y: number}>({x: 0, y: 0});

    const onMenu = (e: MouseEvent<HTMLImageElement>) => {
        if(!list) {
            return;
        }

        setPosition({x: e.clientX, y: e.clientY});

        setIsMenu(true);
    }

    return (
        <React.Fragment>
            <img
                className={s.taskTraitAdd}
                src={ASSETS.IMAGE.GET("PLUS")}
                title={"Добавить"}
                alt={""}
                onClick={onMenu}
            />
            {
                isMenu && (
                    <ClickAwayListener onClickAway={() => {setIsMenu(false)}}>
                        <div
                            className={s.taskTraitList}
                            style={{left: position.x, top: position.y}}
                            onBlur={() => {
                                setIsMenu(false);
                                console.log("blur");
                            }}
                        >
                            {
                                list?.map(trait => (
                                    <div
                                        className={s.taskTraitList__button}
                                        key={trait.id}
                                        onClick={() => onTraitSelect(trait.id)}
                                        style={{"--trait-color": trait.color} as React.CSSProperties}
                                    >{trait.name}</div>
                                ))
                            }
                        </div>
                    </ClickAwayListener>
                )
            }
        </React.Fragment>
    );
};