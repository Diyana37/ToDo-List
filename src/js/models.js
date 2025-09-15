export class Task {
  constructor(id, title, priority, status) {
    this.id = id;
    this.title = title;
    this.priority = priority;
    this.status = status;
  }

  get id() {
    return this._id;
  }

  set id(value) {
    this._id = value;
  }
  
  get title() {
    return this._title;
  }

  set title(value) {
    this._title = value;
  }

  get priority() {
    return this._priotity;
  }

  set priority(value) {
    this._priotity = value;
  }

  get status() {
    return this._status;
  }

  set status(value) {
    this._status = value;
  }
}
