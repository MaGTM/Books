import {FullStar} from "./Star/FullStar";
import {EmptyStar} from "./Star/EmptyStar";
import {HalfStar} from "./Star/HalfStar";

export class Rating {
    public rating: number = 0
    private stars: {logo: string}[] = []

    constructor(rating: number) {
        this.rating = rating
    }

    getStars() {
        for(let i = 0; i < 5; i++) {
            this.stars[i] = new EmptyStar()
        }
        for(let i = 0; i < Math.floor(this.rating); i++) {
            this.stars[i] = new FullStar()
        }
        if(this.rating % Math.floor(this.rating) !== 0 && this.rating !== 0) {
            this.stars[Math.floor(this.rating)] = new HalfStar()
        }
        return this.stars
    }
}