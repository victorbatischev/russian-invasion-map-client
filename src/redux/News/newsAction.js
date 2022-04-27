import axios from "axios";


export const getNews = () => async (dispatch) => {

   const response = await axios.get('https://jsonplaceholder.typicode.com/photos/?_start=0&_limit=50')


};