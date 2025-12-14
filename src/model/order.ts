import { DataTypes, Model, UUID } from "sequelize";
import { sequelize } from "../config/database";

export class Order extends Model {
  public id!: number;
  public orderId!: string;
  public tokenIn!: string;
  public tokenOut!: string;
  public amount!: number;
  public status!: string;
  public dex!: string | null;
  public txHash!: string | null;
  public executedPrice!: number | null;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Order.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue:DataTypes.UUIDV4
    },
    tokenIn: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tokenOut: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM(
        "pending",
        "routing",
        "building",
        "submitted",
        "confirmed",
        "failed"
      ),
      defaultValue: "pending",
    },
    dex: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    txHash: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    executedPrice: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "orders",
    timestamps: true,
  }
);