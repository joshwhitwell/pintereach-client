import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../styles/scss/Home.scss'

export default function Search() {
    const [initialSearch, setinitialSearch] = useState([]);
    const [userSearch, setUserSearch] = useState('news channels');

    useEffect(() => {
        const getSearch = () => {
            axios.get(`https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&srsearch=${userSearch}&origin=*`)
                .then(res => {
                    console.log(res.data.query.search, 'axios call')
                    setinitialSearch(res.data.query.search);
                })
                .catch(err => {
                    alert("err");
                })
        }
        getSearch();
    }, [])

    const onChange = (e) => {
        const { name, value } = e.target;
        setUserSearch(value);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        axios.get(`https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&srsearch=${userSearch}&origin=*`)
            .then((res) => {
                setinitialSearch(res.data.query.search);
            })
            .catch((err) => {
                alert(err);
            })
    }

    return (
        <section className="home-content">
            <form className='search-form' onSubmit={onSubmit}>
                <label>
                    Search:
                    <input type='text' name="search" onChange={onChange}/>
                </label>
                <button>Search</button>
            </form>
            <div className="wiki-list">
                {initialSearch.map((p, i) => (
                    <a target="_blank"href={`https://en.wikipedia.org/wiki/${p.title}`}>
                    <ul>
                        <img src="https://img.icons8.com/ios/452/wikipedia.png" alt="wikipedia icon"/>
                        <li key={p.i}>{p.title}</li>
                    </ul>
                    </a>
                ))}
            </div>
        </section>
    )
}