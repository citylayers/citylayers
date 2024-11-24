class GeocodeParser {

    static run(response) {
        let res = response["address"];
        if ("city" in res) {
            return `${res["country"]}, ${res["city"]}`;
        }
        else if ("town" in res) {
            return `${res["country"]}, ${res["town"]}`;
        }
        else {
            return `${res["country"]}`;
        }
    }
}
