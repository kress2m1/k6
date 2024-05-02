import http from "k6/http";
//we use check to compliment assertions
import { check } from "k6";

export default function() {
    //to work with what comes back from the server, we need to define a variable
    const res = http.get("https://test.k6.io");
    console.log(res.status)
    console.log(res.body)

    check(res, {
        //check that the response code is 200
        "status code is 200": (r) => r.status === 200,
        //check the page body for a specifict text
        "This is the landing page": (r) => r.body.includes("Collection of simple web-pages suitable for load testing") === true
    });
}


