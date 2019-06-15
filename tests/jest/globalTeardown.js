
// when stop server

module.exports = async () => {
  await global.httpServer.close()
}