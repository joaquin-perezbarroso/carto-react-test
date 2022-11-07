
import { CartoLayer, BASEMAP, MAP_TYPES } from '@deck.gl/carto';
import { StaticMap } from 'react-map-gl';
import { DeckGL, ScatterplotLayer } from 'deck.gl';


const INITIAL_VIEW_STATE = {
    longitude: -100.41669,
    latitude: 37.7853,
    zoom: 4
};

export default function MapComponet({ dataset, data, style }) {

    return (
        <DeckGL initialViewState={INITIAL_VIEW_STATE} controller={true} layers={[]}>
            <StaticMap mapStyle={BASEMAP.POSITRON} />
            {data && (<ScatterplotLayer  id={`scatterplot-layer-${style.idProperty}`}
                                         data={data}
                                         opacity={1}
                                         stroked={true}
                                         filled={true}
                                         getPosition={d => d.geom.coordinates}
                                         {...style}
            />)}
            {(dataset.type === MAP_TYPES.TILESET) && (<CartoLayer id={`people-id-${style.idProperty}`}
                                                                  type={MAP_TYPES.TILESET}
                                                                  connection='bigquery'
                                                                  data={dataset.source}
                                                                  {...style}
            />)}
        </DeckGL>
    )
}