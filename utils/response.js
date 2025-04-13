/**
 * Format error response
 * @param {string} errorMessage - Error message to send
 * @returns {object} - Formatted error response
 */
function formatError(errorMessage) {
    return {
      success: false,
      error: errorMessage,
    };
  }
  
  /**
   * Format success response
   * @param {string} message - Success message to send
   * @param {object} [data] - Optional data object
   * @returns {object} - Formatted success response
   */
  function formatSuccess(message, data = null) {
    const response = {
      success: true,
      message,
    };
    if (data) {
      response.data = data;
    }
    return response;
  }
  
  module.exports = { formatError, formatSuccess };