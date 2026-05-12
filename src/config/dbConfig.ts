import mongoose from 'mongoose';

const DB = process.env.DATABASE!.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD!,
);

export async function connectToMongoDB() {
  try {
    await mongoose.connect(DB);
    console.log('Mongodb connection is successful.');
  } catch (error) {
    console.log('DB connection error', error);
    console.log('EXITING NOW');
    process.exit(1);
  }
}

export async function disconnectFromDB() {
  await mongoose.connection.close();
  console.log('Mongodb connection close.');
}
