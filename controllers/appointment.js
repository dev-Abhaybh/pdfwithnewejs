const puppeteer = require("puppeteer");
const path = require("path");
const fs = require("fs-extra");
const ejs = require("ejs");
require("dotenv").config();
module.exports.pdfGenerator = async (req, res) => {
  const user = req.body;
  console.log("jijfdlsfisd");
  console.log(user);
  const details = req.body;

  const compile = async (template, data) => {
    const filePath = path.join(process.cwd(), "views", `${template}.ejs`);
    const html = await fs.readFile(filePath, "utf-8");

    return ejs.compile(html)(data);
  };

  //craete pdf

  const createPdf = async () => {
    console.log("in generate pdf function now before try");

    const browseer = await puppeteer.launch({
      executablePath: process.env.PUPPETEER_EXECUTABLE_PATH,
    });
    try {
      console.log("in generate pdf function now");

      const page = await browseer.newPage();
      const content = await compile("rx", { data: details });
      await page.setContent(content);
      await page.emulateMediaFeatures("screen");
      console.log("before pdf");
      const pdf = await page.pdf({
        format: "A4",
        printBackground: true,
      });
      console.log(pdf);

      if (pdf) {
        let file = await fs.createReadStream(process.cwd() + "/tmp/abc.pdf");
        let stat = fs.statSync(process.cwd() + "/tmp/abc.pdf");

        return { file, stat, pdf };
      }
      console.log(pdf);
    } catch (error) {
      console.log(error);
    } finally {
      await browseer.close();
    }
  };
  const data1 = await createPdf();
  // const data = await fs.readFileSync(process.cwd() + "/tmp/abc.pdf");
  // res.contentType("application/pdf");
  // res.send(data);
  //console.log(data);
  const file = data1.pdf;
  console.log(file);
  res.setHeader("Content-Length", data1.stat.size);
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", "attachment; filename=quote.pdf");
  //console.log(file.pipe(res));
  //file.pipe(res);
  return res.send(file);
  // res.setHeader("Content-Type", "application/pdf").send(pdf);
  // res.send(pdf);
};
