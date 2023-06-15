import { User } from './user'
import { Category } from './category'

export interface Article {

    id: number
    title: string
    publication_date: Date
    modification_date : Date
    lead: string
    content: string
    publication_image: string
    author: User
    categories: Category[]
}