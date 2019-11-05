import axios from "axios";

// const API_URL = process.env.API_URL || "https://photo-rails-backend.herokuapp.com/";
const API_URL = process.env.API_URL || "http://localhost:3000";

axios.defaults.baseURL = API_URL;

axios.defaults.headers.post["Content-Type"] = "application/json";

axios.defaults.xsrfCookieName = "CSRF-TOKEN";

axios.defaults.xsrfHeaderName = "X-CSRF-Token";

axios.defaults.withCredentials = true;


export default {
    getPhotos() { 
        return axios.get("/photos");
    },
    getCollectionItems() {
        return axios.get("/collection_items");
    },
    createSession(username, password) {
        return axios.post("/session", { username, password });
    },
    deleteSession() {
        return axios.delete("/session", {});
    },
    createUser(username, password) {
        return axios.post("/users", { username, password });
    },
    createCollectionItem(photoId) {
        return axios.post("/collection_items", { photo_id: photoId });
    },
    deleteCollectionItem(photoId) {
        
        return axios.delete("/collection_items/remove_item", {params: { photo_id: photoId }});
    },
    createComment(data) {
        return axios.post("/comments", {photo_id: data.photoId, comment_body: data.commentBody } )
    },
    loadUsernames() {
        return axios.get('/users')
    }
    
};



import store from "./store";
import router from "./router";

// axios.interceptors.response.use(
//     function (response) {
//         // debugger
//         return response;
//     },
//     function (error) {
//         // debugger
//         if (!error.response) {
//             alert(`Cannot access API: ${error.message}`);
//         } else if (error.response.status == 401) {
//             console.error("Unauthorized, prompting Sign out");
//             store.dispatch("signOut").then(() => {
//                 router.replace("sign-in");
//             });
//         }
//         return Promise.reject(error);
//     }
// );
