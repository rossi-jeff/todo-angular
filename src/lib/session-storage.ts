import { SessionData, blankSession } from '../types/session-data.type';

export class SessionStorage {
  private readonly _key: string = 'todo-angular';
  private _data!: SessionData;

  constructor() {}

  get data() {
    this.retrieveData();
    return this._data;
  }

  set data(newSession: SessionData) {
    this._data = newSession;
    this.storeData();
  }

  private retrieveData() {
    if (sessionStorage) {
      const stored = sessionStorage.getItem(this._key);
      this._data = stored ? JSON.parse(stored) : blankSession;
    } else this._data = blankSession;
  }

  private storeData() {
    if (sessionStorage) {
      sessionStorage.setItem(this._key, JSON.stringify(this._data));
    }
  }
}
