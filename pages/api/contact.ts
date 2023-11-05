import { mailOptions, transporter } from "@/config/nodemailer";
import type { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
    message?: string;
    success?: boolean;
}

 const handler =async (
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
  ) => {
    if(req.method === "POST"){
      const data = req.body;
      //server zod validation
      //console.log(data);
      try {
        await transporter.sendMail({
          ...mailOptions,
          subject: data.username,
          text: data.message + data.email,
          html: `<h5>Email: ${data.email}</h5><h5>Full Name: ${data.username}</h5><p>Message: ${data.message}</p>`
        })
        return res.status(200).json({success: true})
      } catch (error) {
        console.log(error);
      }
    }
    
  }


  export default handler