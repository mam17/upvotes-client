import { Actions } from "react-native-router-flux";
import api from '../services/api'
import reactotron from "reactotron-react-native";
import DropDownHolder from '../components/dropDownHolder'

/*
 * Action types
 */
export const Types = {
    POSTS: "post/POSTS"
};

/*
 * Reducer
 
 */
const INITIAL_STATE = {
    posts: null,
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case Types.POSTS:
            return { ...state, posts: action.payload };
        default:
            return state;
    }
};

export const Creators = {
    /// DEFAULT SETERS HERE
    setPosts: posts => ({
        type: Types.POSTS,
        payload: posts
    }),
    getPosts: () => (dispatch, getState) => {
        api.get('/posts/')
            .then(res => dispatch(Creators.setPosts(res.data)))
            .catch(err => reactotron.log(err))
    },
    createPost: message => (dispatch, getState) => {
        api.post('/posts',
            {
                message,
                author: getState().AppReducer.device_id
            }
        ).then(res => {
            DropDownHolder.show('success', 'Sucesso!', 'Post adicionado com sucesso')
            dispatch(Creators.getPosts())
        })
    },
    ratePost: postId => dispatch => {
        api.post(`/posts/rate?id=${postId}`)
            .then(() => dispatch(Creators.getPosts()))
            .catch(() => false)
    }
}