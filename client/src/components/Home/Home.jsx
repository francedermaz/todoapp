import { useEffect, useState } from 'react';
import NavBar from '../NavBar/NavBar';
import styles from './Home.module.css';
import { useSelector, useDispatch } from "react-redux";
import { getFolders, getItems } from '../../redux/actions';

const Home = () => {
    let aux = { name: "" };
    if (localStorage.getItem("user")) {
      aux = localStorage.getItem("user");
      aux = JSON.parse(aux);
    }
    const dispatch = useDispatch();
    
    let foldernum=null;
    const items = useSelector(state=>state.items);
    const folders = useSelector(state=>state.folders);
    const [input,setInput] = useState({
        name:''
    })

    function handleFolderClick(e){
        foldernum=e.target.value;
        dispatch(getItems(aux.id,foldernum));
        dispatch(getFolders(0));
    }

    function handleChange(e){
        e.preventDefault();
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        })
    }

    function handleSubmit(e){
        dispatch()
    }

    useEffect(()=>{
        dispatch(getFolders(aux.id)); //Get folders
        dispatch(getItems(aux.id,foldernum));
    },[dispatch])

    return(
        <div>
            <NavBar/>
            <div className={styles.page}>
                <form onSubmit={e=>handleSubmit(e)}>
                    <input className={styles.input}
                    value={input.name} type='text' name='name' placeholder="Item" onChange={e=>handleChange(e)}>
                    </input>
                </form>
                <ul>
                {
                    items?.map(el=>{
                        return <li>{el.name}</li>
                    })
                }
                </ul>
                <ul>
                {
                    folders?.map(el=>{
                        return <li id={el.id} value={el.id} onClick={(e)=>handleFolderClick(e)}>{el.name}</li>
                    })
                }
                </ul>
            </div>
        </div>
    )
}

export default Home;