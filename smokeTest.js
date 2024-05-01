import http from "k6/http";
import { sleep } from "k6";

//create VUs and specify test runtime duration
export const options = {
    vus: 1, //num of users
    duration: "30s" //test runtime
}

export default function() {
    http.get("https://test.k6.io");
    sleep(2);
    http.get("https://test.k6.io/contacts.php");
    sleep(2);
    http.get("https://test.k6.io/news.php");
    sleep(2);
}