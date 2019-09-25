export class FeedbackComment {
    constructor(public _id: string,
                public createdDate: string,
                public __v: number,
                public username: string,
                public rating: number,
                public feedback: string,
                public verified: boolean) {  }
}