import {useState} from 'react'
import ReactMapGL, {Marker, Popup} from 'react-map-gl';
import { getCenter } from 'geolib';
import "mapbox-gl/dist/mapbox-gl.css";

function Map({searchResults}) {
    const [selectedLocation, setSelectedLocation] = useState({});

    // Transform the search result object into the { latitude: 52.516272, longitude: 13.377722 } object
    const coordinates = searchResults.map(result => ({
        longitude: result.long,
        latitude: result.lat,
    }))

    const center = getCenter(coordinates);

    const [viewport, setViewport] = useState({
        width: "100%",
        height: "100%",
        latitude: center.latitude,
        longitude: center.longitude,
        zoom: 11.5,
    })

    return(
        <ReactMapGL
            mapStyle='mapbox://styles/hfchanak/cl1i2u10d00bx14s9gts0q2x9'
            mapboxAccessToken={process.env.mapbox_key}
            {...viewport}
            onMouseMove={(nextViewport) => setViewport(nextViewport)}
        >
            {searchResults.map(result => (
                <div key={result.long}>
                    <Marker longitude={result.long} latitude={result.lat}>
                        <p role="img" onClick={() => setSelectedLocation(result)} className='cursor-pointer text-2xl' aria-label='push-pin' data-interception='off'>📍</p>
                    </Marker>
                    {/* The popup that should show if we click on a Marker */}
                    {selectedLocation.long === result.long ? (
                        <Popup
                            closeOnClick={true}
                            latitude={result.lat}
                            longitude={result.long}
                        >
                            {result.title}
                        </Popup>
                    ) : (false)}
                </div>
            ))}
        </ReactMapGL>
    )
}

export default Map