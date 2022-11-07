
export default function attributesInJson(data) {
    if (Array.isArray(data)) {
        return _groups(data)
    }
    else if (data && data.hasOwnProperty('tilestats')) {
        return data.tilestats.layers[0].attributes
                                        .map((elem) => {return {label: elem.attribute,
                                                                type: elem.type,
                                                                min:elem.min,
                                                                max: elem.max,
                                                                avg:elem.avg,
                                                                sum:elem.sum,
                                                            }})
    }
}

function _groups(array)
{
    const keys = Object.keys(array[0])
    var groupAttributes = []
    for (const key of keys)
    {
        const values = array.map((item) => item[key])
        const uniqueValues = new Set(values)
        const totalValues = values.length
        const groups = uniqueValues.size

        // Inventing criteria of grouping.
        if (groups > 1 && groups < 50 && totalValues / 10 > groups)
        {
            var ordered = Array.from(uniqueValues).map( (value) => {
                const number = values.filter((item) => item === value).length
                return { type: value, occurences: number}
            }).sort((a, b) => a.occurences - b.occurences)

            if (ordered.length > 0) {
                ordered = ordered.slice(0,9)
                ordered.push({ type: 'others', occurences: 0})
            }
            groupAttributes.push({label: key, type: 'String', values: ordered.map((v) => v.type)})
        }
    }
    return groupAttributes
}

