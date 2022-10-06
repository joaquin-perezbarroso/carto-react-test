import dimensionValidator from "../utils/inputFunctions"
import { useState } from "react"
import { RgbaColorPicker } from "react-colorful";

export default function StyleComponets({ style, setStyle }) {
    const [status, setStatus] = useState('ok')

    function changeDimension(event) {
        try {
            const d = dimensionValidator(event.target.value)
            setStyle(style => {
                return {
                    ...style,
                    dim: d
                }
            })
        }
        catch (err) {
            setStatus('error')
        }
    }

    function changeColor(color) {
        setStyle(style => {
            return {
                ...style,
                color: color
            }
        })
    }

    if (status === 'error') {
        return (
            <div className='style-container'>
                <h3>Valor no válido</h3>
                <p>No querremos leer !! Entrada no válida, recarga si quieres otra oportunidad.</p>
            </div>
        )
    }


    return (
        <div className='style-container'>
            <h3>Cambia propiedades de la layer</h3>

            <p>Tamaño del punto: (valores 0-10)</p>
            <input type='text' onChange={changeDimension} />
            <div className="color-picker">
                <RgbaColorPicker color={style.color} onChange={changeColor} />
            </div>
        </div>

    )
}