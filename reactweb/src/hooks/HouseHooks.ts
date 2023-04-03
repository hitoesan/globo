import { useEffect, useState } from "react";
import config from "../config";
import { House } from "../types/House";
import { useQuery } from "react-query";
import axios, { AxiosError } from "axios";

const useFetchHouses = () => {
  return useQuery<House[], AxiosError>("houses", () =>
    axios.get(`${config.baseApiUrl}/houses`).then((resp) => resp.data)
  );
};

const useFetchHouse = (id: number) => {
  return useQuery<House, AxiosError>(["houses", id], () => 
  axios.get(`config.baseApiUrl/houses/${id}` + "/houses")
       .then((resp) => resp.data));
}

const useFetchHouses2 = () => {
  // House[] é o tipo de dado que irá receber em uma prop chamada 'data' 
  // AxiosError é o tipo que irá receber em caso de erro
  // "houses" é onde o dado será armazenado
  return useQuery<House[], AxiosError>("houses", () => 
  axios.get(config.baseApiUrl + "/houses")
       .then((resp) => resp.data));
}


// Separa o fetch/chamada da API do componente
const useFetchHouses3 = (): House[] => {
    const [houses, setHouses] = useState<House[]>([]);  // Array vazio do tipo 'House'


    //Utilizando fetch do JS
    // Executa a função do primeiro parâmetro sempre que o estado do segundo parâmetro for alterado
    // Para esta aplicação, será executado apenas 1 vez quando aplicação for renderizada
    useEffect(() => {

        const fetchHouses = async() => {
            const rsp = await fetch(config.baseApiUrl + "/houses"); // Faz chamada à API
            const houses = await rsp.json();
            setHouses(houses);
        }
        fetchHouses();

    }, []);
    return houses;
    
    // Utilizando React Query e Axios para fazer fetch
    // React Query funciona como Redux
    // npm install axios@0 react-query@3
}

export default useFetchHouses;
export { useFetchHouse };