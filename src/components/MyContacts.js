import { useState, useEffect, lazy, Suspense } from 'react'
import useFetch from "../hooks/useFetch"
import Search from "./Search"
import useUpdateDocTitle from '../hooks/useUpdateDocTitle'
import {ErrorBoundary} from 'react-error-boundary'
// import TableUsers from './TableUsers';
import ErrorFallback from './ErrorFallback';
const TableUsers = lazy(() => import('./TableUsers'))// import dynamique

const MyContacts = () => {
    
    const [search, setSearch] = useState(''); //input
    const [resultSearch, setResultSearch] = useState([]);//resultat de la recherche
    const {data, isLoading} = useFetch("https://jsonplaceholder.typicode.com/users");
    // console.log(users)


    // useUpdateDocTitle(search)

    for (let index = 0; index < 100000000; index++) {
        
    }
    //custom hook
    const filterUsers = () =>{
        const foundUsers = data.filter(user =>{
            return Object.values(user)
            .join(' ')
            .toLowerCase()
            .includes(search.toLowerCase())
        })
        setResultSearch(foundUsers);
    }



    useEffect(() => {
        if (search !=='') {
            //Filter
            filterUsers();
        }
        else{

            setResultSearch([])
        }

    }, [search]);
    const handleChange = e => {
        setSearch(e.target.value)

    }

    const msgDisplay = (msg, color) => {
        return (

            <p style={{ textAlign: 'center', color: color }}>
                {msg}
            </p>
        )

    }
    return (
        <>

            {
                isLoading ? msgDisplay('Veillez pratienter!', 'red') : (

                    <Search
                        searchStr={search}
                        searchHandler={handleChange}

                    />
                )
            }
            {
                resultSearch.length === 0 && search !== '' ? msgDisplay("Pas de resultat!", "red")
                    :
                    // search === '' ?  msgDisplay("Veuillez effectuer une recherche!", "black") 
                    search === '' ? null

                        :
                        <ErrorBoundary FallbackComponent={ErrorFallback}  >

                            
                        <Suspense
                            fallback={<div>Chargement en cours...</div>}>
                            <TableUsers
                                dataArray={resultSearch} />

                        </Suspense>
                        </ErrorBoundary>


                            }
        </>
    )

}

export default MyContacts