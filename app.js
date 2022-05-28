// const {User, Todo} = require('./models')
const { QueryTypes } = require("sequelize");
const { sequelize } = require("./models");

sequelize.sync({ force: true });

const run = async () => {
  // const user = await User.findAll();
  // console.log(JSON.stringify(user, null, 2))

  // const todo = await Todo.findAll({
  //     include: User
  // });
  // console.log(JSON.stringify(todo, null, 2))

  // raw query
  try {
    // const result = await sequelize.query(`
    // INSERT INTO users (id, username, password, birth_date)
    // VALUES (DEFAULT, 'jonathan', '1234', NULL)
    // `);
    // console.log(result[0]); //insert id
    // console.log("-------------------------------------------");
    // console.log(result[1]);

    //show result
    // const result = await sequelize.query("SELECT * FROM users");
    // console.log(result);
    // console.log("----------------------------------------");

    // const result2 = await sequelize.query("SELECT * FROM users", {
    //   type: QueryTypes.SELECT,
    // });
    // console.log(result2);

    // prepare statement
    // const stm = `INSERT INTO users (username, password, birth_date) VALUES (?, ?, ?), (?, ?, ?)`;
    // const result = await sequelize.query(stm, {
    //   type: QueryTypes.INSERT,
    //   replacements: [
    //     "jack4",
    //     "1234",
    //     "2000-12-19",
    //     "jack5",
    //     "1234",
    //     "2000-12-19",
    //   ],
    // });

    const stm = `INSERT INTO users (username, password, birth_date) VALUES (:username, :password, :birth_date)`;
    const result = await sequelize.query(stm, {
      type: QueryTypes.INSERT,
      replacements: {username: 'mike', password: '4321', birth_date: null},
    });
    console.log(result);
  } catch (err) {
    //mysql return metadata ไม่มีความหมาย
    console.log(err);
  }
};

run();
