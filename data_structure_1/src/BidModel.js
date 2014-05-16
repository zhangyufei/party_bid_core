function Bid() {

}

Bid.create_new_bid = function () {
    var activities = Activity.get_activities();
    _.map(activities, function (activity) {
        if (activity.name == localStorage.current_activity) {
            var bid_name = {name: "竞价" + (parseInt(activity.bids.length) + 1), biddings: []};
            activity.bids.push(bid_name);
        }
    });
    localStorage.setItem("activities", JSON.stringify(activities))
}

function transform_bids_to_view_model(current_activity) {
    var activities = Activity.get_activities();
    var activity = _.find(activities, function (activity) {
        return activity.name == current_activity;
    })
    return activity.bids;
}

function transform_biddings_to_view_model(current_activity, current_bid) {
    var bids = transform_bids_to_view_model(current_activity);
    var bid = _.find(bids, function (bid) {
        return bid.name == current_bid;
    })
    var biddings = bid.biddings;
    return _.chain(biddings)
        .sortBy(function (bidding) {
            return bidding.price
        })
        .groupBy(function (bidding) {
            return bidding.price
        })
        .filter(function (bidding) {
            return bidding.length == 1
        })
        .first()
        .value();
}




