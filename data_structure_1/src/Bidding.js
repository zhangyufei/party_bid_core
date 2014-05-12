function Bidding(name, price, phone) {
    this.name = name
    this.price = price
    this.phone = phone
}


Bidding.deal_with_sms = function (sms_json) {
    var name = Bidding.user_name(sms_json).name
    var price = sms_json.messages[0].message.replace(/\s||\S/g, '').toLocaleLowerCase().replace(/^jj/, '');
    var phone = sms_json.messages[0].phone
    var bid = new Bidding(name, price, phone)
    return bid
}

Bidding.process_bidding_sms = function (sms_json) {
    if (Bidding.user_name(sms_json) && !Bidding.repeat_bid(sms_json) && localStorage.is_bidding == "true") {
        Bidding.save_bid_sms(sms_json)
    }
}

Bidding.user_name = function (sms_json) {
    var activities = JSON.parse(localStorage.activities)
    var phone = sms_json.messages[0].phone
    var sign_ups = Bidding.get_current_active_messages(activities).sign_ups
    return  _.find(sign_ups, function (sign_up) {
        return sign_up.phone == phone
    })
}

Bidding.save_bid_sms = function (sms_json) {
    var bid_sms = Bidding.deal_with_sms(sms_json)
    var activities = JSON.parse(localStorage.activities)
    var act = Bidding.get_current_active_messages(activities)
    _.map(act.bids, function (bid) {
        if (bid.name == localStorage.current_bid) {
            bid.biddings.unshift(bid_sms)
        }
    })
    localStorage.setItem("activities", JSON.stringify(activities))
}

Bidding.get_current_active_messages = function (activities) {
    return _.find(activities, function (activity) {
        return activity['name'] == localStorage.current_activity;
    });
}

Bidding.repeat_bid = function (sms_json) {
    var activities = JSON.parse(localStorage.activities)
    var bids = Bidding.get_current_active_messages(activities).bids
    var bid = _.find(bids, function (bid) {
        return bid.name == localStorage.current_bid
    })
    var biddings = bid.biddings
    return _.find(biddings, function (bidding) {
        return bidding.phone == sms_json.messages[0].phone
    })
}