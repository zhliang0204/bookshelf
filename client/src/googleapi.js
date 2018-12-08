import axios from "axios";

const service = axios.create({
  // baseURL: 'https://www.googleapis.com/books/v1/volumes/?q=',
  baseURL: "https://www.googleapis.com/books/v1/volumes/"

  // withCredentials: true
});

const errHandler = err => {
  console.error(err);
  if (err.response && err.response.data) {
    console.error("API response", err.response.data);
    throw err.response.data.message;
  }
  throw err;
};

export default {
  service: service,


  // generate random books
  // url : https://www.googleapis.com/books/v1/volumes/?q=''&maxResults=30&startIndex=1
  randombooks(startIndex, maxNum) {
    return service.get("?q=''&maxResults=" + maxNum + '&startIndex=' + startIndex)
            // .then(response => console.log(response.data.items))
            .then(response =>{
              return response.data.items.map(item => ({
                onlineId: item.id,
                imageUrl: item.volumeInfo.imageLinks && item.volumeInfo.imageLinks.thumbnail?item.volumeInfo.imageLinks.thumbnail: 'https://image.freepik.com/free-vector/books-stack-realistic_1284-4735.jpg',
                title: item.volumeInfo.title,
                author: item.volumeInfo.authors,
                description: item.volumeInfo.description,
                category: item.volumeInfo.categories,
                buyLink: item.saleInfo.buyLink,
                price: item.saleInfo.listPrice ? item.saleInfo.listPrice.amount : 0,
                }));
              })
            .catch(errHandler)
  },

  // generate books according to the author or categories

  recommendedAuthor(startIndex, maxNum, author){
    return service.get("?q=inauthor:" + author + "&maxResults=" + maxNum + '&startIndex=' + startIndex)
            .then(response => {if(response.data.items){return response.data.items.map(item => ({
              onlineId: item.id,
              imageUrl: item.volumeInfo.imageLinks && item.volumeInfo.imageLinks.thumbnail?item.volumeInfo.imageLinks.thumbnail: 'https://image.freepik.com/free-vector/books-stack-realistic_1284-4735.jpg',
              title: item.volumeInfo.title,
              author: item.volumeInfo.authors,
              description: item.volumeInfo.description,
              category: item.volumeInfo.categories,
              buyLink: item.saleInfo.buyLink,
              price: item.saleInfo.listPrice ? item.saleInfo.listPrice.amount : 0,
              }));
            }})
            .catch(errHandler)
  },

  recommendedCategory(startIndex, maxNum, category){
    return service.get("?q=subject:" + category + "&maxResults=" + maxNum + '&startIndex=' + startIndex)
            .then(response => {
              if(response.data.items !== undefined){
              return response.data.items.map(item => ({
              onlineId: item.id,
              imageUrl: item.volumeInfo.imageLinks && item.volumeInfo.imageLinks.thumbnail?item.volumeInfo.imageLinks.thumbnail: 'https://image.freepik.com/free-vector/books-stack-realistic_1284-4735.jpg',
              title: item.volumeInfo.title,
              author: item.volumeInfo.authors,
              description: item.volumeInfo.description,
              category: item.volumeInfo.categories,
              buyLink: item.saleInfo.buyLink,
              price: item.saleInfo.listPrice ? item.saleInfo.listPrice.amount : 0,
              }));
             } else {
               return null;
             }
            })
            .catch(errHandler)
  },


  searchBook(startIndex, maxNum, searchContent){
    return service.get("?q=" + searchContent + "&maxResults=" + maxNum + '&startIndex=' + startIndex)
                  .then(response => {return response.data.items.map(item => ({
                    onlineId: item.id,
                    imageUrl: item.volumeInfo.imageLinks && item.volumeInfo.imageLinks.thumbnail?item.volumeInfo.imageLinks.thumbnail: 'https://image.freepik.com/free-vector/books-stack-realistic_1284-4735.jpg',
                    title: item.volumeInfo.title,
                    author: item.volumeInfo.authors,
                    description: item.volumeInfo.description,
                    category: item.volumeInfo.categories,
                    buyLink: item.saleInfo.buyLink,
                    price: item.saleInfo.listPrice ? item.saleInfo.listPrice.amount : 0,
                    }));
                  })
                  .catch(errHandler)
  }

}
