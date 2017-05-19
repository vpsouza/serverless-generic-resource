'use strict';

var getTenant = require('../lib/get-tenant');

test('get-tenant test', () => {
	//generated from jwt.io debugger
    let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5hbnRJRCI6InRlc3RlIn0.j-NUJF8fbeV5fDtASOu3QZPXmoeo_tZFAHbGAwGbJe4";
    expect.assertions(1);
    return getTenant('secret')([token, "A", 123, {"name": "B"}]).then(data => expect(data).toContain('teste'));
});
