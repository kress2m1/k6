import http from "k6/http";
import { sleep } from "k6";

//create VUs and specify test runtime duration
export const options = {
    stages: [
        {
            duration: "2h", //ramp up runtime
            target: 10000 //num of users
        },
    ]
}

export default function() {
    http.get("https://test.k6.io/contacts.php");
    sleep(2);
}