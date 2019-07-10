module.exports = {
  session: {
    // If this still says `undefined`, set a real secret!
    secret: '1a7b7b96b82f32ca',
    bodyParser: {
      json: {
        limit: '50mb',
        extended: true
      },
      urlencoded: {
        limit: '50mb',
        extended: true
      }
    }
  }
};