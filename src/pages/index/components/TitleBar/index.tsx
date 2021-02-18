import React from 'react'
import styles from './index.css'

export default () => {
    return <div className={styles.nav}>
        <div className={styles.logo}>360地图抗疫频道</div>
        <ul>
            <li><a href="/zt/riskarea/">风险等级</a></li>
            <li className={styles.active}><a href="/zt/nucleic/">核酸检测</a></li>
            <li><a href="/zt/nearbyrisk">附近疫情</a></li>
            <li><a href="/zt/travelpolicy/">出行政策</a></li>
            <li><a href="https://ditu.so.com/zt/qianxi/?src=yiqing">迁徙地图</a></li>
        </ul>
    </div>
}