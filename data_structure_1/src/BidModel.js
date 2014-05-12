function Bid() {

}

Bid.create_new_bid = function () {
    var activities = Activity.get_activities()
    _.map(activities, function (activity) {
        if (activity.name == localStorage.current_activity) {
            var bid_name = {name: "竞价" + (parseInt(activity.bids.length) + 1), biddings: []}
            activity.bids.push(bid_name)
        }
    })
    localStorage.setItem("activities", JSON.stringify(activities))
}




