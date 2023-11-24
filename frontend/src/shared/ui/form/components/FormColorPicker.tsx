import { ClickAwayListener } from '@mui/base';
import React, {FC, useState} from 'react';
import {CirclePicker, ColorResult} from "react-color";
import cn from "classnames";

import s from "./styles/FormInput.module.scss";

type FormColorPickerProps = {
    header?: string;

    colors?: string[];
    defaultColor?: string;

    onChange: (e: ColorResult) => void;
}

export const FormColorPicker: FC<FormColorPickerProps> = (props) => {
    const {header, colors, defaultColor, onChange} = props;

    const [isShow, setIsShow] = useState(false);
    const [color, setColor] = useState(defaultColor || "#FFFFFF");

    return (
        <div className={cn(s.formInput, s.formInput_picker)}>
            <p className={s.formInput__header}>{header}</p>
            {
                isShow && (
                    <ClickAwayListener
                        onClickAway={() => {
                            setIsShow(false);
                        }}
                    >
                        <CirclePicker
                            className={s.formInput__colorPicker}
                            colors={colors}
                            color={color}
                            onChangeComplete={(e) => {
                                setColor(e.hex);
                                onChange(e);
                            }}
                        />
                    </ClickAwayListener>
                )

            }
            <div
                className={s.formInput__color}
                style={{background: color}}
                onClick={() => {
                    setIsShow(true);
                }}
            />
        </div>
    );
};