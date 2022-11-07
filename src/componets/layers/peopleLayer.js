import { CartoLayer, setDefaultCredentials, FORMATS, fetchLayerData, MAP_TYPES } from '@deck.gl/carto';


export default function peopleLayer(style) {
    setDefaultCredentials({
        accessToken: 'eyJhbGciOiJIUzI1NiJ9.eyJhIjoiYWNfN3hoZnd5bWwiLCJqdGkiOiJiNjg3MWE5NiJ9.s9jW4AoZ3JX3XjOwJg5gtJSK8c4oTuyXrklnftZ7GcQ',
        apiBaseUrl: 'https://gcp-us-east1.api.carto.com', // Default value (optional)
    });


    async function seeData()
    {
    const {data} = await fetchLayerData({
        type: MAP_TYPES.TILESET,
        source: `carto-demo-data.demo_tilesets.sociodemographics_usa_blockgroup`,
        connection: 'bigquery',
        format: FORMATS.TILESET
      })

      console.log(`SEE PEOPLE: ${JSON.stringify(data)}`)
    }
    seeData()


    const cartoLayer =
        new CartoLayer({
            id: `people-layer-${style.color.r}`,
            type: MAP_TYPES.TILESET,
            connection: 'bigquery',
            data: "carto-demo-data.demo_tilesets.sociodemographics_usa_blockgroup",
            pointRadiusMinPixels: style.dim,
            getLineColor: [style.color.r, style.color.g, style.color.b],
            getFillColor: (d) => {
                const clrs = (255.0 - d.properties.total_pop / 30) / 255;
                return [style.color.r * clrs, style.color.g * clrs, style.color.b * clrs]
            },
            lineWidthMinPixels: 1
        })

    return cartoLayer
}