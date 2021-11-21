const IMAGE_URL = "http://localhost:5000/image";

const sendImages = (images) => {
    let formData = new FormData();
    for (let i = 0; i < images.length; i++) {
        formData.append(`photos_${i}`, images[i]);
    }
    return fetch(IMAGE_URL, {
        mode: 'cors',
        method: 'POST',
        credentials: 'include',
        body: formData
    });
}

export default {
    sendImages
}