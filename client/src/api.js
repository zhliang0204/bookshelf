import axios from 'axios'

const service = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? '/api' : 'http://localhost:5000/api',
  withCredentials: true
})

const errHandler = err => {
  console.error(err)
  if (err.response && err.response.data) {
    console.error("API response", err.response.data)
    throw err.response.data.message
  }
  throw err
}

export default {
  service: service,

  isLoggedIn() {
    return localStorage.getItem('user') != null
  },

  // test user Id
  getUserId(){
    if(localStorage.getItem('user') != null){
      return JSON.parse(localStorage.getItem('user'))._id
    } 
  },

  getUserName(){
    if(localStorage.getItem('user') != null){
      return JSON.parse(localStorage.getItem('user')).username
    } 
  },


  signup(userInfo) {
    return service
      .post('/signup', userInfo)
      .then(res => {
        // If we have localStorage.getItem('user') saved, the application will consider we are loggedin
        localStorage.setItem('user', JSON.stringify(res.data))
        res.data
      })
      .catch(errHandler)
  },

  login(username, password) {
    return service
      .post('/login', {
        username,
        password,
      })
      .then(res => {
        // If we have localStorage.getItem('user') saved, the application will consider we are loggedin
        localStorage.setItem('user', JSON.stringify(res.data))
        return res.data
      })
      .catch(errHandler)
  },

  logout() {
    localStorage.removeItem('user')
    return service
      .get('/logout')
  },

  // get personal book shelf
  getBooks(id) {
    return service
      .get('/bookshelf/'+id)
      .then(res => res.data)
      .catch(errHandler)
  },

  getBookDetail(id) {
    return service
      .get('/bookshelf/'+id)
      .then(res => res.data)
      .catch(errHandler)
  },


  postLiks(likes){
    return service
            .post("/user/favorite", likes)
            .then(res => res.data)
            .catch(errHandler)
  },

  addBookToShelf(book){
    return service
            .post('/bookshelf/add', book)
            .then(res => res.data)
            .catch(errHandler)
  },


  // refresh history
  updateHistory(book, id){
    return service
            .post('/bookshelf/history/'+id, book)
            .then(res => res.data)
            .catch(errHandler)
  },

  //remove from bookshelf
  removeBook(bookId){
    return service
            .get("/bookshelf/delete/" + bookId)
            .then(res => res.data)
            .catch(errHandler)
  },

  // get history information of user
  getHistory(userId){
    return service
            .get("/bookshelf/history/" + userId)
            .then(res => res.data)
            .catch(errHandler)
  },

  getUserName(){
    if(localStorage.getItem('user') != null){
      return JSON.parse(localStorage.getItem('user')).username
    }
  },

  getProfile() {
    return service
      .get('/user/profile')
      .then(res => res.data)
      .catch(errHandler)
  },

  editProfile(body) {
    return service
      .put('/user/profile', body)
      .then(res => res.data)
      .catch(errHandler)
  },

  // addPicture(file) {
  //   const formData = new FormData()
  //   formData.append("picture", file)
  //   return service
  //     .post('/endpoint/to/add/a/picture', formData, {
  //       headers: {
  //         'Content-Type': 'multipart/form-data',
  //       },
  //     })
  //     .then(res => res.data)
  //     .catch(errHandler)
  // },
}
