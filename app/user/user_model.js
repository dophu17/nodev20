const sql = require('./../db')
const Pagination = require('../pagination')

const User = function(user) {
  this.username = user.username;
  this.password = user.password;
};

User.getAll = (username, pageNumber, perPage, result) => {
  let query = "SELECT * FROM users";
  let queryCount = "SELECT COUNT(id) as totalCount FROM users"

  if (username) {
    query += ` WHERE username LIKE '%${username}%'`;
    queryCount += ` WHERE username LIKE '%${username}%'`;
  }

  sql.query(queryCount, (errCount, resCount) => {
    if (errCount) {
      console.log("error: ", errCount);
      result(null, errCount);
      return;
    } else {
      var currentPage = pageNumber > 0 ? pageNumber : 1
      var pageUri = '/users/'
      var totalCount = resCount[0].totalCount
      var Paginate = new Pagination(totalCount, currentPage, pageUri, perPage)
      query += ` LIMIT ${Paginate.perPage} OFFSET ${Paginate.offset}`
      sql.query(query, (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }

        result(null, {
          users: res,
          pages: Paginate
        });
      });
    }
  });
};

User.findById = (id, result) => {
  sql.query(`SELECT * FROM users WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found User: ", res[0]);
      result(null, res[0]);
      return;
    }

    result({ kind: "not_found" }, null);
  });
};

User.findByUsername = (username, result) => {
  sql.query(`SELECT * FROM users WHERE username = '${username}'`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found User: ", res[0]);
      result(null, res[0]);
      return;
    }

    result({ kind: "not_found" }, null);
  });
};

User.create = (newUser, result) => {
  sql.query("INSERT INTO users SET ?", newUser, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created user: ", { id: res.insertId, ...newUser });
    result(null, { id: res.insertId, ...newUser });
  });
};

User.updateById = (id, user, result) => {
  sql.query(
    "UPDATE users SET username = ?, password = ? WHERE id = ?",
    [user.username, user.password, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }

      result(null, { id: id, ...user });
    }
  );
};

User.updateTokenByUsername = (username, token, result) => {
  sql.query(
    "UPDATE users SET token = ? WHERE username = ?",
    [token, username],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }

      result(null, { username: username });
    }
  );
};

User.deleteById = (id, result) => {
  sql.query("DELETE FROM users WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found User with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted User with id: ", id);
    result(null, res);
  });
};

module.exports = User;