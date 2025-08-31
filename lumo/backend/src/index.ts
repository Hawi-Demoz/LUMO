import express, { Request, Response } from "express";

// Create Express app
const app = express();

app.use(express.json()); // Parse JSON bodies

// Routes
app.get("/", (_req: Request, res: Response) => {
  res.send("hello world");
});

const PORT = process.env['PORT'] || 3001;

app.get("api/chat" , (req:Request, res: Response)=>{
    res.send("Hi, how may I help you today");
})
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});

