import { Collection  } from 'fireorm';
import { Topic } from './Topic';

@Collection()
class Course {
    id: string;
    name: string;
    enabled: boolean;
    topics?: Topic[];
}

export { Course }