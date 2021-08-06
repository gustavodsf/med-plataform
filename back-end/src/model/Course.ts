import { Collection, SubCollection, ISubCollection  } from 'fireorm';


class Volume {
    id: string;
    name: string;
    pdf_url: number;
}

@Collection()
class Course {
    id: string;
    name: string;
    @SubCollection(Volume)
    volumes: ISubCollection<Volume>;
}

export { Course }