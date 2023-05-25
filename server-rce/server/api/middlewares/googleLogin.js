const { OAuth2Client } = require("google-auth-library");

export default async function verify(req, res, next) {
  try {
    const { client_id, jwtToken } = req.body;
    const client = new OAuth2Client(client_id);

    // Call the verifyIdToken to
    // varify and decode it
    const ticket = await client.verifyIdToken({
      idToken: jwtToken,
      audience: client_id,
    });

    // Get the JSON with all the user info
    const payload = ticket.getPayload();

    // This is a JSON object that contains
    // all the user info
    const user = {
      email: payload.email,
      name: payload.given_name + " " + payload.family_name,
      dp: payload.picture,
    };
    req.body = user;
    // console.log(user);
    next();
  } catch (error) {
    return res.status(error.status || 500).json({
      status: error.status || "500",
      message: error.message || "Something Went Wrong",
    });
  }
}
