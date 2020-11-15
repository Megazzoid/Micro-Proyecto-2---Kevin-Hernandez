export interface Character {
    id: number;
    name: string;
    status: string;
    species: string;
    type: string;
    gender: string;
    origin: Origin;
    location: Location;
    image: string;
    episode: Array<string>;
    url: string;
    created: string;
    havelikes?: boolean;
    likes?: number;
}


interface Origin{
    name: string;
    url: string;

}

interface Location {
    name: string;
    url: string;
}