import React from 'react'
import styles from './index.module.scss';
import {
  YMaps,
  Map,
  FullscreenControl,
  Placemark,
}
  from '@pbe/react-yandex-maps';
const API_KEY = '1b0887e8-557b-479a-a776-134a8698943c'
import { useResponsive } from '@/hooks/useResponsive'

export default function Maps() {
  const md = useResponsive('md')
  const defaultState = {
    center: [41.2924481, 69.2116919],
    zoom: 16,
  };
  //const mapOptions = {
  //  suppressMapOpenBlock: true
  //};

  return (
    md ? <a href="https://yandex.ru/maps/?um=constructor%3A5e43476bc7978b2ec59e7cbf423960556f037ef500c36c8243e9564db8a9e502&amp;source=constructorStatic" target="_blank">
      <img src="https://api-maps.yandex.ru/services/constructor/1.0/static/?um=constructor%3A5e43476bc7978b2ec59e7cbf423960556f037ef500c36c8243e9564db8a9e502&amp;width=500&amp;height=400&amp;lang=ru_RU" alt="" style={{ border: "0" }} />
    </a> :
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
    //<iframe src="https://yandex.ru/map-widget/v1/?um=constructor%3A5e43476bc7978b2ec59e7cbf423960556f037ef500c36c8243e9564db8a9e502&amp;source=constructor&controls=none" width="100%" height="400" frameBorder="0"></iframe>
    //<iframe src="https://yandex.ru/map-widget/v1/?um=constructor%3A5e43476bc7978b2ec59e7cbf423960556f037ef500c36c8243e9564db8a9e502&amp;source=constructor&controls=" width="100%" height="400" frameBorder="0"></iframe>
  )
}
