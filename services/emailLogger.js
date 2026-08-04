import EmailLog from '../models/emailLog.js';

/**
 * Creates a new email log entry with status 'pending'.
 * This should be called when an email is queued (before sending).
 *
 * @param {Object} params
 * @param {string} params.recipient - Email address of the receiver.
 * @param {string} [params.subject=''] - Subject line.
 * @param {string} [params.emailType='general'] - Type of email (verification, password_reset, etc.)
 * @returns {Promise<Object>} The created EmailLog document.
 */
export async function createEmailLog({ recipient, subject = '', emailType = 'general' }) {
  if (!recipient) {
    throw new Error('Recipient is required to create an email log');
  }

  const log = await EmailLog.create({
    recipient,
    subject,
    emailType,
    status: 'pending',
  });

  return log;
}