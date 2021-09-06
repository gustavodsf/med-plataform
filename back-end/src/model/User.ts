import { Collection } from 'fireorm';

@Collection()
class User {
    id: string;
    email: string;
    name: string;
    profile: string;
    enabled: boolean;
    courses_id: string[];
}

export { User }