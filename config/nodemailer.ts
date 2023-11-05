import nodemailer from 'nodemailer';

const email = process.env.CONTACT_USER;
const pass = process.env.CONTACT_PW

export const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: email,
        pass,
    }
})

export const mailOptions = {
    from: email,
    to: email,
}