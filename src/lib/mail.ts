import {Resend} from 'resend';

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const domain = process.env.NEXT_PUBLIC_APP_URL;
  const resendDomain = process.env.RESEND_DOMAIN;
  const resetLink = `${domain}/auth/new-password?token=${token}`;

  try {
    const {error} = await resend.emails.send({
      from: resendDomain!,
      to: email,
      subject: 'Reset Your Password',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Password Reset Request</h2>
          <p>You have requested to reset your password. Click the button below to proceed:</p>
          <a href="${resetLink}" style="display: inline-block; padding: 10px 20px; background-color: #4CAF50; color: white; text-decoration: none; border-radius: 5px;">Reset Password</a>
          <p>If you did not request a password reset, please ignore this email.</p>
          <small>This link will expire in 1 hour.</small>
        </div>
      `,
    });

    if (error) {
      console.error('Failed to send password reset email', error);
      return {error: 'Failed to send password reset email'};
    }

    return {success: true};
  } catch (error) {
    console.error('Unexpected error sending password reset email', error);
    return {error: 'Unexpected error sending password reset email'};
  }
};
