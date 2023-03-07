'use client';
import React from 'react';
import { GoogleMap, useJsApiLoader, MarkerF } from '@react-google-maps/api';
import Search from '../styles/search.module.scss';

const containerStyle = {
    width: '100%',
    height: '250',
    borderRadius: '5px'
};

const DetailMap = ({position}) => {

    const center = {
        lat: position.lat,
        lng: position.lng
    };

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyCMgnW66lfQJgM5MMG_OyHfU74OcjwEYyE"
    })
    
    const [map, setMap] = React.useState(null)
    
    const onLoad = React.useCallback(function callback(map) {
        // This is just an example of getting and using the map instance!!! don't just blindly copy!
        const bounds = new window.google.maps.LatLngBounds(center);
        map.fitBounds(bounds);

        setMap(map)
    }, [])
    
    const onUnmount = React.useCallback(function callback(map) {
        setMap(null)
    }, [])
    
    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={{
                lat : parseFloat(position.lat),
                lng : parseFloat(position.lng)
            }}
            zoom={10}
            onLoad={onLoad}
            onUnmount={onUnmount}
        >
            <MarkerF
                position={center}
            />
        </GoogleMap>
    ) : <></>
}

export default DetailMap;