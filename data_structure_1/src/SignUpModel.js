function SignUp(name, phone) {
    this.name = name
    this.phone = phone
}
SignUp.process_sign_up_sms = function (sms_json) {
    var activities=localStorage.activities
    var current_activity=localStorage.current_activity
    var sign_ups=[]
    var sign_up=SignUp.sms(sms_json)
    var is_signing_up=SignUp.is_signing_up(sign_ups,sign_up)
    if(is_signing_up){
        sign_ups.push(sign_up)
    }
    localStorage.setItem(activities,JSON.stringify("activities"))

}

SignUp.sms = function (sms_json) {
    var name = sms_json.messages[0].message.replace(/\s||\S/g, '').toLocaleLowerCase().replace(/^bm/, '');
    var phone = sms_json.messages[0].phone
    var sign_up = new SignUp(name, phone)
    return sign_up
}

SignUp.is_signing_up = function (sign_ups, sign_up) {
    return _.find(sign_ups, function (u) {u.phone == sign_up.phone}) == undefined && localStorage.is_sign_up == 'true'
}
