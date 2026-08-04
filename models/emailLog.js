import mongoose from 'mongoose';

/**
 * EmailLog Schema – Transactional Ledger for Outbound Emails
 *
 * Tracks every email dispatch through its full lifecycle.
 * Statuses follow the state machine: pending → sent → delivered → opened → clicked
 * plus terminal states: failed, bounced.
 */
const emailLogSchema = new mongoose.Schema(
  {
    // Recipient email address
    recipient: {
      type: String,
      required: [true, 'Recipient email is required'],
      trim: true,
      lowercase: true,
    },

    // Email subject line (optional, for reference)
    subject: {
      type: String,
      default: '',
    },

    // Category of email – aligns with system features
    emailType: {
      type: String,
      enum: {
        values: ['verification', 'password_reset', 'magic_otp', 'security_alert', 'general'],
        message: '{VALUE} is not a supported email type',
      },
      default: 'general',
    },

    // Current lifecycle status
    status: {
      type: String,
      enum: {
        values: ['pending', 'sent', 'delivered', 'opened', 'clicked', 'bounced', 'failed'],
        message: '{VALUE} is not a valid status',
      },
      default: 'pending',
    },

    // Provider-specific message ID (e.g., from SendGrid, SES)
    messageId: {
      type: String,
      default: null,
    },

    // Error description if the email failed or bounced
    errorMessage: {
      type: String,
      default: null,
    },

    // Lifecycle timestamps (set when the corresponding status is reached)
    sentAt: { type: Date, default: null },
    deliveredAt: { type: Date, default: null },
    openedAt: { type: Date, default: null },
    clickedAt: { type: Date, default: null },
    failedAt: { type: Date, default: null },
    bouncedAt: { type: Date, default: null },
  },
  {
    timestamps: true, // adds createdAt and updatedAt automatically
  }
);

// Index for quick lookups (e.g., by status, recipient, or recent logs)
emailLogSchema.index({ status: 1 });
emailLogSchema.index({ recipient: 1 });
emailLogSchema.index({ createdAt: -1 });

const EmailLog = mongoose.model('EmailLog', emailLogSchema);

export default EmailLog;