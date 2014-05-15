function Bidding(phone, price) {
    this.phone = phone;
    this.price = price;
}

Bidding.create_new_bid = function (current_activity) {
    var activities = JSON.parse(localStorage.activities);
    var bid_name = "竞价" + (parseInt(activities[current_activity].bids.length) + 1);
    activities[current_activity].bids.unshift(bid_name)
    activities[current_activity].biddings[bid_name] = [ ];
    localStorage.setItem("activities", JSON.stringify(activities));
}

Bidding.process_bidding_sms = function (sms_json) {
    var activities = JSON.parse(localStorage.activities);
    var current_activity_id = localStorage.current_activity;
    var current_bid_id = localStorage.current_bid;
    var user_not_sign_up = Bidding.did_not_sign_up(activities, current_activity_id, sms_json);
    var bid_not_on_bidding = Bidding.is_not_on_bidding();
    var user_have_bid = Bidding.have_bid(activities, current_activity_id, current_bid_id, sms_json)
    if (user_not_sign_up && !bid_not_on_bidding && !user_have_bid) {
        Bidding.save_bid_sms(activities, current_activity_id, current_bid_id, sms_json)
    }
}

Bidding.did_not_sign_up = function (activities, current_activity_id, sms_json) {
    var phone = activities[current_activity_id].sign_ups.phone == sms_json.messages[0].phone

    return !phone
}

Bidding.is_not_on_bidding = function () {
    var status = localStorage.is_bidding;
    if (status == "false" || status == "" || !status) {
        return true;
    }
}

Bidding.have_bid = function (activities, current_activity_id, current_bid_id, sms_json) {
    var bid_phones = activities[current_activity_id].biddings[current_bid_id];
    return _.find(bid_phones, function (bid_phone) {
        return bid_phone['phone'] == sms_json.messages[0].phone;
    })

}

Bidding.save_bid_sms = function (activities, current_activity_id, current_bid_id, sms_json) {
    var bidding = Bidding.get_user_bid_message(sms_json);
    activities[current_activity_id].biddings[current_bid_id].unshift(bidding);
    localStorage.setItem("activities", JSON.stringify(activities));
}

Bidding.get_user_bid_message = function (sms_json) {
    var phone = sms_json.messages[0].phone;
    var price = sms_json.messages[0].message.replace(/\s||\S/g, "").replace(/^jj/ig, "");
    var bidding = new Bidding(phone, price);
    return bidding;
}











