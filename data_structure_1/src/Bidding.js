function Bidding(name, price, phone) {
    this.name = name
    this.price = price
    this.phone = phone
}


Bidding.deal_with_sms = function (sms_json) {
    var name = Bidding.user_name(sms_json)
    var price = sms_json.messages[0].message.replace(/\s||\S/g, '').toLocaleLowerCase().replace(/^jj/, '');
    var phone = sms_json.messages[0].phone
    var bid = new Bidding(name, price, phone)
    return bid
}

Bidding.process_bidding_sms = function (sms_json) {
    if (Bidding.user_name(sms_json)) {
        Bidding.save_bid_sms(sms_json)
    }
}

Bidding.user_name = function (sms_json) {
    var activities = JSON.parse(localStorage.activities)
    var phone = sms_json.messages[0].phone
    var sign_ups = Bidding.get_current_active_messages(activities).sign_ups
    var user_name = _.find(sign_ups, function (sign_up) {
        return sign_up.phone == phone
    })
    return user_name.name
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