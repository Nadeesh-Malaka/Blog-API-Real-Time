//Formats user data to send back to the client

class UserDTO {
    constructor(user) {
      this.id = user.id;
      this.username = user.username;
      this.email = user.email;
      this.createdAt = user.createdAt;
      this.updatedAt = user.updatedAt;
    }
  }
  
  module.exports = UserDTO;