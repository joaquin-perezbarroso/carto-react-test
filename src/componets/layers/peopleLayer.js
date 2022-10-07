import { CartoLayer, setDefaultCredentials, MAP_TYPES } from '@deck.gl/carto';


export default function peopleLayer(style) {
    setDefaultCredentials({
        accessToken: 'eyJhbGciOiJIUzI1NiJ9.eyJhIjoiYWNfN3hoZnd5bWwiLCJqdGkiOiI5Y2ZmYjkxNyJ9.7NoiHmm13BuGz7TXtLnFDomRXBxfhekzxqWIsZkGdpc',
        apiBaseUrl: 'https://gcp-us-east1.api.carto.com', // Default value (optional)
    });


    const cartoLayer =
        new CartoLayer({
            id: `people-layer-${style.color.r}`,
            type: MAP_TYPES.TILESET,
            connection: 'carto_dw',
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