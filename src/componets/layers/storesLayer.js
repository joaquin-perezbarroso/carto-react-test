import { CartoLayer, setDefaultCredentials, MAP_TYPES, FORMATS, fetchLayerData } from '@deck.gl/carto';


export default function storesLayer(style) {
    setDefaultCredentials({
        accessToken: 'eyJhbGciOiJIUzI1NiJ9.eyJhIjoiYWNfN3hoZnd5bWwiLCJqdGkiOiJiNjg3MWE5NiJ9.s9jW4AoZ3JX3XjOwJg5gtJSK8c4oTuyXrklnftZ7GcQ',
        apiBaseUrl: 'https://gcp-us-east1.api.carto.com', // Default value (optional)
    });

    async function seeData()
    {
    const {data} = await fetchLayerData({
        type: MAP_TYPES.TABLE,
        source: `carto-demo-data.demo_tables.retail_stores`,
        connection: 'bigquery',
        format: FORMATS.JSON
      })

      console.log(`SEE the datas: ${JSON.stringify(data)}`)
    }
    seeData()


    const cartoLayer =
        new CartoLayer({
            id: "store-layer",
            type: MAP_TYPES.TABLE,
            connection: 'bigquery',
            data: "carto-demo-data.demo_tables.retail_stores",
            geoColumn: 'geom',
            pointRadiusMinPixels: style.dim,
            getLineColor: [style.color.r, style.color.g, style.color.b],
            getFillColor: [style.color.r, style.color.g, style.color.b],
            lineWidthMinPixels: 1,
        })

    return cartoLayer
}