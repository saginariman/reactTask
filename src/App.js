import React, {useState} from 'react'
import PostService from './API/PostService'
import { useFetching } from './hooks/useFetching'
import './styles/App.css'
import Cookies from 'js-cookie';
export default function App() {
  const [anyCook, setAnyCook] = useState('')

  const [tovId, setTovID] = useState('');
  const [mess, setMess] = useState('');

  const [fetchingAdd, loadingAdd, errorAdd] = useFetching(async(lang, shop, id)=>{
    const res = await PostService.addTovarToCard(lang, shop, id)
    console.log(res);
    console.log(Cookies.get(res.config.xsrfCookieName))
    setAnyCook(res.config.xsrfCookieName)
    setMess(res.data.api_messages[0].text)
  })
  const [fetchingGet, loadingGet, errorGet] = useFetching(async()=>{
    const res = await PostService.getTovs(1, 1)
    console.log(res)
  })
  const [fetchingRemove, loadingRemove, errorRemove] = useFetching(async(lang, shop, id)=>{
    const res = await PostService.removeTov(lang, shop, id)
    console.log(res)
    setMess(res.data.api_messages[0].text)
  })

  return (
    <div className="App">
      {loadingAdd || loadingGet || loadingRemove ?<p>Загрузка...</p> : ''}
      <p>{errorAdd, errorGet, errorRemove}</p> 
      <div className="btn__groups">
        <input placeholder="id Товара" type="text" value={tovId} onChange={(e)=>setTovID(e.target.value)}/>
        <button className="btn" onClick={()=>fetchingAdd(1, 1, tovId)}>Добавить</button>
        <button className="btn" onClick={()=>fetchingGet()}>Получить список</button>
        <button className="btn" onClick={()=>fetchingRemove(1, 1, tovId)}>Удалить</button>
      </div>
      <h3>{mess}</h3>
      <h3>cookie: {anyCook}</h3>
    </div>
  )
}
