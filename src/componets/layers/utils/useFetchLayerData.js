import { useState, useEffect } from "react";
import { CartoLayer, setDefaultCredentials, MAP_TYPES, FORMATS, fetchLayerData } from '@deck.gl/carto';

export default function useFetchLayerData({source, format, type}) {
    const [data, setData] = useState()

    setDefaultCredentials({
        accessToken: 'eyJhbGciOiJIUzI1NiJ9.eyJhIjoiYWNfN3hoZnd5bWwiLCJqdGkiOiJiNjg3MWE5NiJ9.s9jW4AoZ3JX3XjOwJg5gtJSK8c4oTuyXrklnftZ7GcQ',
        apiBaseUrl: 'https://gcp-us-east1.api.carto.com', // Default value (optional)
    });

    useEffect(
        () => {
            setData(null)
            async function getLayerData() {
                const {data: layerData} = await fetchLayerData({
                    type: type,
                    source: source,
                    connection: 'bigquery',
                    format: format
                  })
                setData(layerData)
            }

            getLayerData()
        },
        [source, format, type]
    )

    return data
}
