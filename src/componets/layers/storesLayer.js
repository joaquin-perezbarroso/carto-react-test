import { CartoLayer, setDefaultCredentials, MAP_TYPES } from '@deck.gl/carto';


export default function storesLayer(style) {
    setDefaultCredentials({
        accessToken: 'eyJhbGciOiJIUzI1NiJ9.eyJhIjoiYWNfN3hoZnd5bWwiLCJqdGkiOiI5Y2ZmYjkxNyJ9.7NoiHmm13BuGz7TXtLnFDomRXBxfhekzxqWIsZkGdpc',
        apiBaseUrl: 'https://gcp-us-east1.api.carto.com', // Default value (optional)
    });


    const cartoLayer =
        new CartoLayer({
            id: "store-layer",
            type: MAP_TYPES.TABLE,
            connection: 'carto_dw',
            data: "carto-demo-data.demo_tables.retail_stores",
            geoColumn: 'geom',
            pointRadiusMinPixels: style.dim,
            getLineColor: [style.color.r, style.color.g, style.color.b],
            getFillColor: [style.color.r, style.color.g, style.color.b],
            lineWidthMinPixels: 1,
        })

    return cartoLayer
}