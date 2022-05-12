const { Sequelize, DataTypes, Op } = require("sequelize");

// connect ไปยังฐานข้อมูล
const sequelize = new Sequelize("cc_db", "root", "Wutwut01", {
  host: "localhost", //production ใส่ ip address ของ host
  port: 3306, //default
  dialect: "mysql",
});

// ทดสอบการเชื่อมต่อ
// sequelize
//   .authenticate()
//   .then(() => console.log("DB connected"))
//   .catch((err) => console.log(err));

// define Model mapping to table users
const User = sequelize.define(
  "User", //default map to users convert User to users
  {
    // column: id สร้างให้อัตโนมัติ หาก column ของเราชื่อว่า id
    // id: {
    //   type: DataTypes.INTEGER,
    //   primaryKey: true,
    //   autoIncrement: true,
    //   field: 'abc'
    // },
    username: {
      type: DataTypes.STRING, //default 255
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    birthDate: {
      type: DataTypes.DATEONLY,
      field: "birth_date",
    },
  },
  {
    tableName: "users",
    timestamps: false,
    underscored: true,
  }
);

// User.findAll().then((result) => {
//     console.log(JSON.stringify(result));
// });

// User.create({ username: "mike8", password: "5678", birthDate: new Date('1990-05-21') });

// define Model Todo,
//property: id primary key auto increment,
//title vachar not null,
//completed: boolean not null default false,
//dueDate: date

const Todo = sequelize.define(
  "Todo",
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    completed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    // dueDate: {
    //   type: DataTypes.DATEONLY,
    // }
    dueDate: DataTypes.DATEONLY,
  },
  {
    underscored: true,
  }
);

const UserProfile = sequelize.define("UserProfile", {
  email: DataTypes.STRING,
  phoneNumber: DataTypes.STRING,
});

const Employee = sequelize.define("Employee", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

const Order = sequelize.define("Order", {
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

// One - Many
User.hasMany(Todo, {
  foreignKey: { allowNull: false, name: "userId" },
  onDelete: "RESTRICT",
  onUpdate: "RESTRICT",
});

Todo.belongsTo(User, {
  foreignKey: { allowNull: false, name: "userId" },
  onDelete: "RESTRICT",
  onUpdate: "RESTRICT",
});

// One - One

User.hasOne(UserProfile, {
  foreignKey: { allowNull: false, name: "userId" },
  onDelete: "RESTRICT",
  onUpdate: "RESTRICT",
});

UserProfile.belongsTo(User, {
  foreignKey: { allowNull: false, name: "userId" },
  onDelete: "RESTRICT",
  onUpdate: "RESTRICT",
});

// Many - Many

User.belongsToMany(Employee, { through: Order });
Employee.belongsToMany(User, { through: Order });

// sequelize.sync({ force: true });

// Todo.create({title: "test", completed: true, dueDate: new Date()})

// สร้าง object user จาก User class

// create user instance. เป็นวิธีที่ไม่ถูก
// const user = new User()
// user.username = 'jack';
// user.password = '4567';
// user.birthDate = new Date('1990-12-11');

// user.save()

//Good create user instance
// const user = User.build({
//   username: "john",
//   password: "1234",
//   birthDate: "1980-02-28",
// });

// user.save()

const run = async () => {
  // const user = User.build({
  //   username: "max",
  //   password: "0987",
  //   birthDate: "1980-07-12",
  // });
  // await user.save();
  // user.password = "4321";
  // user.birthDate = "2000-04-13";
  // await user.save();
  // static method: create
  // const todo = await Todo.create({
  //   title: "learning",
  //   completed: true,
  //   dueDate: "2022-05-13",
  // });
  // console.log(todo);
  //logging instance
  // const todo = await Todo.create({
  //   title: "Exercise",
  // });
  // const todo = await Todo.create({
  //   title: "Fitness",
  //   dueDate: '2022-05-02'
  // });
  // console.log(todo.id)
  // console.log(todo.title)
  // console.log(todo.createAt)
  // console.log(todo.dataValues) // dont do this
  // const todo = await Todo.bulkCreate([
  //   {title: 'Football time', completed: true},
  //   {title: 'Dentist', dueDate: '2022-05-01'},
  //   {title: 'Shopping'}
  // ])
  // static update
  // const todo = await Todo.update({title: 'Meeting', dueDate: '2023-01-01'}, {where: {id: 4}})
  //static delete
  // const todo = await Todo.destroy({where: {title: 'Learning', completed: true}})
  //static SELECT method
  // const todo = await Todo.findAll({
  //   where: { id: 3 },
  //   attributes: ["id", "title", "completed"],
  // });
  //find all: select all except
  // const todo = await Todo.findAll({
  //   where: { id: 3 },
  //   attributes: {
  //     exclude: ['updatedAt', 'createdAt']
  //   },
  // });
  // complex where condition
  // const todo = await Todo.findAll({
  //   where: {
  //     id: {
  //       [Op.gt]: 3
  //     }
  //   }
  // })
  // const todo = await Todo.findAll({
  //     where: {
  //       title: {
  //         [Op.like]: '%o%'
  //       },
  //       id: {
  //         [Op.gt]: 4
  //       }
  //     }
  //   })
  //  WHERE id > 3 OR title Like '%a%' OR completed = true
  // const todo = await Todo.findAll({
  //   where: {
  //     [Op.or]: [
  //       {
  //         id: {
  //           [Op.gt]: 4,
  //         },
  //       },
  //       {
  //         title: {
  //           [Op.like]: "%a%",
  //         },
  //       },
  //       {
  //         completed: true,
  //       },
  //     ],
  //   },
  // });
  // Order by
  // const todo = await Todo.findAll({
  //   order: ['title']
  // })
  //Order by desc
  // const todo = await Todo.findAll({
  //   order: [["title", "DESC"]],
  // });
  //Group by
  // const todo = await Todo.findAll({
  //   group: ['completed'],
  //   attributes: ['completed', sequelize.fn('COUNT', 'completed')]
  // })
  //   const todo = await Todo.findAll({
  //     group: ["completed"],
  //     attributes: [
  //       ["completed", "cp"],
  //       [sequelize.fn("COUNT", "completed"), "total"],
  //     ],
  //     order: [[sequelize.fn("COUNT", "completed"), 'DESC']],
  //     having: {
  //       'total': 2
  //     }
  //   });

  // User.create({ username: "mike2", password: "5678", birthDate: new Date('1990-05-21') });

  //   console.log(JSON.stringify(todo, null, 2));

  // const user = await User.create({username: 'john', password: '1234'})

  // const todos = await Todo.bulkCreate([
  //   {title: 'Meeting', userId: user.id},
  //   {title: 'Dentist', userId: user.id},
  //   {title: 'Movie', userId: user.id}
  // ])

  // const user = await User.findOne({where: {id: 1}})

  //include todo
  // const user = await User.findOne({
  //   where: {id: 1},
  //   include: Todo
  // })

  // const user = await User.findOne({
  //   where: { id: 1 },
  //   attributes: ["id", "username"],
  //   include: {
  //     model: Todo,
  //     attributes: ["id", "title", "completed"],
  //   },
  // });
  // console.log(JSON.stringify(user, null, 2));

  const todo = await Todo.findAll({
    include: User
  })

  console.log(JSON.stringify(todo, null, 2))



};

run();
