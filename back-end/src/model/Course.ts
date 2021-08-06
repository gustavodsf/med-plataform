import { Collection, SubCollection, ISubCollection  } from 'fireorm';


class Topic {
    id: string;
    name: string;
    pdf_url: number;
}

@Collection()
class Course {
    id: string;
    name: string;
    @SubCollection(Topic)
    topics?: ISubCollection<Topic>;
}

export { Course, Topic }