import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendBookingConfirmation = async (
  to: string,
  bookingDetails: any
) => {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to,
    subject: 'ยืนยันการจองคลาสทำอาหาร',
    html: `
      <h1>ขอบคุณสำหรับการจอง!</h1>
      <p>รายละเอียด: ${bookingDetails.className}</p>
      <p>วันที่: ${bookingDetails.date}</p>
    `,
  });
};