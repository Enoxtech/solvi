// This is a mock email service that would be replaced with a real email service in production

export interface EmailOptions {
  to: string
  subject: string
  body: string
}

export const emailService = {
  sendEmail: async (options: EmailOptions): Promise<boolean> => {
    // In a real app, this would send an actual email
    console.log("Sending email:", options)

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Return success
    return true
  },

  sendTransactionStatusEmail: async (
    email: string,
    transactionId: string,
    status: string,
    amount: number,
    description: string,
  ): Promise<boolean> => {
    const subject = `Transaction ${status}: ${description}`

    const body = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
        <div style="text-align: center; margin-bottom: 20px;">
          <h1 style="color: #333;">Transaction Update</h1>
        </div>
        
        <div style="margin-bottom: 20px;">
          <p>Dear Valued Customer,</p>
          <p>Your transaction has been ${status.toLowerCase()}.</p>
        </div>
        
        <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin-bottom: 20px;">
          <h2 style="margin-top: 0; color: #333; font-size: 18px;">Transaction Details</h2>
          <p><strong>Transaction ID:</strong> ${transactionId}</p>
          <p><strong>Amount:</strong> ₦${amount.toLocaleString()}</p>
          <p><strong>Description:</strong> ${description}</p>
          <p><strong>Status:</strong> <span style="color: ${
            status === "Successful" ? "green" : status === "Pending" ? "orange" : "red"
          };">${status}</span></p>
        </div>
        
        <div style="margin-bottom: 20px;">
          <p>If you have any questions or concerns, please contact our support team.</p>
        </div>
        
        <div style="text-align: center; padding-top: 20px; border-top: 1px solid #e0e0e0; color: #777; font-size: 12px;">
          <p>This is an automated message, please do not reply directly to this email.</p>
          <p>&copy; ${new Date().getFullYear()} Velocia. All rights reserved.</p>
        </div>
      </div>
    `

    return emailService.sendEmail({
      to: email,
      subject,
      body,
    })
  },
}

