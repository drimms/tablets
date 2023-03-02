import React, { useState, useEffect, useMemo } from "react"
import {Ipost} from '../types/data'
import '../App.css'


const App: React.FC = () => {
    const [todos, setTodos] = useState<Ipost[]>([])
    const [count, setCount] = useState<number | undefined>()
    const [page, setPage] = useState(1)
    
    async function fetchApi(){
        try {
            const resp = await fetch(`https://jsonplaceholder.typicode.com/posts?_page=${page}`)
            const totPost: number = Number(resp.headers.get('x-total-count'))
            setCount(getPageCount(totPost))
            return resp.json()
        }
        catch(e) {
            alert(e)
        }
    }
    
    function getPageCount(totalCount: number) {
        return Math.ceil((totalCount)/10)
    }
    
        let pageArray = []
        for (let i=0; i< Number(count); i++) {
            pageArray.push(i+1)
        }
    
    function HandleClick(p: number) {
        setPage(p)
    }

    function HandleNav(p: number) {
        setPage(page-p)
    }

    useEffect(() => {
        fetchApi().then(p => {
            setTodos(p)
        })
    }, [page])

   
   const [search, setSearch] = useState<any| undefined>()
   const findList = useMemo(() => {
        return sortList.filter(p => p.title.include(search))
   }, [search, todos])

   const sortList = () => {
       setTodos([...todos].sort((a: Ipost,b: Ipost)=> {return a.title.localeCompare(b.title)}))
   }

    return <div className="body-form">
        <div className="body">
        <div className="finder">
            <div className="finder-box">
                <input
                value={search}
                placeholder="Поиск"
                onChange={e => setSearch(e.target.value)}
                />
                <button type="submit" />
            </div>
        </div>
        <div style={{width: "1077px"}}>
            <table className="table">
                <th>ID</th>
                <th>Заголовок
                    <a onClick={sortList} className='asc'></a>
                </th>
                <th>Описание</th>
                <tbody>
                    {todos.map(p => {
                        return [
                            <tr key={p.id}>
                                <td>{p.id}</td>
                                <td>{p.title}</td>
                                <td>{p.body}</td>
                            </tr>
                        ]
                    })}
                </tbody>
            </table>      
        </div>
       
    </div> <div className="footer">
            <div className="footer-nav"><a onClick={() => HandleNav(1)}>Назад</a></div>
            <div className="footer-center">
                {pageArray.map(p => (
                    <span key={p} style={{padding: '5px'}} onClick={() => HandleClick(p)}>{p}</span>
                ))}
               </div>
            <div className="footer-nav"><a onClick={() => HandleNav(-1)}>Вперед</a></div>

        </div>
    </div>
}

export default (App)