import { Collection } from 'fireorm';
import { Topic } from '@model/Topic';

@Collection()
class Course {
  id: string;
  name: string;
  enabled: boolean;
  topics?: Topic[];
}

export { Course };
