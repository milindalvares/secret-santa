var nodemailer = require('nodemailer');
bodyParser = require('body-parser');
module.exports = function(app) {
  app.use(bodyParser.json());
  app.post('/mailer', function(req, res) {
  peopleJson = req.body;
  for (var person in peopleJson) {
    name =  peopleJson[person].name;
    email = peopleJson[person].email;
    sendMail(name,email);
  }
 }); // handle the route at yourdomain.com/sayHello
var sendMail = function(name,email) {
  var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'kudnekar.latesh10@gmail.com', // Your email id
      pass: '9730562294' // Your password
    }
  });
  var text = 'Hello world from \n\n '+ name;
  var mailOptions = {
   from: 'kudnekar.latesh10@gmail.com',
   to: email,
   subject: 'Email Example',
   text: text
   // html: '<b>Hello world ✔</b>'
  };
  transporter.sendMail(mailOptions, function(error, info){
    if(error) {
      console.log(error+' '+ info);
    } else {
      console.log('Message sent: ' + info.response);
    };

  });
    return ;
  }
};
