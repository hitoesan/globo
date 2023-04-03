import { useState } from "react";
import config from "../config";
import useFetchHouses from "../hooks/HouseHooks";
import { House } from "../types/House";
import { currencyFormatter } from "../config";
import ApiStatus from "../ApiStatus";

// Irá armazenar os dados da API em um state
const HouseList = () => {

    const { data, status, isSuccess } = useFetchHouses();

    if(!isSuccess) {
        // Em caso de erro, irá renderizar o status em vez da tabela de casas
        return <ApiStatus status={status}/>
    }
    // [houses, setHouses] = houses é o prop do state e setHouses é a função que irá setá-lo

    /*
    const [data, setdata] = useState<House[]>([]);  // Array vazio do tipo 'House'

    const fetchHouses = async() => {
        const rsp = await fetch(config.baseApiUrl + "/houses"); // Faz chamada à API
        const houses = await rsp.json();
        setdata(houses);
    }
    fetchHouses();
    */

    return(
        <div>
            <div className="row mb-2">
                <h5 className="themeFontColor text-center">
                Houses currently on the market
                </h5>
            </div>
            <table className="table table-hover">
                <thead>
                <tr>
                    <th>Address</th>
                    <th>Country</th>
                    <th>Asking Price</th>
                </tr>
                </thead>
                <tbody>
                {data && data.map((h: House) => (
                    <tr key={h.id}>
                        <td>{h.address}</td>
                        <td>{h.country}</td>
                        <td>{currencyFormatter.format(h.price)}</td>
                    </tr>
                    ))}
                </tbody>
            </table>
      </div>
    )
}

export default HouseList;