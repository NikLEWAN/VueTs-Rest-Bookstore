import axios, {
    AxiosResponse,
    AxiosError
} from "../../node_modules/axios/index"

interface IBook {
    id: number
    title: string
    author: string
    publisher: string
    price: number
}

let baseUri: string = "http://anbo-bookstorerest.azurewebsites.net/api/Books"

new Vue({
    el: "#app",
    data: {
        books: [],
        errors: [],
        deleteId: 0,
        deleteMessage: "",
        formData: { title: "", author: "", publisher: "", price: 0 },
        addMessage: ""
    },
    methods: {
        getAllBooks() {
            axios.get<IBook[]>(baseUri)
                .then((response: AxiosResponse<IBook[]>) => {
                    this.books = response.data
                })
                .catch((error: AxiosError) => {
                    //this.message = error.message
                    alert(error.message)
                })
        },
        deleteBook(deleteId: number) {
            let uri: string = baseUri + "/" + deleteId
            axios.delete<void>(uri)
                .then((response: AxiosResponse<void>) => {
                    this.deleteMessage = response.status + " " + response.statusText
                    this.getAllBooks()
                })
                .catch((error: AxiosError) => {
                    //this.deleteMessage = error.message
                    alert(error.message)
                })
        },
        addBook() {
            axios.post<IBook>(baseUri, this.formData)
                .then((response: AxiosResponse) => {
                    let message: string = "response " + response.status + " " + response.statusText
                    this.addMessage = message
                    this.getAllBooks()
                })
                .catch((error: AxiosError) => {
                    // this.addMessage = error.message
                    alert(error.message)
                })
        }
    }
})