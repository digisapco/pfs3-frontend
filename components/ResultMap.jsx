'use client';
import React from 'react';
import { GoogleMap, useJsApiLoader, MarkerF, OverlayView, InfoWindow } from '@react-google-maps/api';
import ResultItem from './ResultItem';

const containerStyle = {
    width: '100%',
    height: '73vh',
    borderRadius: '5px'
};

const center = {
    lat: 0,
    lng: 0
};

const ResultMap = (props) => {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyCMgnW66lfQJgM5MMG_OyHfU74OcjwEYyE"
    })

    const [map, setMap] = React.useState(null);
    const [activeMarker, setActiveMarker] = React.useState(null);

    React.useEffect(() => {
        if (map) {
            const bounds = new window.google.maps.LatLngBounds();
            props.properties.map(marker => {
                bounds.extend({
                    lat: marker.geo.lat,
                    lng: marker.geo.lng
                });
            });
            map.fitBounds(bounds);
        }
    }, [map, props.properties]);

    const handleActiveMarker = (marker) => {
        if (marker === activeMarker) {
            return;
        }
        setActiveMarker(marker);
    };

    const onLoad = React.useCallback(function callback(map) {
        const bounds = new window.google.maps.LatLngBounds(center);

        map.fitBounds(bounds);
        setMap(map)
    }, [])

    const onLoadMarker = marker => {
        console.log('marker: ', marker)
    }
    
    const onUnmount = React.useCallback(function callback(map) {
        setMap(null)
    }, []);

    const getPixelPositionOffset = (offsetWidth, offsetHeight, labelAnchor) => {
        return {
            x: offsetWidth + labelAnchor.x,
            y: offsetHeight + labelAnchor.y,
        };
    };
    
    return isLoaded ? (
        <GoogleMap
            id="pfs_map_results"
            mapContainerStyle={containerStyle}
            center={center}
            zoom={14}
            onLoad={onLoad}
            onUnmount={onUnmount}
            onClick={() => setActiveMarker(null)}
        >
        {
            props.properties.map(item => {
                let iconMarker = new window.google.maps.MarkerImage(
                    '/img/pfs-marker-transparent.svg',
                    null, /* size is determined at runtime */
                    null, /* origin is 0,0 */
                    null, /* anchor is bottom center of the scaled image */
                    new window.google.maps.Size(32, 32)
                );

                return (
                    <>
                        <MarkerF
                            key={item.mlsId}
                            icon={iconMarker}
                            position={{
                                lat : parseFloat(item.geo.lat),
                                lng : parseFloat(item.geo.lng)
                            }}
                            onClick={() => handleActiveMarker(item.mlsId)}
                            onLoad={onLoadMarker}
                            zIndex={10000}
                        >
                            {activeMarker === item.mlsId ? (
                                <InfoWindow onCloseClick={() => setActiveMarker(null)}>
                                    <ResultItem item={item} inMap={true} />
                                </InfoWindow>
                            ) : null}
                        </MarkerF>
                        <OverlayView
                            key={item._id}
                            position={{
                                lat : parseFloat(item.geo.lat),
                                lng : parseFloat(item.geo.lng)
                            }}
                            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
                            getPixelPositionOffset={(x, y) => getPixelPositionOffset(x, y, { x: -43, y: -34})}>
                                <div
                                    style={{
                                        background: `#f9097d`,
                                        padding: `2px 2px`,
                                        fontSize: '10px',
                                        color: `black`,
                                        border: `solid 1px #000`
                                    }}
                                >
                                    {
                                        Intl.NumberFormat('en-US', {
                                            notation: "compact",
                                            maximumFractionDigits: 1
                                        }).format(item.listPrice)
                                    }
                                </div>
                        </OverlayView>
                    </>
                )
            }) 
        }
        </GoogleMap>
    ) : <></>
}

export default ResultMap;