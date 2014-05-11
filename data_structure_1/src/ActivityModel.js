function Activity(activity_name) {
    this.name = activity_name
    this.bids = []
    this.sign_ups = []
}

Activity.prototype.create = function () {
    var activities = JSON.parse(localStorage.activities)
    activities.unshift(this)
    localStorage.setItem("activities", JSON.stringify(activities))
}

Activity.prototype.active = function () {
    localStorage.current_activity = this.name
}

Activity.get_activities = function () {
    return JSON.parse(localStorage.activities)
}