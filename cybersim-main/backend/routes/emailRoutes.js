import express from 'express';
import { protect } from '../middleware/auth.js';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

// Store emails in memory (in production, use database)
const emailTickets = new Map();
let ticketCounter = 1000;

// Generate ticket number
function generateTicketNumber() {
  ticketCounter++;
  return `CSE-${new Date().getFullYear()}-${ticketCounter}`;
}

// Configure email transporter (using Gmail or your email service)
// For development, we'll use ethereal email or mock
let transporter;

if (process.env.EMAIL_USER && process.env.EMAIL_PASSWORD) {
  transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    }
  });
} else {
  // Use ethereal email for testing (commented out for now)
  // This is a mock transporter for development
  transporter = {
    sendMail: async (options) => {
      console.log('📧 Email would be sent:', {
        to: options.to,
        subject: options.subject,
        from: options.from
      });
      return { messageId: `<${Date.now()}@dev.local>` };
    }
  };
}

// Send support email
router.post('/send', protect, async (req, res) => {
  try {
    const {
      name,
      email,
      subject,
      category,
      message,
      priority,
      attachmentInfo,
      timestamp,
      userAgent
    } = req.body;

    const userId = req.userId;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields'
      });
    }

    // Validate email format
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email address'
      });
    }

    // Generate ticket number
    const ticketNumber = generateTicketNumber();

    // Create email content for support team
    const supportEmailContent = `
    <div style="font-family: Arial, sans-serif; background: #f5f5f5; padding: 20px;">
      <div style="max-width: 600px; background: white; padding: 20px; border-radius: 8px;">
        <h2 style="color: #0f3460; border-bottom: 2px solid #00d4ff; padding-bottom: 10px;">
          New Support Ticket: ${ticketNumber}
        </h2>

        <div style="margin: 20px 0;">
          <h3 style="color: #333; margin-bottom: 10px;">Ticket Details</h3>
          <p><strong>Ticket Number:</strong> ${ticketNumber}</p>
          <p><strong>Priority:</strong> ${priority.toUpperCase()}</p>
          <p><strong>Category:</strong> ${category}</p>
          <p><strong>Received:</strong> ${new Date(timestamp).toLocaleString()}</p>
        </div>

        <div style="margin: 20px 0;">
          <h3 style="color: #333; margin-bottom: 10px;">Customer Information</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>User ID:</strong> ${userId}</p>
        </div>

        <div style="margin: 20px 0;">
          <h3 style="color: #333; margin-bottom: 10px;">Subject</h3>
          <p style="background: #f9f9f9; padding: 10px; border-left: 3px solid #00d4ff;">
            ${subject}
          </p>
        </div>

        <div style="margin: 20px 0;">
          <h3 style="color: #333; margin-bottom: 10px;">Message</h3>
          <p style="background: #f9f9f9; padding: 10px; border-left: 3px solid #00d4ff; white-space: pre-wrap;">
            ${message}
          </p>
        </div>

        ${attachmentInfo ? `
          <div style="margin: 20px 0;">
            <h3 style="color: #333; margin-bottom: 10px;">Additional Information</h3>
            <p style="background: #f9f9f9; padding: 10px; border-left: 3px solid #00d4ff; white-space: pre-wrap;">
              ${attachmentInfo}
            </p>
          </div>
        ` : ''}

        <div style="margin: 20px 0; padding: 10px; background: #f0f0f0; border-radius: 4px; font-size: 12px; color: #666;">
          <p><strong>User Agent:</strong> ${userAgent}</p>
        </div>

        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
          <p style="color: #666; font-size: 12px;">
            This email was sent through the CyberSim Elite support system.
          </p>
        </div>
      </div>
    </div>
    `;

    // Create email content for customer
    const customerEmailContent = `
    <div style="font-family: Arial, sans-serif; background: #f5f5f5; padding: 20px;">
      <div style="max-width: 600px; background: white; padding: 20px; border-radius: 8px;">
        <h2 style="color: #0f3460;">Support Ticket Received</h2>
        
        <p>Hello ${name},</p>

        <p>Thank you for contacting CyberSim Elite Support! We've received your email and created a support ticket for you.</p>

        <div style="background: #00d4ff; color: white; padding: 15px; border-radius: 6px; margin: 20px 0; text-align: center;">
          <h3 style="margin: 0 0 5px;">Your Ticket Number</h3>
          <p style="margin: 0; font-size: 24px; font-weight: bold;">${ticketNumber}</p>
        </div>

        <p>Please save this ticket number for your reference. You can use it to track your support request.</p>

        <div style="margin: 20px 0; padding: 15px; background: #f9f9f9; border-left: 3px solid #00d4ff;">
          <h4 style="margin: 0 0 10px; color: #333;">Expected Response Time</h4>
          <p style="margin: 0; color: #666;">
            ${
              priority === 'urgent' ? '⚠️ 2-4 hours (Urgent Priority)' :
              priority === 'high' ? '🟠 4-8 hours (High Priority)' :
              priority === 'normal' ? '🔵 24 hours (Standard Support)' :
              '🟢 2-3 days (Low Priority)'
            }
          </p>
        </div>

        <h4 style="color: #333; margin-top: 20px;">Your Request Details</h4>
        <ul style="color: #666;">
          <li><strong>Category:</strong> ${category}</li>
          <li><strong>Subject:</strong> ${subject}</li>
          <li><strong>Priority:</strong> ${priority}</li>
        </ul>

        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
          <h4 style="color: #333;">Next Steps</h4>
          <ol style="color: #666;">
            <li>Our support team will review your request</li>
            <li>You'll receive an email response with a solution or next steps</li>
            <li>If we need more information, we'll contact you directly</li>
          </ol>
        </div>

        <div style="margin-top: 20px; padding: 15px; background: #f0f0f0; border-radius: 6px;">
          <p style="margin: 0; font-size: 12px; color: #666;">
            <strong>Note:</strong> Please don't reply to this email. For follow-ups, mention your ticket number in a new support request.
          </p>
        </div>

        <div style="margin-top: 30px; text-align: center; color: #999; font-size: 12px;">
          <p>CyberSim Elite Support Team</p>
          <p>support@cybersim.com</p>
        </div>
      </div>
    </div>
    `;

    // Store ticket
    emailTickets.set(ticketNumber, {
      ticketNumber,
      userId,
      name,
      email,
      subject,
      category,
      message,
      priority,
      attachmentInfo,
      status: 'open',
      createdAt: new Date(timestamp),
      responses: []
    });

    // Send email to support team
    try {
      await transporter.sendMail({
        from: process.env.EMAIL_USER || 'noreply@cybersim.com',
        to: process.env.SUPPORT_EMAIL || 'support@cybersim.com',
        subject: `[${priority.toUpperCase()}] ${ticketNumber} - ${subject}`,
        html: supportEmailContent,
        replyTo: email
      });
    } catch (emailError) {
      console.error('Error sending email to support team:', emailError);
    }

    // Send confirmation email to customer
    try {
      await transporter.sendMail({
        from: process.env.EMAIL_USER || 'noreply@cybersim.com',
        to: email,
        subject: `Support Ticket Created: ${ticketNumber}`,
        html: customerEmailContent
      });
    } catch (emailError) {
      console.error('Error sending confirmation email:', emailError);
    }

    res.json({
      success: true,
      message: 'Email sent successfully',
      ticketNumber,
      estimatedResponseTime: priority === 'urgent' ? '2-4 hours' : 
                             priority === 'high' ? '4-8 hours' :
                             priority === 'normal' ? '24 hours' :
                             '2-3 days'
    });

  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send email. Please try again later.'
    });
  }
});

