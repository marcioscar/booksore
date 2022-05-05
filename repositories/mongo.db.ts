import mongoose from "mongoose";

async function connect() {
  const uri =
    "mongodb+srv://marcio:Platao7777@cluster0.lg36a.mongodb.net/livroInfo?retryWrites=true&w=majority";
  return await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

export { connect };
