function Bidding(price, phone) {
    this.price = price;
    this.phone = phone;
}

Bidding.have_bid = function (sms_json, current_activity_id, current_bid_id) {
    var bids = JSON.parse(localStorage.bids);
    var bid = _.find(bids, function (bid) {
        return bid.activity_id == current_activity_id && bid.name == current_bid_id
    });
    var biddings = bid.biddings
    return _.find(biddings, function (bidding) {
        return bidding.phone == sms_json.messages[0].phone;
    });
}

Bidding.have_sign_up = function (sms_json, current_activity_id) {
    var sign_ups = JSON.parse(localStorage.sign_ups);
    return _.find(sign_ups, function (sign_up) {
        return sign_up.activity_id == current_activity_id && sign_up.phone == sms_json.messages[0].phone;
    });
}

Bidding.save_bid_sms = function (sms_json, current_activity_id, current_bid_id) {
    var bids = JSON.parse(localStorage.bids);
    var bidding = Bidding.get_bid_sms(sms_json);
    bids[0].biddings.unshift(bidding);
    localStorage.bids = JSON.stringify(bids);
}

Bidding.get_bid_sms = function (sms_json) {
    var price = sms_json.messages[0].message.replace(/\s||\S/g, "").replace(/^jj/ig, "");
    var phone = sms_json.messages[0].phone;
    if (!isNaN(price)) {
        var bidding = new Bidding(price, phone);
    }
    return bidding;
}

Bidding.process_bidding_sms = function (sms_json) {
    var current_activity_id = localStorage.current_activity;
    var current_bid_id = localStorage.current_bid;
    var user_have_sign_up = Bidding.have_sign_up(sms_json, current_activity_id);
    var bid_is_start = localStorage.is_bidding;
    var user_have_bid = Bidding.have_bid(sms_json, current_activity_id, current_bid_id);
    if (user_have_sign_up && bid_is_start == "true" && !user_have_bid) {
        Bidding.save_bid_sms(sms_json, current_activity_id, current_bid_id);
    }
}

Bidding.render_biddings = function (activity_id, bid_id) {
    var minnum = Bidding.get_minnum(activity_id, bid_id);
    var sign_ups = JSON.parse(localStorage.sign_ups);
    var user_name = _.find(sign_ups, function (sign_up) {
        return sign_up.activity_id == activity_id && sign_up.phone == minnum[0].phone
    });
    minnum[0]["name"] = user_name.name;
    return minnum;
}

Bidding.get_minnum = function (activity_id, bid_id) {
    var biddings = Bidding.get_biddings_messages(activity_id, bid_id);
    return  _.chain(biddings)
        .sortBy(function (bidding) {
            return parseInt(bidding.price)
        })
        .groupBy(function (bidding) {
            return bidding.price
        })
        .find(function (bidding) {
            return bidding.length == 1
        })
        .value();
}

Bidding.get_biddings_messages = function (activity_id, bid_id) {
    var bids = JSON.parse(localStorage.bids);
    var bid = _.find(bids, function (bid) {
        return bid.activity_id == activity_id && bid.name == bid_id;
    });
    return bid.biddings;
}