import db from '../db';

export default class PostApi {
  constructor() {
    this.collection = 'users';
  }

  getPosts(id) {
    if (id) {
      return db.doc(id);
    }

    return db.collection(this.collection).get();
  }
}
