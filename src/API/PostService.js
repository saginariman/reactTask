import axios from "axios";
export default class PostService{
    static async addTovarToCard(p_lang, p_shop, p_id){
        const response = await axios.post('https://lichi.com/api/cart/add',
            JSON.stringify({lang:p_lang, shop:p_shop, id:p_id})
        )
        return response
    }

    static async getTovs(p_lang, p_shop){
        const response = await axios.post('https://lichi.com/api/cart/list',
            JSON.stringify({lang:p_lang, shop:p_shop})
        )
        return response
    }

    static async removeTov(p_lang, p_shop, p_id){
        const response = await axios.post('https://lichi.com/api/cart/remove',
            JSON.stringify({lang:p_lang, shop:p_shop, id:p_id, all: false})
        )
        return response
    }
}