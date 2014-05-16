function Activity(activity_name) {
    this.name = activity_name;
    this.sign_ups = [];
    this.bids = [];
    this.biddings = {};
}

Activity.prototype.create = function () {
    var activities = JSON.parse(localStorage.activities);
    var activity_ids = JSON.parse(localStorage.activity_ids);
    var activity_id = activity_ids.length;
    localStorage.current_activity = activity_id;
    activities[activity_id] = this;
    activity_ids.push(JSON.stringify(activity_id));
    localStorage.activities = JSON.stringify(activities);
    localStorage.activity_ids = JSON.stringify(activity_ids);
    localStorage.activity_id_generator = activity_id + 1;
}

Activity.get_activities = function () {
    return JSON.parse(localStorage.activities);
}

