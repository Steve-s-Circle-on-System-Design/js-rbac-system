import EmailLog from '../models/emailLog.js';

/**
 * Allowed transitions map.
 * Key = current status, Value = array of allowed next statuses.
 */
const ALLOWED_TRANSITIONS = {
  pending: ['sent', 'failed'],
  sent: ['delivered', 'bounced', 'failed'],
  delivered: ['opened', 'failed'],
  opened: ['clicked', 'failed'],
  clicked: [],     // terminal
  bounced: [],     // terminal
  failed: [],      // terminal
};

/**
 * Validates that a transition from currentStatus to newStatus is allowed.
 * @param {string} currentStatus
 * @param {string} newStatus
 * @throws {Error} if transition is invalid
 */
function validateTransition(currentStatus, newStatus) {
  const allowed = ALLOWED_TRANSITIONS[currentStatus];
  if (!allowed) {
    throw new Error(`Unknown current status: ${currentStatus}`);
  }
  if (!allowed.includes(newStatus)) {
    throw new Error(
      `Invalid transition from '${currentStatus}' to '${newStatus}'. Allowed: [${allowed.join(', ')}]`
    );
  }
}

/**
 * Generic transition helper.
 * Finds the log by ID, validates the transition, updates status + timestamp field.
 * @param {string} logId - MongoDB _id
 * @param {string} newStatus - target status
 * @param {string} timestampField - field name to set (e.g., 'sentAt')
 * @param {Object} [extraFields] - additional fields to set (e.g., { messageId })
 * @returns {Promise<Object>} updated EmailLog document
 */
async function applyTransition(logId, newStatus, timestampField, extraFields = {}) {
  const log = await EmailLog.findById(logId);
  if (!log) {
    throw new Error(`EmailLog not found with id: ${logId}`);
  }

  // Validate the state transition
  validateTransition(log.status, newStatus);

  // Update status and timestamp
  log.status = newStatus;
  log[timestampField] = new Date();

  // Apply any extra fields (e.g., messageId for sent, errorMessage for failed)
  Object.assign(log, extraFields);

  await log.save();
  return log;
}

// ─── Public API ──────────────────────────────────────────────

/**
 * Marks an email log as 'sent' and records the provider message ID.
 */
export async function markSent(logId, messageId) {
  return applyTransition(logId, 'sent', 'sentAt', { messageId });
}

/**
 * Marks an email log as 'delivered'.
 */
export async function markDelivered(logId) {
  return applyTransition(logId, 'delivered', 'deliveredAt');
}

/**
 * Marks an email log as 'opened'.
 */
export async function markOpened(logId) {
  return applyTransition(logId, 'opened', 'openedAt');
}

/**
 * Marks an email log as 'clicked'.
 */
export async function markClicked(logId) {
  return applyTransition(logId, 'clicked', 'clickedAt');
}

/**
 * Marks an email log as 'failed' with an error message.
 */
export async function markFailed(logId, errorMessage) {
  return applyTransition(logId, 'failed', 'failedAt', { errorMessage });
}

/**
 * Marks an email log as 'bounced' with an optional reason.
 */
export async function markBounced(logId, reason = null) {
  const extra = reason ? { errorMessage: reason } : {};
  return applyTransition(logId, 'bounced', 'bouncedAt', extra);
}