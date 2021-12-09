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

const createDeal = (id, address) => {
    const values = { post_id : id, ...address };
    return fetch(DEAL_URL, {
        mode: 'cors',
        method: 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(values)
    });  
}

const addTrackingNumber = (id, code) => {
    const values = { deal_id : id, code : code, action: "express" };
    return fetch(DEAL_URL, {
        mode: 'cors',
        method: 'PUT',
        headers : {
            'Content-Type' : 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(values)
    });  
}

const confirmReceipt = (id) => {
    const values = { deal_id : id, action: "confirm" };
    return fetch(DEAL_URL, {
        mode: 'cors',
        method: 'PUT',
        headers : {
            'Content-Type' : 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(values)
    });  
}

const cancelDeal = (id, reason) => {
    const values = { 
        deal_id : id,
        reason: reason
    };
    return fetch(DEAL_URL, {
        mode: 'cors',
        method: 'DELETE',
        headers : {
            'Content-Type' : 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(values)
    });  
}

const rateDeal = (id, values) => {
    let sendOver = { deal_id : id, ...values };
    return fetch(DEAL_URL + "/rate", {
        mode: 'cors',
        method: 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(sendOver)
    });  
} 

const getDealRating = (id) => {
    const values = { deal_id : id };
    const uri = Object.keys(values).map((k)=> {
        return k + "=" + encodeURIComponent(values[k]);
    }).join("&");
    return fetch(DEAL_URL + "/rate?" + uri, {
        mode: 'cors',
        method: 'GET',
        headers : {
            'Content-Type' : 'application/json'
        },
        credentials: 'include'
    });  
} 

const deleteRating = (id) => {
    const values = { deal_id : id };
    return fetch(DEAL_URL + "/rate", {
        mode: 'cors',
        method: 'DELETE',
        headers : {
            'Content-Type' : 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(values)
    });  
} 

export default {
    getMyDeals,
    getBought,
    getSold,
    createDeal,
    cancelDeal,
    addTrackingNumber,
    confirmReceipt,
    rateDeal,
    deleteRating,
    getDealRating
} 