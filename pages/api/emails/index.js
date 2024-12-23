import { Resend } from 'resend';

import {EmailTemplate} from "../../../components/EmailTemplate"

export default async function POST(req, res){
    const resend = new Resend('re_8sw1S9dx_WN1QrLXposuN7dUdk81NX9Z3');
    const { data, error } =  await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'enimofeodujirin@gmail.com',
      subject: 'hello world',
      react:  EmailTemplate({ firstName: 'John' }),
    });
    if (error) {
        throw error;
       //return res.status(400).json(error);
       
      }
    
      res.status(200).json(data);
}