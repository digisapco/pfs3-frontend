'use client';
import React from 'react';
import { GoogleMap, useJsApiLoader, MarkerF } from '@react-google-maps/api';

const containerStyle = {
    width: '100%',
    height: '300px',
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
    
    const onLoadMapDetail = React.useCallback(function callback(map) {
        setMap(map)
    }, [])

    const onLoadMarkerDetail = marker => {
        //console.log('marker: ', marker)
    }
    
    const onUnmountMapDetail = React.useCallback(function callback(map) {
        setMap(null)
    }, [])
    
    return isLoaded ? (
        <GoogleMap
            id="pfs_map_detail"
            mapContainerStyle={containerStyle}
            center={center}
            zoom={14}
            onLoad={onLoadMapDetail}
            onUnmount={onUnmountMapDetail}
        >
            <MarkerF
                position={center}
                onLoad={onLoadMarkerDetail}
            />
        </GoogleMap>
    ) : <></>
}

export default DetailMap;