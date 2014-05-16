function Bid(name, activity_id, biddings) {
    this.name = name;
    this.activity_id = activity_id;
    this.biddings = biddings;
}

Bid.create_new_bid = function (activity_id) {
    var bids = JSON.parse(localStorage.bids);
    var name = "竞价" + (parseInt(bids.length) + 1);
    var activity_id = activity_id;
    var biddings = [];
    var bid = new Bid(name, activity_id, biddings)
    bids.unshift(bid);
    localStorage.bids = JSON.stringify(bids);
}