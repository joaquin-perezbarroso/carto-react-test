import '../App.css';
import { useState } from 'react';

import { FaStoreAlt } from "react-icons/fa";
import { IoMdAirplane } from "react-icons/io";
import { MdPeople } from "react-icons/md";

import MapComponet from './MapComponet';
import StyleComponets from './StyleComponets';

import { MAP_TYPES, FORMATS } from '@deck.gl/carto';
import useFetchLayerData from './layers/utils/useFetchLayerData';


export const Dataset = {
  Airports: {source:"carto-demo-data.demo_tables.airports", format:"json", type: MAP_TYPES.TABLE},
  Stores: {source:"carto-demo-data.demo_tables.retail_stores", format:"json",  type: MAP_TYPES.TABLE},
  People: {source:"carto-demo-data.demo_tilesets.sociodemographics_usa_blockgroup", format:FORMATS.TILESET,  type: MAP_TYPES.TILESET}
}

export const INITIAL_STYLE = {
  idProperty: 'no_one',
  getFillColor: [250, 0, 13],
  getLineColor: [0, 0, 0],
  radiusMinPixels: 3,
  lineWidthMinPixels: 1
}


export default function App() {

  const [dataset, setDataset] = useState(Dataset.Airports)
  const [style, setStyle] = useState(INITIAL_STYLE)
  const data = useFetchLayerData(dataset)


  return (
    <div className="App">
      <header>
        <nav>
          <ul className="bookables items-list-nav">
            <li key={Dataset.Airports.source} className={dataset === Dataset.Airports ? "selected" : null}>
              <button className="btn" onClick={() => {setStyle(INITIAL_STYLE)
                                                      setDataset(Dataset.Airports)}}>
                <IoMdAirplane />
                <span>Airports</span>
              </button>
            </li>
            <li key={Dataset.Stores.source} className={dataset === Dataset.Stores ? "selected" : null}>
              <button className="btn" onClick={() => {setDataset(Dataset.Stores)
                                                      setStyle(INITIAL_STYLE)}}>
                <FaStoreAlt />
                <span>Stores</span>
              </button>
            </li>
            <li key={Dataset.People.source} className={dataset === Dataset.People ? "selected" : null}>
              <button className="btn" onClick={() => {setDataset(Dataset.People)
                                                      setStyle(INITIAL_STYLE)}}>
                <MdPeople />
                <span>People</span>
              </button>
            </li>
          </ul>
        </nav>
      </header>
      <main className='mainView'>
        <StyleComponets data={data} style={style} setStyle={setStyle} />
        <div className='map-container'>
        <MapComponet dataset={dataset} data={data} style={style} />
        </div>
      </main>
    </div>

  )
}



