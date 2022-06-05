import express from "express";
import mongoose from "mongoose";

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const CONNECTION_URL =
  "mongodb+srv://Innova:deepu@cluster0.lyskw.mongodb.net/Maa?retryWrites=true&w=majority";
const port = process.env.PORT || 3000;

const testSchema = mongoose.Schema({
  Emergency: String,
  Treatment: String,
  Keywords: [String]
});

const PostMessage = mongoose.model("Emergency", testSchema);

mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(port, () => console.log(`Listening on port ${port}`)))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/data", async (req, res) => {
  try {
    const posts = await PostMessage.find({});
    res.send(posts);
  }
  catch {
    res.send("there is some error");
  }

});

app.get("/data/:id", async (req, res) => {
  try {
    const posts = await PostMessage.findById(req.params.id);
    res.send(posts);
  }
  catch {
    res.send("there is some error");
  }

});

app.get("/ans", async (req, res) => {
  try {
    const inp = req.body.input
    const posts = await PostMessage.find({});
    const ans = posts.find(post => post.Keywords.includes(inp))
    // console.log(ans.Treatment)
    res.send(ans.Treatment);

  } catch (error) {
    res.send("there is some error");
  }
});

app.post("/insert", async (req, res) => {
  try {
      const data = req.body 
      // console.log(data)
      const s_data = new PostMessage(data)
      const response = await s_data.save()
      res.send(response)
  }
  catch(er) {
    console.log(er)
    res.send("there is some error");
  }
}
)
