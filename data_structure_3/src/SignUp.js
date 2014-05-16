function SignUp(name, phone, activity_id) {
    this.name = name;
    this, phone = phone;
    this.activity_id = activity_id;
}

SignUp.process_sign_up_sms = function (sms_json) {
    var sign_ups = JSON.parse(localStorage.sign_ups);
    var current_activity_id = localStorage.current_activity;
    var sms = SignUp.get_sms(sms_json, current_activity_id)
    var sign_up_is_not_start = SignUp.is_not_sign_up();
    var user_have_signed_up = SignUp.have_signed_up(current_activity_id, sms_json);
    if (!sign_up_is_not_start && !user_have_signed_up) {
        sign_ups.unshift(sms);
        localStorage.sign_ups = JSON.stringify(sign_ups);
    }
}

SignUp.is_not_sign_up = function () {
    var status = localStorage.is_signing_up;
    if (status == "false" || status == "" || !status) {
        return true;
    }
}

SignUp.have_signed_up = function (current_activity_id, sms_json) {
    var sign_ups = JSON.parse(localStorage.sign_ups);
    return sign_ups.activity_id == current_activity_id && sign_ups.phone == sms_json.messages[0].phone;
}

SignUp.get_sms = function (sms_json, current_activity_id) {
    var name = sms_json.messages[0].message.replace(/\s||\S/g, '').toLocaleLowerCase().replace(/^bm/, '');
    var phone = sms_json.messages[0].phone
    var activity_id = current_activity_id
    var sign_up = new SignUp(name, phone, activity_id)
    return sign_up
}

SignUp.render_sign_ups = function (activity_id) {
    var sign_ups = JSON.parse(localStorage.sign_ups);
    return _.filter(sign_ups, function (sign_up) {
        return sign_up.activity_id == activity_id;
    });
}
