import axios from 'axios';

const useApiService = () => {
    const getGameData = async (geinusLink) => {
        let resource = geinusLink.split("genius.com/")[1];
        return await axios.get(`http://localhost:8001/getGameData/${resource}`)
    }

    return {
        getGameData
    }
}

export default useApiService;