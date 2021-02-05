import React from 'react'
import styles from './index.css'

export default()=>{
    const test = async ()=>{
        const t1 = await new Promise((resolve, reject)=>{
            setTimeout(()=>{
                resolve('done')
                console.log('123')
            },5000)
        });
        console.log(t1)
    }
    return <div className={styles.titlebar} data-html2canvas-ignore>
            <span className={styles.goback} data-action="goback" onClick={test}>
                返回
            </span>
            核酸检测地点
        </div>
}