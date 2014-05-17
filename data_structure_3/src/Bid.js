function Bid(name, activity_id) {
    this.name = name;
    this.activity_id = activity_id;
    this.biddings = [];
}

Bid.create_new_bid = function (activity_id) {
    var bids = JSON.parse(localStorage.bids);
    var name = "竞价" + (parseInt(bids.length) + 1);
    var bid = new Bid(name, activity_id)
    bids.unshift(bid);
    localStorage.bids = JSON.stringify(bids);
}

Bid.render_bids = function (activity_id) {
    var bids = JSON.parse(localStorage.bids);
    return _.filter(bids, function (bid) {
        if (bid.activity_id == activity_id) {
            return bid.name;
        }
    });
}