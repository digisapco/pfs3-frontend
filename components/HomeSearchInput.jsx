'use client'
import {useState, useEffect, useRef} from 'react';
import HomeStyle from '../styles/home.module.scss';
import {FaEnvelope, FaCity, FaMapMarkerAlt, FaRegCompass, FaHome } from 'react-icons/fa';
import {BiCurrentLocation} from 'react-icons/bi'; 
import slugify from 'slugify';

const HomeSearchInput = ( props ) => {
    const listRef = useRef(null);
    const [searchTerm,setSearchTerm] = useState("");
    const [suggestions,setSuggestions] = useState([]);
    const handleSearch=(e)=>{
        const value = e.target.value;
        setSearchTerm(value);

        if(value.trim().length>0){
            fetch(`/api/propertiesSearch?q=${value}`)
                .then(res=>res.json())
                .then(data=>{
                    setSuggestions(data);
                })
                .catch(err=>{console.error(err)});
        } else{
            setSuggestions([]);
        }
    }
    const handleSetValue = (item) => {
        let itemSelectedName = '';
        switch (item.category) {
            case 'zipcode': 
                itemSelectedName = item.code;
                document.getElementById('zc').value = item.code;
            break;
            case 'city':
                itemSelectedName = item.name;
                document.getElementById('ci').value = item.slug;
            break;
            case 'county':
                itemSelectedName = item.name;
                document.getElementById('co').value = item.slug;
            break;
            case 'zone':
                itemSelectedName = item.name;
                document.getElementById('zn').value = item.slug;
            break;
            case 'project_name':
                itemSelectedName = item.name;
                var url = '/proyectos-preconstruccion';
                url+= '/' + item.zone_slug + '-zn';
                url+= '/'+item.slug;
                props.router.push(url)
            break;
            case 'property':
                itemSelectedName = item.address.full;
                var url = '/casas-y-apartamentos';
                switch(item.property.type) {
                    case 'RES':
                        url+= '/comprar';
                    break;
                    case 'RNT':
                        url+= '/rentar';
                    break;
                    case (item.type=='RES' && item.mls.status!=='Active'):
                        url+= '/vendido';
                }
                url+= '/'+ slugify(item.address.city).toLowerCase()+'-ci';
                url+= '/'+ item.slug;
                props.router.push(url);
        }
        document.getElementById('home_input').value = itemSelectedName;
        setSuggestions([]);
    }
    const renderSuggestions=()=>{
        if(suggestions.length>0){
            return(
                <ul ref={listRef}>
                    {
                        suggestions.map((item,idx) => {
                            let icon = '';
                            let categoryName = '';
                            let itemName = '';
                            switch (item.category) {
                                case 'zipcode': 
                                    icon = <FaEnvelope />
                                    categoryName = 'Código postal';
                                    itemName = item.code;
                                break;
                                case 'city':
                                    icon = <FaCity />
                                    categoryName = 'Ciudad';
                                    itemName = item.name;
                                break;
                                case 'county':
                                    icon = <FaMapMarkerAlt />
                                    categoryName = 'Condado';
                                    itemName = item.name;
                                break;
                                case 'zone':
                                    icon = <FaRegCompass />
                                    categoryName = 'Condado';
                                    itemName = item.name;
                                break;
                                case 'project_name':
                                    icon = <FaHome />
                                    categoryName = 'Proyecto';
                                    itemName = item.name;
                                break;
                                case 'property':
                                    icon = <BiCurrentLocation />
                                    categoryName = 'Propiedad';
                                    itemName = item.address.full;
                            }
                            return (<li key={idx} onClick={() => {handleSetValue(item)}}>{itemName}<span>{icon} {categoryName}</span></li>)
                        })
                    }
                </ul>
            )
        }
    }
    useEffect(() => {
        function handleKeyDown(e) {
            const list = listRef.current;
            if (!list) return;

            const active = document.activeElement;
            let index = Array.from(list.children).indexOf(active);

            switch (e.key) {
                case "ArrowDown":
                    e.preventDefault();
                    if (index === list.children.length - 1) {
                        index = 0;
                    } else {
                        index++;
                    }
                    console.log(list.children[index].innerText);
                    list.children[index].focus();
                break;
                case "ArrowUp":
                    e.preventDefault();
                    if (index <= 0) {
                        index = list.children.length - 1;
                    } else {
                        index--;
                    }
                    console.log(list.children[index]);
                    list.children[index].focus();
                break;
                case "Enter":
                    e.preventDefault();
                    
                break;
                default:
                break;
            }
        }

        const input = document.getElementById('home_input');
        input.addEventListener("keydown", handleKeyDown);
        
        return () => {
            input.removeEventListener("keydown", handleKeyDown);
        }
    }, []);

    return(
        <div className={HomeStyle.ac_input}>
            <input type="search" id="home_input" autocomplete="off" placeholder="Ciudad, condado o dirección" onChange={handleSearch}/>
            {renderSuggestions()}
        </div>
    )
}

export default HomeSearchInput;