exports.emailTemplate = ({
  otp,
  subject,
  heading,
  message,
  additonalMessage,
}) => `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width">
        <title>${subject}</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            font-size: 16px;
            line-height: 1.4;
            color: #333;
            background-color: #f4f4f4;
            padding: 20px;
          }
          h1 {
            font-size: 24px;
            font-weight: bold;
            margin: 0 0 20px;
          }
          h2 {
            color:#6082B6;
          }
          p {
            margin: 0 0 20px;
          }
          a {
            color: #007bff;
            text-decoration: none;
          }
          a:hover {
            text-decoration: underline;
          }
        </style>
      </head>
      <body>
        <h1>${heading}</h1>
        <p>${message}</p>
        <p>${additonalMessage}</p>
        <a>${process.env.ROUTE}${otp}</a>
        <p>Note: This otp is only valid for 1 hour</p>
        <p>Thank you for your attention!</p>
        <p>If this message not belong to you ignore it<p/>
        <p>Your Beloved ${process.env.OWNER_NAME}</p>
      </body>
    </html>
  `;
