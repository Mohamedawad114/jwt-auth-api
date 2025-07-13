import { sequelize_config } from "../db.connection.js";
import { DataTypes } from "sequelize";

const user=sequelize_config.define(
    "user",{
        email:{
            type:DataTypes.STRING,
            allowNull:false,
            validate:{
                isEmail:true,
            }
        },
        password:{
            type:DataTypes.STRING,
            allowNull:false,
            validate:{
                len:[6,255]
            }
        },
        user_name:{
            type:DataTypes.STRING,
            allowNull:false,
            validate:{
                len:[4,100]
            }
        },
        isAdmin:{
            type:DataTypes.BOOLEAN,
            defaultValue:false
        }
    },
    {
        timestamps:true,
        indexes:[{
            name:"email_valid",
            unique:true,
            fields:["email"]
        }]
          
    }
)
export default user