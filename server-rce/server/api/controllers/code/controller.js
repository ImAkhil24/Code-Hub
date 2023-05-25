import CodeService from './../../services/code.service'
import { v4 as uuidv4 } from "uuid";

export class Controller {
    async execute(req, res) {

        try {
            const { code, input } = req.body;
            console.log(code);
            const { lang } = req.query;

            if (code && lang) {
                const output = await CodeService.execute(code, input, lang, uuidv4());
              
                console.log(output)
                if (output) {
                    console.log("nhiii");
                    res.send({
                        status: "200",
                        message: "Code Successfully Executed",
                        output: output.stdout,
                        misc: output.stderr,
                    });
                } else {
                    throw {};
                }
            } else {
                throw { message: "Invalid input" };
            }
        } catch (error) {
            res.send({
                status: error.status || "500",
                message: error.message || "Something Went Wrong",
            });
        }

    }
}

export default new Controller();