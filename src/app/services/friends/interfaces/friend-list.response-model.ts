export interface FriendListResponseModel{

        count: number,
        items: {
            id: number,
            last_name: string,
            first_name: string
        }[]

}