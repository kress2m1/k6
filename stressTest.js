import http from "k6/http";
import { sleep } from "k6";

//create VUs and specify test runtime duration
export const options = {
    stages: [
        {
            duration: "20s",
            target: 300
        },
        {
            duration: "6m",
            target: 300
        },
        {
            duration: "30s",
            target: 0
        }
    ]
}

export default function() {
    http.get("https://test.k6.io");
    sleep(2);
    http.get("https://test.k6.io/contacts.php");
    sleep(2);
    http.get("https://test.k6.io/news.php");
    sleep(2);
}