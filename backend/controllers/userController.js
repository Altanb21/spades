const User = require('../Models/User');

module.exports.signup = async(req, res)=>{
    const {name, email, password } = req.body;
    const {balance} = 10000

    let user = null;
    console.log({ name, email, balance , password })
    try {
        user = new User({ name, email, balance , password });
        await user.save();
        res.status(201).json(user);
        } catch (err) {console.log(err); return res.status(500)}
    }

module.exports.login = async(req, res)=> {
        const{email, password} = req.body;
        try{
            const user = await User.findOne(
                { email },
                'email password'
              );
              if (!user) {
                return res
                  .status(404)
                  .send({ error: 'Could not find a user with that username.' });
              }

              if (user){
                if(user.password == password){
                    return res
                    .status(200)
                    .send({         
                        _id: user._id,
                        email: user.email,
                        name: user.name,})
                }
              }
        } catch(err){return res.status(500).send({error: err})}
    }

module.exports.makeBet = async(req, res)=>{
    const{email, amount} = req.body;
    console.log(req.body)
    try{
        const user = await User.findOne(
            { email },
            'email balance'
          );

          const admin = await User.findOne(
            { email: "admin@spades.com" },
            'email balance'
          )
          if (!user) {
            return res
              .status(404)
              .send({ error: 'Could not find a user with that username.' });
          }

          if (user){
            if(amount>user.balance){
                return res.status(303).send("Bet amount higher than your balance")
            } else {
            user.balance = user.balance - amount;
            await user.save();
            admin.balance = admin.balance + amount;
            await admin.save();
            return res.status(200).send("Bet Successfull")
            }
            }
          } catch(err){return res.status(500).send({error: err})}
}

module.exports.givewin = async(req, res)=>{
    const{email, amount} = req.body;
    console.log(req.body)
    try{
        const user = await User.findOne(
            { email },
            'email balance'
          );

          const admin = await User.findOne(
            { email: "admin@spades.com" },
            'email balance'
          )
          if (!user) {
            return res
              .status(404)
              .send({ error: 'Could not find a user with that username.' });
          }

          if (user){
            if(amount>admin.balance){
                return res.status(303).send("Wining Amount is higher than the pool balance")
            } else {
            user.balance = user.balance + amount;
            await user.save();
            admin.balance = admin.balance - amount;
            await admin.save();
            return res.status(200).send("Winning Amount Deposited Successful")
            }
            }
          } catch(err){return res.status(500).send({error: err})}
}