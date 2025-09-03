export class Task {
  constructor(title, priority, status) {
    this.title = title;
    this.priority = priority;
    this.status = status;
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
