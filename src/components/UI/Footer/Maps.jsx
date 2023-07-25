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
  const mapOptions = {
    suppressMapOpenBlock: true
  };
  //{/*<a href="https://yandex.ru/maps/?um=constructor%3Ad8bcdadddbf3d9b679f5d707454694ed62cc1d08548c82b14d745354ff9393f1&amp;source=constructorStatic" target="_blank"><img src="https://api-maps.yandex.ru/services/constructor/1.0/static/?um=constructor%3Ad8bcdadddbf3d9b679f5d707454694ed62cc1d08548c82b14d745354ff9393f1&amp;width=100&amp;height=100&amp;lang=ru_RU" alt="" style={{ border: "0" }} /></a>*/}
  //{/*<Script type="text/javascript" charset="utf-8" async src="https://api-maps.yandex.ru/services/constructor/1.0/js/?um=constructor%3Ad8bcdadddbf3d9b679f5d707454694ed62cc1d08548c82b14d745354ff9393f1&amp;width=200&amp;height=356&amp;lang=ru_RU&amp;scroll=true"></Script>*/}
  //{/*<Script type="text/javascript" charset="utf-8" async src="https://api-maps.yandex.ru/services/constructor/1.0/js/?um=constructor%3Ad8bcdadddbf3d9b679f5d707454694ed62cc1d08548c82b14d745354ff9393f1&amp;width=100%25&amp;height=356&amp;lang=ru_RU&amp;scroll=true"></Script>*/}
  return (
    <iframe src="https://yandex.ru/map-widget/v1/?um=constructor%3Ad8bcdadddbf3d9b679f5d707454694ed62cc1d08548c82b14d745354ff9393f1&amp;source=constructor" width="100%" height="100%" frameBorder="0"></iframe>
    //<YMaps query={{ lang: 'en_RU', apikey: API_KEY }}>
    //  наше место нахождения
    //  <Map
    //    defaultState={{ center: [41.2924481, 69.2116919], zoom: 15 }}
    //    width={'80vw'}
    //    options={mapOptions}
    //  >
    //    <Placemark geometry={[41.2924481, 69.2116919]} />
    //    <FullscreenControl options={{ float: 'left' }} />
    //  </Map>
    //</YMaps>
  )
}
