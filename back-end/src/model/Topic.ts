import { Collection } from 'fireorm';

@Collection()
class Topic {
  id: string;
  courseId: string;
  name: string;
  pdf_url: string;
}

export { Topic };
