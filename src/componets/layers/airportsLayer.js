import { CartoLayer, setDefaultCredentials, fetchLayerData, FORMATS, MAP_TYPES } from '@deck.gl/carto';




export default function airportsLayer(style) {
    setDefaultCredentials({
        accessToken: 'eyJhbGciOiJIUzI1NiJ9.eyJhIjoiYWNfN3hoZnd5bWwiLCJqdGkiOiJiNjg3MWE5NiJ9.s9jW4AoZ3JX3XjOwJg5gtJSK8c4oTuyXrklnftZ7GcQ',
        apiBaseUrl: 'https://gcp-us-east1.api.carto.com', // Default value (optional)
    });



    async function seeData()
    {
    const {data} = await fetchLayerData({
        type: MAP_TYPES.TABLE,
        source: `carto-demo-data.demo_tables.airports`,
        connection: 'bigquery',
        format: FORMATS.JSON,
        queryParameters: ['AL']
      })
    }
    seeData()



    const cartoLayer =
        new CartoLayer({
            id: "airport-layer",
            type: MAP_TYPES.TABLE,
            connection: 'bigquery',
            data: "carto-demo-data.demo_tables.airports",
            geoColumn: 'geom',
            pointRadiusMinPixels: style.dim,
            getLineColor: [0, 0, 0, 200],
            getFillColor: [style.color.r, style.color.g, style.color.b],
            lineWidthMinPixels: 1,
        })

    return cartoLayer
}