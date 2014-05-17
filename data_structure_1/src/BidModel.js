function Bid(name) {
    this.name = name;
    this.biddings = [];
}

Bid.create_new_bid = function () {
    var activities = Activity.get_activities();
    var name = "竞价" + (parseInt(activities[0].bids.length) + 1);
    var bid_name = new Bid(name);
    activities[0].name == localStorage.current_activity ? activities[0].bids.push(bid_name) : '';
    localStorage.setItem("activities", JSON.stringify(activities));
}

Bid.get_biddings_messages = function (current_activity, current_bid) {
    var bids = transform_bids_to_view_model(current_activity);
    var bid = _.find(bids, function (bid) {
        return bid.name == current_bid;
    });
    return bid.biddings;
}

function transform_bids_to_view_model(current_activity) {
    var activities = Activity.get_activities();
    var activity = _.find(activities, function (activity) {
        return activity.name == current_activity;
    });
    return activity.bids;
}

function transform_biddings_to_view_model(current_activity, current_bid) {
    var biddings = Bid.get_biddings_messages(current_activity, current_bid);
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






