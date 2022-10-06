
import '../App.css';
import { useState } from 'react';

import { FaStoreAlt } from "react-icons/fa";
import { IoMdAirplane } from "react-icons/io";
import { MdPeople } from "react-icons/md";

import MapComponet from './MapComponet';
import StyleComponets from './StyleComponets';





export const Dataset = {
  Airports: "airports",
  Stores: "stores",
  People: "people"
}



export default function App() {

  const [dataset, setDataset] = useState(Dataset.Airports)
  const [dimPoint, setDimPoint] = useState(2)
  const [color, setColor] = useState({ r: 200, g: 150, b: 35 })

  const [style, setStyle] = useState({
    dim: 2,
    color: { r: 200, g: 150, b: 35 }
  })


  return (

    <div className="App">
      <header>
        <nav>
          <ul className="bookables items-list-nav">
            <li key={Dataset.Airports} className={dataset === Dataset.Airports ? "selected" : null}>
              <button className="btn" onClick={() => setDataset(Dataset.Airports)}>
                <IoMdAirplane />
                <span>Airports</span>
              </button>
            </li>
            <li key={Dataset.Stores} className={dataset === Dataset.Stores ? "selected" : null}>
              <button className="btn" onClick={() => setDataset(Dataset.Stores)}>
                <FaStoreAlt />
                <span>Stores</span>
              </button>
            </li>
            <li key={Dataset.People} className={dataset === Dataset.People ? "selected" : null}>
              <button className="btn" onClick={() => setDataset(Dataset.People)}>
                <MdPeople />
                <span>People</span>
              </button>
            </li>
          </ul>
        </nav>
      </header>
      <main className='mainView'>
        <StyleComponets style={style} setStyle={setStyle} />
        <div className='map-container'>
          <MapComponet dataset={dataset} style={style} />
        </div>
      </main>
    </div>

  )
}



