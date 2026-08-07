import express from "express";
const app = express();
export default app;
app.get("/", (req, res) => {
    res.send("hello world");
});
//# sourceMappingURL=app.js.map