function Bidding() {

}

Bidding.is_not_on_bidding = function () {
    var status = localStorage.is_bidding;
    if (status == "false" || status == "" || !status) {
        return true;
    }
}

