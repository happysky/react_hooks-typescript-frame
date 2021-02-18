import React, {useEffect, useMemo, useState, useRef, useReducer} from 'react'
import styles from './index.css'
import TitleBar from '../../../index/components/TitleBar'
import Banner from '../../../index/components/Banner'
import Tab from '../Tab'
import List from '../List'
import axios from 'utils/http'


function App() {
    const locationRef = useRef()
    const [poiList, setPoiList] = useState([])

    const getCityByIp = function(){
        return axios.get('https://api.map.so.com/local', {
            dataType: 'jsonp',
            timeout: 2000,
            params: {
                'apikey':'3a141df397801104f2bf',
                'ad': 1
            }
        })
    }

    const getData = function(){
        console.log('getData', locationRef.current)
        var city = locationRef.current.city;
        var self = this;
        var params = {
            keyword: '核酸检测机构',
            cityname: city,
            number: 200,
            src: 'hesuanjiancejigouzhuanti',
            ext: -1
        }
        try{
            if(city === locationRef.current.city && locationRef.current.location[0] && locationRef.current.location[1]){
                params.mp = locationRef.current.location[0] + ',' + locationRef.current.location[1];
                params.sort = 'distance';
                params.order = 'asc';
            }
        }catch(e){}
        
        axios.get('https://restapi.map.so.com/api/simple?sid=1000', {
            dataType: 'jsonp',
            params
        }).then((response)=>{
            console.log('response', response)
            if(!(response && response.poi)){
                return false;                
            }
            
            setPoiList(response.poi)
        });
    }

    useEffect(async ()=>{
        const location = await getCityByIp()
        locationRef.current = location.result
        getData();
        
    }, [])


    return (
        <div className={styles.container}>
            <TitleBar type="travelpolicy"></TitleBar>
            <Banner type="travelpolicy"></Banner>
            <Tab></Tab>
            <List poi={poiList}></List>
        </div>
    )
}

export default App