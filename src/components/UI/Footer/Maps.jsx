import React from 'react'
import {
  YMaps,
  Map,
  FullscreenControl,
  Placemark,
}
  from '@pbe/react-yandex-maps';
const API_KEY = '1b0887e8-557b-479a-a776-134a8698943c'

export default function Maps() {
  const defaultState = {
    center: [41.2924481, 69.2116919],
    zoom: 16,
  };
  //const mapOptions = {
  //  suppressMapOpenBlock: true
  //};

  return (
    <YMaps query={{ lang: 'ru_RU', apikey: API_KEY }}>
      <Map
        defaultState={defaultState}
        width={'100%'}
        //options={mapOptions}
      >
        <FullscreenControl />
        <Placemark geometry={[41.2924481, 69.2116919]} />
      </Map>
    </YMaps>
    //<iframe className={styles.maps} src="https://yandex.ru/map-widget/v1/?um=constructor%3A5e43476bc7978b2ec59e7cbf423960556f037ef500c36c8243e9564db8a9e502&amp;source=constructor&controls=-geolocationControl" width="100%" height="400" frameBorder="0"></iframe>
  )
}
