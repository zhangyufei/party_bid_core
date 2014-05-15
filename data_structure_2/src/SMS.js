function notify_sms_received(sms_json) {
    var two_string = sms_json.messages[0].message.substr(0, 2)

    function deal_with_sms() {
        var judge_sms = {
            BM: function () {
                SignUp.process_sign_up_sms(sms_json);
            },
            JJ: function () {
                Bidding.process_bidding_sms(sms_json);
            }
        }
        judge_sms[two_string]();
    }

    deal_with_sms()
}