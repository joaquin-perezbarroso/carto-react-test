
import { BASEMAP } from '@deck.gl/carto';
import { StaticMap } from 'react-map-gl';
import { DeckGL, } from 'deck.gl';

import airportsLayer from './layers/airportsLayer';
import storesLayer from './layers/storesLayer';
import peopleLayer from './layers/peopleLayer';

import { Dataset } from './App';
import { useEffect, useState } from 'react';


const INITIAL_VIEW_STATE = {
    longitude: -100.41669,
    latitude: 37.7853,
    zoom: 4,
    pitch: 0,
    bearing: 0
};


export default function MapComponet({ dataset, style }) {

    const [layer, setLayer] = useState()

    useEffect(
        () => {
            switch (dataset) {
                case Dataset.Airports:
                    setLayer(airportsLayer(style))
                    break
                case Dataset.People:
                    let ly = peopleLayer(style)
                    setLayer(ly)
                    break
                case Dataset.Stores:
                    setLayer(storesLayer(style))
                    break
                default:
            }
        }, [dataset, style])

    return (
        <DeckGL initialViewState={INITIAL_VIEW_STATE} controller={true} layers={[layer]}>
            <StaticMap mapStyle={BASEMAP.POSITRON} />
        </DeckGL>
    )
}