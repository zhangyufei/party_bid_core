function notify_sms_received(sms_json) {

    var get_two_string = sms_json.messages[0].message.substr(0, 2)

    function sms_messages() {
        var judge_sms = {
            BM: function () {
                SignUp.process_sign_up_sms(sms_json)
            },
            JJ: function () {
                Bidding.process_bidding_sms(sms_json)
            }
        }
            judge_sms[get_two_string]()
    }

    sms_messages()
}