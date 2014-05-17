function Bidding(phone, price) {
    this.phone = phone;
    this.price = price;
}

Bidding.create_new_bid = function (current_activity) {
    var activities = JSON.parse(localStorage.activities);
    var bid_name = "竞价" + (parseInt(activities[current_activity].bids.length) + 1);
    activities[current_activity].bids.unshift(bid_name);
    activities[current_activity].biddings[bid_name] = [];
    localStorage.setItem("activities", JSON.stringify(activities));
}

Bidding.process_bidding_sms = function (sms_json) {
    var current_activity_id = localStorage.current_activity;
    var current_bid_id = localStorage.current_bid;
    var bid_can_save = Bidding.is_can_save(sms_json, current_activity_id, current_bid_id);
    if (bid_can_save) {
        Bidding.save_bid_sms(current_activity_id, current_bid_id, sms_json);
    }
}

Bidding.is_can_save = function (sms_json, current_activity_id, current_bid_id) {
    var activities = JSON.parse(localStorage.activities);
    var user_not_sign_up = Bidding.did_not_sign_up(activities, current_activity_id, sms_json);
    var bid_not_on_bidding = localStorage.is_bidding;
    var user_have_bid = Bidding.have_bid(activities, current_activity_id, current_bid_id, sms_json);
    return user_not_sign_up && bid_not_on_bidding == 'true' && !user_have_bid;
}

Bidding.did_not_sign_up = function (activities, current_activity_id, sms_json) {
    var sign_ups = activities[current_activity_id].sign_ups;
    var phone = sms_json.messages[0].phone;
    return  _.find(sign_ups, function (sign_up) {
        return sign_up.phone == phone;
    });
}

Bidding.have_bid = function (activities, current_activity_id, current_bid_id, sms_json) {
    var bid_phones = activities[current_activity_id].biddings[current_bid_id];
    return _.find(bid_phones, function (bid_phone) {
        return bid_phone['phone'] == sms_json.messages[0].phone;
    });
}

Bidding.save_bid_sms = function (current_activity_id, current_bid_id, sms_json) {
    var activities = JSON.parse(localStorage.activities);
    var bidding = Bidding.get_user_bid_message(activities, current_activity_id, sms_json);
    activities[current_activity_id].biddings[current_bid_id].unshift(bidding);
    localStorage.setItem("activities", JSON.stringify(activities));
}

Bidding.get_user_bid_message = function (activities, current_activity_id, sms_json) {
    var phone = sms_json.messages[0].phone;
    var price = sms_json.messages[0].message.replace(/\s||\S/g, "").replace(/^jj/ig, "");
    if (!isNaN(price)) {
        var bidding = new Bidding(phone, price);
    }
    return bidding;
}

Bidding.min_not_repeat = function (current_activity_id, current_bid) {
    var biddings = JSON.parse(localStorage.activities)[current_activity_id].biddings[current_bid];
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


function transform_bids_to_view_model(activity) {
    var activities = JSON.parse(localStorage.activities);
    return activities[activity].bids;
}

function transform_biddings_to_view_model(current_activity_id, current_bid) {
    var activities = JSON.parse(localStorage.activities);
    var min_not_repeat = Bidding.min_not_repeat(current_activity_id, current_bid);
    var sign_up_applicant = _.find(activities[current_activity_id].sign_ups, function (c) {
        return c.phone == min_not_repeat[0].phone;
    });
    min_not_repeat[0]['name'] = sign_up_applicant.name;
    return min_not_repeat;
}










