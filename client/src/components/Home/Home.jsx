import { useEffect } from 'react';
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
    const items = useSelector(state=>state.items);
    const folders = useSelector(state=>state.folders);

    useEffect(()=>{
        dispatch(getFolders(aux.id));
        dispatch(getItems(aux.id));
    })

    return(
        <div>
            <NavBar/>
            {
                items?.map(el=>{
                    return <p>{el.name}</p>
                })
            }
            {
                folders?.map(el=>{
                    return <p>{el.name}</p>
                })
            }
        </div>
    )
}

export default Home;