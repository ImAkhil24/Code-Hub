import ValidationService from "./validation.service";
import fs from "fs";
import {writeFile} from "fs/promises"
import path from "path";
import util from "util";
import { exec } from "child_process";
const ROOT_DIR = `${process.cwd()}`;
const SOURCE_DIR = path.join(ROOT_DIR, "executor");
const TARGET_DIR = `/app/codes`;
const IMAGE_NAME = 'executor:1.0';

const VOL_NAME = SOURCE_DIR;

class CodeService {
  async execute(code, input, lang, id) {
    try {
      !input ? (input = "") :NULL;

      // validation of the desired programming language
      const { isValid, message } = await ValidationService.execute(
        code,
        input,
        lang,
        id
      );
      if (!isValid) throw { message };


      // making files 
      const { file, inputFile } = await this.writeFile(code, lang, input, id);

      // making command
      const { runCode, runContainer } = await this.writeCommand(
        lang,
        file,
        inputFile,
        id,
        code
      );

     //executing the file
     const { stdout, stderr } = await this.execChild(
        runCode,
        runContainer,
        id,
        file,
        inputFile,
        lang,
        code
      );

      if (stderr || stdout) {
        // console.log("output", stderr, stdout);
        return { stderr: stderr.toString(), stdout: stdout.toString() };
      }
    } catch (error) {
        throw error
    }
  }

  async writeFile(code, lang, input, id) {
    let fileName = `${id}code`;
    switch (lang) {
      case "javascript": {
        fileName += ".js";
        break;
      }
      case "cpp": {
        fileName += ".cpp";
        break;
      }
      case "python": {
        fileName += ".py";
        break;
      }
      case "java": {
        fileName += ".java";
        break;
      }
      case "c": {
        fileName += ".c";
        break;
      }
      default: {
        throw { message: "Invalid language" };
      }
    }

    try {
      await writeFile(path.join(SOURCE_DIR, fileName), code);
      await writeFile(path.join(SOURCE_DIR, `${id}input.txt`), input);
      return {
        file: fileName,
        inputFile: `${id}input.txt`,
      };
    } catch (error) {
      throw { message: error };
    }
  }

  async writeCommand(lang, file, input, id, code) {
    let command = "";
    switch (lang) {
      case "javascript": {
        command = `cd "${TARGET_DIR}" && /usr/bin/time -f 'TIME=%es   MEM=%ZKb' node ${file} < ${input}`;
        break;
      }
      case "cpp": {
        // object file name
        command = `cd "${TARGET_DIR}" && g++ -o ${id} ${file} && /usr/bin/time -f 'TIME=%es   MEM=%ZKb' ./${id} < ${input}`;
        break;
      }
      case "python": {
        command = `cd "${TARGET_DIR}" && /usr/bin/time -f 'TIME=%es   MEM=%ZKb' python ${file} < ${input}`;
        break;
      }
      case "c": {
        command = `cd "${TARGET_DIR}" && gcc -o ${id} ${file} && /usr/bin/time -f 'TIME=%es   MEM=%ZKb' ./${id} < ${input}`;
        break;
      }
      default: {
        throw { message: "Invalid language" };
      }
    }

    const containerName = `${id}container`;

    // execute with that specific shell sh interpretor
    const runCode = `docker exec ${containerName} sh -c "${command}"`;

    // limiting to 50 megabytes 30% cpu cycle and maximum 8 cores 
    // also mouting our volume
    const runContainer = `docker run -it -d -m 50M --cpus 0.3 -c 8 --name ${containerName} -v "${VOL_NAME}":${TARGET_DIR} ${IMAGE_NAME}`;

    return { runCode, runContainer };
  }
  
    async execChild(runCode, runContainer, id, file, inputFile, lang, code) {
        return new Promise((resolve, reject) => {
        // console.log(`${runContainer}`);

        // create new shell and add listners
        const execCont = exec(`${runContainer}`);
        console.log(runContainer);
        execCont.on("error", (err) => {
        throw { status: "404", message: err };
        });
        console.log(runCode);

        execCont.stdout.on("data", () => {
          exec(`${runCode}`, async (error, stdout, stderr) => {
            // cleaning up
            await this.endContainer(id);
            await this.deleteFiles(file, inputFile, lang, id, code);
            const response = {
            stderr,
            stdout,
            };
            resolve(response);
        });
        });

    });
    }
    async endContainer(id) {
        const containerName = `${id}container`;
        const exit = `docker stop ${containerName} && docker rm ${containerName}`;
        exec(`${exit}`, (error, stdout, stderr) => {
            if (error) {
            console.log(error);
            } else console.log("Container stoped and deleted");
        });
    }

    async deleteFiles(fileName, inputName, lang, id, code) {
      fs.unlink(path.join(SOURCE_DIR, fileName), (err) => {
        if (err) throw { message: err };
      });
      if (inputName) {
        fs.unlink(path.join(SOURCE_DIR, inputName), (err) => {
          if (err) throw { message: err };
        });
      }
      if (lang == "cpp" || lang == "c") {
        if (fs.existsSync(path.join(SOURCE_DIR, id)))
          fs.unlink(path.join(SOURCE_DIR, id), (err) => {
            if (err) throw err;
          });
      }
    }
  }
export default new CodeService();
