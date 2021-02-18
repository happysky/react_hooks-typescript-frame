import React from 'react'
import styles from './index.css'

export default ({type})=>{
    const imgs = {
        riskarea: 'https://p5.ssl.qhimg.com/t01da64d88b9c4b6599.png',
        nucleic: 'https://p0.ssl.qhimg.com/t01f837ec92f0a4391f.png',
        travelpolicy: 'https://p5.ssl.qhimg.com/t01a149a6e820621403.png'
    }
    const img = imgs[type]
    return <div className={styles.banner} style={{backgroundImage:`url(${img})`}}>

    </div>
}