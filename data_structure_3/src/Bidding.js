function Bidding(price, phone) {
    this.price = price;
    this.phone = phone;
}

Bidding.is_not_on_bidding = function () {
    var status = localStorage.is_bidding;
    if (status == "false" || status == "" || !status) {
        return true;
    }
}

Bidding.have_bid = function (sms_json, current_activity_id, current_bid_id) {
    var bids = JSON.parse(localStorage.bids);
    var bid = _.find(bids, function (bid) {
        if (bid.activity_id == current_activity_id && bid.name == current_bid_id) {
            return bid.biddings;
        }
        ;
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
    var price = sms_json.messages[0].message.replace(/\s||\S/g, "").replace(/^jj/ig, "");
    var phone = sms_json.messages[0].phone;
    _.find(bids, function (bid) {
        if (bid.activity_id == current_activity_id && bid.name == current_bid_id && !isNaN(phone)) {
            var bidding = new Bidding(price, phone);
            return  bid.biddings.unshift(bidding);
        }
        ;
    });
    localStorage.bids = JSON.stringify(bids);
}

Bidding.process_bidding_sms = function (sms_json) {
    var current_activity_id = localStorage.current_activity;
    var current_bid_id = localStorage.current_bid;
    var user_have_sign_up = Bidding.have_sign_up(sms_json, current_activity_id);
    var bid_is_start = Bidding.is_not_on_bidding();
    var user_have_bid = Bidding.have_bid(sms_json, current_activity_id, current_bid_id);
    if (user_have_sign_up && !bid_is_start && !user_have_bid) {
        Bidding.save_bid_sms(sms_json, current_activity_id, current_bid_id);
    }
}

