function SignUp(name, phone) {
    this.name = name;
    this.phone = phone;
}
SignUp.process_sign_up_sms = function (sms_json) {
    var sign_up_is_start = localStorage.is_signing_up;
    var user_signed_up = SignUp.was_signed_up(sms_json);
    if (!user_signed_up && sign_up_is_start == 'true') {
        SignUp.save_sign_up_message(sms_json);
    }
}

SignUp.get_sms = function (sms_json) {
    var name = sms_json.messages[0].message.replace(/\s||\S/g, '').toLocaleLowerCase().replace(/^bm/, '');
    var phone = sms_json.messages[0].phone;
    var sign_up = new SignUp(name, phone);
    return sign_up;
}

SignUp.was_signed_up = function (sms_json) {
    return _.find(Activity.get_activities(), function (activity) {
        return activity.name == localStorage.current_activity && activity.sign_ups.phone == sms_json.messages[0].phone;
    });
}

SignUp.save_sign_up_message = function (sms_json) {
    var sign_up = SignUp.get_sms(sms_json);
    var activities = Activity.get_activities();
    _.map(activities, function (activity) {
        return activity.name == localStorage.current_activity ? activity.sign_ups.push(sign_up) : '';
    });
    localStorage.setItem("activities", JSON.stringify(activities));
}

SignUp.render_sign_ups = function (act) {
    var activities = JSON.parse(localStorage.activities);
    var acts = _.find(activities, function (avtivity) {
        return avtivity.name == act;
    });
    return acts.sign_ups;
}



