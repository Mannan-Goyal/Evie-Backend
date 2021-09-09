const denied = (name, reason) => `
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Deny Event</title>
    <style>
        @import url("https://fonts.googleapis.com/css2?family=Inter&family=Raleway&family=Roboto&display=swap");
        * {
            padding: 0;
            margin: 0;
            font-family: "Raleway", sans-serif;
        }

        img {
            margin-top: 15px;
        }

        .bg {
            width: 100%;
            height: 100%;
            background: url('https://media.discordapp.net/attachments/816722946646081556/885487788802342942/Group_1.png');
            background-repeat: repeat;
            background-position: right top;
            padding-bottom: 100px;
            padding-top: 100px;
        }

        .box {
            margin: 0 auto !important;
            width: 50%;
            height: 50%;
            background-color: #383844;
            text-align: center;
            border-radius: 32px !important;
        }

        @media screen and (max-width: 830px) {
            .box {
                width: 90%;
                height: 50%;
            }
        }

        @media screen and (max-width: 830px) {
            .box {
                width: 90vw;
            }
        }

        .heading {
            color: #f0f8ff;
            padding: 15px 0 25px 0;
        }

        .text {
            margin-top: 15px;
            color: #f0f8ff;
        }

        .button {
            margin-top: 50px;
            text-decoration: none !important;
            display: inline-block;
            padding: 14px 29px !important;
            border-radius: 0.25em;
            background-color: #16151c;
            color: #fff !important;
            font-size: 1rem;
            letter-spacing: 0.15rem;
            transition: all 0.3s;
            position: relative;
            overflow: hidden;
            z-index: 1;
            margin-bottom: 20px;
            border-radius: 0.25em;
            white-space: nowrap;
        }

        .button:hover {
            background-color: #22242d;
        }

        .button:hover:before {
            width: 100%;
        }
    </style>
</head>

<body>
    <div class="bg">
        <div class="box">
            <img src="https://media.discordapp.net/attachments/812342454820667443/872174384301879326/vcal-denied.png?width=468&height=468"
                alt="email" width="100px" height="100px" style="color: #00c49a;">
            <h1 class="heading">:(</h1>
            <p class="text">Your request for ${name} has been denied </p>
            <p class="text">Reason: ${reason}</p>
            <p class="text">Contact us at askcsivit@gmail.com if you think we have made a mistake</p>
            <a href="${process.env.FRONTEND_BASEURL}" class="button">View Website</a>
        </div>
    </div>
</body>

</html>
    `;

module.exports = denied;
