function Activity(activity_name) {
    this.name = activity_name;
    this.id = JSON.stringify(JSON.parse(localStorage.activities).length)
}

Activity.prototype.create = function () {
    var activities = JSON.parse(localStorage.activities);
    activities.unshift(this);
    localStorage.setItem("activities", JSON.stringify(activities));
    localStorage.current_activity = this.id;
    localStorage.activity_id_generator = parseInt(this.id) + 1;
}
