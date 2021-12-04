const DEAL_URL = "http://localhost:5000/deal";

const getMyDeals = () => {
    return fetch(DEAL_URL + "/my" , {
        mode: 'cors',
        method: 'GET',
        headers : {
            'Content-Type' : 'application/json'
        },
        credentials: 'include'
    });
}

const getBought = () => {
    return fetch(DEAL_URL + "/my/bought" , {
        mode: 'cors',
        method: 'GET',
        headers : {
            'Content-Type' : 'application/json'
        },
        credentials: 'include'
    });
}

const getSold = () => {
    return fetch(DEAL_URL + "/my/sold" , {
        mode: 'cors',
        method: 'GET',
        headers : {
            'Content-Type' : 'application/json'
        },
        credentials: 'include'
    });
}

export default {
    getMyDeals,
    getBought,
    getSold
} 