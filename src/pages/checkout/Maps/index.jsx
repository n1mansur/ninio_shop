import React, { useEffect, useState } from 'react'
import {
  YMaps,
  Map,
  SearchControl,
  withYMaps,
  FullscreenControl,
  Placemark,
}
  from '@pbe/react-yandex-maps';
const API_KEY = '1b0887e8-557b-479a-a776-134a8698943c'
export const apikey = '1b0887e8-557b-479a-a776-134a8698943c'



//export const mapDefaults = {
//  center: [41.311151, 69.279737],
//  zoom: 12,
//}

export default function Maps({ setAddressInfo }) {
  const [placemarkGeometry, setPlacemarkGeometry] = useState(null);

  const handleMapClick = (e) => {
    const coordinates = e.get('coords');
    setPlacemarkGeometry(coordinates);
    setAddressInfo({ resultCoordinates: coordinates })
    //console.log(e)
  };

  const handleResultShow = (e) => {
    setPlacemarkGeometry(e.originalEvent.target._yandexState._model.resultCoordinates)
    //const selected = e.get('target').getResultsArray();
    //console.log(e);
    //console.log({ request: e.originalEvent.target._yandexState._model.request, resultCoordinates: e.originalEvent.target._yandexState._model.resultCoordinates });
    setTimeout(() => {
      setAddressInfo({
        request: e.originalEvent.target._yandexState._model.request,
        resultCoordinates: e.originalEvent.target._yandexState._model.resultCoordinates
      })
    }, 300);
  };


  const defaultState = {
    center: [41.304501, 69.2416],
    zoom: 11,
  };
  const mapOptions = {
    suppressMapOpenBlock: true
  };

  return (
    <YMaps query={{ lang: 'en_RU', apikey: API_KEY }}>
      <Map
        defaultState={defaultState}
        width={'100%'}
        options={mapOptions}
        onClick={handleMapClick}
      >
        {placemarkGeometry && <Placemark geometry={placemarkGeometry} />}
        <FullscreenControl options={{ float: 'left' }} />
        <SearchControl
          defaultState={{ zoom: 8 }}
          onResultShow={handleResultShow}
          options={{ float: 'left' }}
        />
      </Map>
    </YMaps>
  )
}
