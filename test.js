const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
//async function main() {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  //let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
//   let transporter = nodemailer.createTransport({
//     host: "smtp.ethereal.email",
//     port: 587,
//     secure: false, // true for 465, false for other ports
//     auth: {
//       user: testAccount.user, // generated ethereal user
//       pass: testAccount.pass, // generated ethereal password
//     },
//   });
let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    //requireTLS:true,
    auth: {
      user: 'thakursimrandeep@gmail.com', // generated ethereal user
      pass: 'sims@66064836', // generated ethereal password
    }
  });

  // send mail with defined transport object
  let mailOptions = {
    from: '"Simran Chauhan 👻" <thakursimrandeep@gmail.com>', // sender address
    to: "seemachauhan4836@gmail.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  }

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      res.end("error");
    } else {
      console.log("Message sent: ");
      res.end("sent"); // This part does NOT get executed.
    };
  });
 // console.log("Message sent: %s", info.response);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

//   // Preview only available when sending through an Ethereal account
//   console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
//   // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
//}
