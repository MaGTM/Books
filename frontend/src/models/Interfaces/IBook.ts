export interface IBook {
    id: string,
    volumeInfo: {
        authors: string[],
        categories: string[],
        description: string,
        imageLinks: {
            thumbnail: string,
        },
        title: string,
        pageCount: number,
        averageRating: number
    }
}