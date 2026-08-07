import app from "./app";
import { prisma } from "./lib/prisma";

const port = 5000;

const main = async () => {
  try {
    await prisma.$connect();
    console.log("database connected succesfully");
    app.listen(port, () => {
      console.log(`server is running on 5000 port`);
    });
  } catch (error) {
    console.log("error staring the sever ", error);
    await prisma.$disconnect();
    process.exit(1);
  }
};
main();
