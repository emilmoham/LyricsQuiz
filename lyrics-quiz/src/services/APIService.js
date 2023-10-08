import axios from 'axios';

const useApiService = () => {
    const getGeniusData = async (geinusLink) => {
        let resource = geinusLink.split("genius.com/")[1];
        return await axios.get(`http://localhost:8001/getGameData/${resource}`)
    }

    return {
        getGeniusData
    }
}

export default useApiService;