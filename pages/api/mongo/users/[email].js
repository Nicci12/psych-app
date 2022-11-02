export default async (req, res) => {
    const method = req.query.method;
    const email = req.query.email;
    switch (method) {
      case 'GET':
        res.setHeader('Allow', ['GET', 'PUT'])
        console.log(email)
        break
      case 'PUT':
        console.log(email)
        break
      default:
        console.log(email)
    }
    res.send({ user: "get user" });
    res.end()
  };
  