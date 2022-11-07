import dimensionValidator from "../utils/inputFunctions"
import { useState } from "react"
import ChooseColorComponent from "./style-componets/ColorComponent"

import attributesInJson from './layers/utils/datas-analisys'

export default function StyleComponets({ data, style, setStyle }) {
    const [status, setStatus] = useState('ok')

    const attributes = attributesInJson(data)

    function changeDimension(event) {
        try {
            const d = dimensionValidator(event.target.value)
            setStyle(prevStyle => {
                const current = {...prevStyle}
                current[event.target.name] = d
                return current
            })
        }
        catch (err) {
            setStatus('error')
        }
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
            <input name='radiusMinPixels' type='text' value={style.radiusMinPixels} onChange={changeDimension} />
            <p>Grosor de lineas: (valores 0-10)</p>
            <input name='lineWidthMinPixels' type='text' value={style.lineWidthMinPixels} onChange={changeDimension} />
            <div className="color-picker">
                <p>Elije el color de relleno</p>
                <ChooseColorComponent id='fill'
                                      attributes={attributes}
                                      property='getFillColor'
                                      style={style}
                                      setStyle={setStyle} />
                <p>Elije el color de bordes</p>
                <ChooseColorComponent id='line'
                                      attributes={attributes}
                                      property='getLineColor'
                                      style={style}
                                      setStyle={setStyle} />
            </div>
        </div>

    )
}