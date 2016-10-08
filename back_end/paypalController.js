var braintree = require("braintree");

var gateway = braintree.connect({
    environment: braintree.Environment.Sandbox,
    merchantId: "cv3r8vygh93x8mj2",
    publicKey: "kpxzwrg4c52ybqf2",
    privateKey: "4d5134b5c0c21be2350adbde502fba6a"
});

module.exports = {
    generateToken : generateToken,
    checkoutTransaction : checkOutTransaction
};

function generateToken(res){
    gateway.clientToken.generate({
        // this needs to be a valid customer id
        // customerId: "aCustomerId"
    }, function (err, response) {
        // error handling for connection issues
        if (err) {
            throw new Error(err);
        }
        if (response.success) {
            clientToken = response.clientToken;
            res.status(200);
            res.json({"clientToken" : clientToken});
            console.log("clientToken",clientToken);
        } else {
            // handle any issues in response from the Braintree gateway
            res.writeHead(500, {'Content-Type': 'text/html'});
            res.end('Something went wrong.');
        }
    });
}

function checkOutTransaction(req,res){
    var nonceFromTheClient = req.body.nonce;
    var price = req.body.price;
    //price set up to 10.00
    console.log("price get",price);
    gateway.transaction.sale({
        amount: price,
        paymentMethodNonce: nonceFromTheClient,
        options: {
            submitForSettlement: true
        }
    }, function (err, result) {
    });
    res.status(200);
    res.json({"status":"OK"})
}
