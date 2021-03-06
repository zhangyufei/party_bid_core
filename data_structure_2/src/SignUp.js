function SignUp(name, phone) {
    this.name = name;
    this.phone = phone;
}

SignUp.get_sms = function (sms_json) {
    var name = sms_json.messages[0].message.replace(/\s||\S/g, '').toLocaleLowerCase().replace(/^bm/, '');
    var phone = sms_json.messages[0].phone;
    var sign_up = new SignUp(name, phone);
    return sign_up;
}

SignUp.save_sign_up_message = function (sms_json) {
    var activities = JSON.parse(localStorage.activities);
    var current_activity_id = localStorage.current_activity;
    var sign_up = SignUp.get_sms(sms_json);
    activities[current_activity_id].sign_ups.push(sign_up);
    localStorage.setItem("activities", JSON.stringify(activities));
}

SignUp.process_sign_up_sms = function (sms_json) {
    var sign_up_start = localStorage.is_signing_up;
    var signed_up = SignUp.was_signed_up(sms_json);
    if (sign_up_start == 'true' && !signed_up) {
        SignUp.save_sign_up_message(sms_json);
    }
}

SignUp.was_signed_up = function (sms_json) {
    var activities = JSON.parse(localStorage.activities);
    var current_activity_id = localStorage.current_activity;
    if (activities[current_activity_id].sign_ups) {
        return  _.find(activities, function (activity) {
            return activities[current_activity_id].sign_ups.phone == sms_json.messages[0].phone;
        });
    }
}

SignUp.render_sign_ups = function (activity) {
    var activities = JSON.parse(localStorage.activities);
    var current_activity_id = localStorage.current_activity;
    if (activities[current_activity_id].name == activity) {
        return activities[current_activity_id].sign_ups;
    }
}