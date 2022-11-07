import { RgbaColorPicker } from "react-colorful";
import { Autocomplete, TextField } from "@mui/material";
import { useState } from "react";

const palette = [
    [255, 241, 0],
    [255, 140, 0],
    [232, 17, 35],
    [236, 0, 140],
    [104, 33, 122],
    [0, 24, 143],
    [0, 188, 242],
    [0, 178, 148],
    [0, 158, 73],
    [186, 216, 10]
]

export default function ChooseColorComponent({attributes, property, style, setStyle}) {
    const [attribute, setAttribute] = useState()

    function changeColor(color) {
        setAttribute(null)
        setStyle(prevStyle => {
            const current = {...prevStyle}
            current[property] = [color.r, color.g, color.b]

            current.idProperty = "no_one"
            return current
        })
    }

    function chooseAttribute(value) {
        setAttribute(value.label)
        if (value.type === 'Number')
        {
            const incre = value.max - value.min + 1
            const min = value.min
            setStyle(prevStyle => {
                const current = {...prevStyle}
                current[property] = (d) => {
                    const result = 10 * (d.properties[value.label] - min) / incre
                    const index = parseInt(result)
                    return palette[index]
                }
                current.idProperty = property
                return current
            })
        }
        else if (value.type === 'String')
        {
            setStyle(prevStyle => {
                const current = {...prevStyle}
                current[property] = (d) => {
                    const index = value.values.indexOf(d[value.label])
                    return palette[index]
                }
                current.idProperty = property
                return current
            })
        }
    }


    return (
        <div>

            <div className="color-picker">
                <RgbaColorPicker color={style.color} onChange={changeColor} />
            </div>

            {attributes && attributes.length > 0 && (
                <div>
                    <p>Elije el attributo</p>
                    <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    value={attribute}
                    options={attributes}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="Property" />}
                    onChange={(v, nv) => chooseAttribute(nv)}
                    />
                </div>
            )}
        </div>

    )
}
