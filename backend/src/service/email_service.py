import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os
from dotenv import load_dotenv

load_dotenv()

# Config
SENDER_EMAIL = os.getenv("SENDER_EMAIL")
SENDER_PASSWORD = os.getenv("SENDER_PASSWORD")
SMTP_SERVER = "smtp.gmail.com"
SMTP_PORT = 587


class EmailService:

    @staticmethod
    def send_email(recipient: str, subject: str, body: str) -> None:
        """
        Send an email using Gmail SMTP

        Args:
            recipient: Email address to send to
            subject: Email subject
            body: Email body (plaintext)

        Returns:
            None
        """

        try:
            # Create message
            message = MIMEMultipart()
            message["From"] = SENDER_EMAIL
            message["To"] = recipient
            message["Subject"] = subject
            message.attach(MIMEText(body, "plain"))

            # Send email
            with smtplib.SMTP(SMTP_SERVER, SMTP_PORT) as server:
                server.starttls()
                server.login(SENDER_EMAIL, SENDER_PASSWORD)
                server.send_message(message)
        except Exception as e:
            print(f"Error sending email: {e}")
