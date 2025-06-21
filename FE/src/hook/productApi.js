import axios from 'axios';

export const getAllProducts = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_KEY}/products`);
    return res.data; // chỉ trả về phần data
}
