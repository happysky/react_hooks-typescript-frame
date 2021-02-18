import React, {useMemo} from 'react'
import styles from './index.css'

export default ({ poi }) => {

    const isMobile = useMemo(()=>{
        const ua = navigator.userAgent.toLowerCase();
        let isMobile = ua.indexOf('android') > -1 || ua.indexOf('iphone') > -1
        return isMobile
    }, [])

    return <div id="listContainer">
        <div id="container">
            <div>
                <div className={styles.lists}>
                    <ul>
                        {poi.map((item, index)=>{
                            const url = isMobile ? `https://m.map.so.com/?pid=${item.pguid}&src=nucleic_topic` : `https://ditu.so.com/?pid=${item.pguid}&src=nucleic_topic`;

                            return <li key={index} data-log='{"type":"covid19_nucleic_list"}'><a className={styles.poiItem} href={url}>
                            <h3>{(index+1)}.{item.name}</h3>
                            <p>{item.address}</p>
                            </a>
                            {item.tels && item.tels[0] && 
                                <a className={styles.tel} href={`tel:${item.tels[0]}`}>电话</a>
                            }
                            </li>
                        })}
                    </ul>
                </div>
            </div>
            <div className="cityList">

            </div>
        </div>
    </div>
}