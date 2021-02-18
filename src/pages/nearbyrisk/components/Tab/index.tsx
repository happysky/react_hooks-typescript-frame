import React from 'react'
import styles from './index.css'

export default ()=>{
    return <div className={styles.navs}>
    <ul id="navs">
        <li data-action="toggleListAndCity" className={styles.active}>定位城市</li>
        <li data-action="viewSwitch" data-toview="map" data-log='{"type":"covid19_nucleic_mapmode"}'>地图模式</li>
        <li data-action="viewSwitch" data-toview="list" data-log='{"type":"covid19_nucleic_listmode"}'>列表模式</li>
    </ul>
</div>
}