import { useParams } from "react-router-dom";
import ApiStatus from "../ApiStatus";
import { useFetchHouse } from "../hooks/HouseHooks";

const HouseDetail = () => {
    const { id } = useParams();
    if (!id) throw Error("House id not found.");

    const houseId = parseInt(id);

    const { data, status, isSuccess} = useFetchHouse(houseId);
    if(!isSuccess) return <ApiStatus status={status} />
    if(!data) return <div>House not found.</div>

    return(
        <></>
    )
}

export default HouseDetail;