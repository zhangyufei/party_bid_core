function Bidding() {

}

Bidding.create_new_bid = function () {
    var activities = JSON.parse(localStorage.activities);
    var current_activity_id = localStorage.current_activity;
    var bid_name = "竞价" + (parseInt(activities[current_activity_id].bids.length) + 1);
    activities[current_activity_id].bids.unshift(bid_name)
    activities[current_activity_id].biddings[bid_name] = [ ];
    localStorage.setItem("activities", JSON.stringify(activities));
}