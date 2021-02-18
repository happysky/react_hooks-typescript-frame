import React from 'react'
import styles from './index.css'

export default ({ type = '' }) => {
    return <div className={styles.nav}>
        <div className={styles.logo}>360地图抗疫频道</div>
        <ul>
            <li className={type === 'riskarea' ? styles.active : ''}><a href="riskarea.html">风险等级</a></li>
            <li className={type === 'nucleic' ? styles.active : ''}><a href="index.html">核酸检测</a></li>
            <li className={type === 'nearbyrisk' ? styles.active : ''}><a href="nearbyrisk.html">附近疫情</a></li>
            <li className={type === 'travelpolicy' ? styles.active : ''}><a href="travelpolicy.html">出行政策</a></li>
            <li className={type === 'riskarea' ? styles.active : ''}><a href="https://ditu.so.com/zt/qianxi/?src=yiqing">迁徙地图</a></li>
        </ul>
    </div>
}