// Get ticket details
router.get('/ticket/:ticketNumber', protect, (req, res) => {
  const { ticketNumber } = req.params;
  
  if (emailTickets.has(ticketNumber)) {
    const ticket = emailTickets.get(ticketNumber);
    
    // Verify user owns this ticket
    if (ticket.userId !== req.userId) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    res.json({
      success: true,
      ticket
    });
  } else {
    res.status(404).json({
      success: false,
      message: 'Ticket not found'
    });
  }
});

// Get user's tickets
router.get('/tickets', protect, (req, res) => {
  const userId = req.userId;
  const userTickets = [];

  emailTickets.forEach((ticket, ticketNumber) => {
    if (ticket.userId === userId) {
      userTickets.push(ticket);
    }
  });

  res.json({
    success: true,
    tickets: userTickets.sort((a, b) => b.createdAt - a.createdAt)
  });
});

// Add response to ticket (for support team)
router.post('/ticket/:ticketNumber/response', protect, async (req, res) => {
  try {
    const { ticketNumber } = req.params;
    const { response, status } = req.body;

    if (!emailTickets.has(ticketNumber)) {
      return res.status(404).json({
        success: false,
        message: 'Ticket not found'
      });
    }

    const ticket = emailTickets.get(ticketNumber);

    ticket.responses.push({
      id: Date.now(),
      response,
      respondedAt: new Date(),
      respondedBy: 'Support Team'
    });

    if (status) {
      ticket.status = status;
    }

    // Send response email to customer
    const responseEmailContent = `
    <div style="font-family: Arial, sans-serif; background: #f5f5f5; padding: 20px;">
      <div style="max-width: 600px; background: white; padding: 20px; border-radius: 8px;">
        <h2 style="color: #0f3460;">Response to Your Support Ticket</h2>
        
        <p>Hello ${ticket.name},</p>

        <p>Our support team has responded to your ticket <strong>${ticketNumber}</strong>:</p>

        <div style="margin: 20px 0; padding: 15px; background: #f9f9f9; border-left: 3px solid #00d4ff;">
          <p style="margin: 0; white-space: pre-wrap; color: #333;">${response}</p>
        </div>

        <p style="color: #666; margin-top: 20px;">
          If you have follow-up questions, please reply to this email or create a new support request mentioning this ticket number.
        </p>

        <div style="margin-top: 30px; text-align: center; color: #999; font-size: 12px;">
          <p>CyberSim Elite Support Team</p>
        </div>
      </div>
    </div>
    `;

    try {
      await transporter.sendMail({
        from: process.env.EMAIL_USER || 'noreply@cybersim.com',
        to: ticket.email,
        subject: `Re: ${ticketNumber} - ${ticket.subject}`,
        html: responseEmailContent
      });
    } catch (emailError) {
      console.error('Error sending response email:', emailError);
    }

    res.json({
      success: true,
      message: 'Response added and email sent'
    });

  } catch (error) {
    console.error('Error adding response:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to add response'
    });
  }
});

// Close ticket
router.post('/ticket/:ticketNumber/close', protect, (req, res) => {
  const { ticketNumber } = req.params;

  if (!emailTickets.has(ticketNumber)) {
    return res.status(404).json({
      success: false,
      message: 'Ticket not found'
    });
  }

  const ticket = emailTickets.get(ticketNumber);
  
  if (ticket.userId !== req.userId) {
    return res.status(403).json({
      success: false,
      message: 'Access denied'
    });
  }

  ticket.status = 'closed';
  ticket.closedAt = new Date();

  res.json({
    success: true,
    message: 'Ticket closed'
  });
});

export default router;
