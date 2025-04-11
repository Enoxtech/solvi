/**
 * Utility for providing haptic feedback on supported devices
 */
export const hapticFeedback = {
  /**
   * Light impact haptic feedback
   */
  light: () => {
    if ("vibrate" in navigator) {
      try {
        navigator.vibrate(10)
      } catch (e) {
        console.error("Haptic feedback failed:", e)
      }
    }
  },

  /**
   * Medium impact haptic feedback
   */
  medium: () => {
    if ("vibrate" in navigator) {
      try {
        navigator.vibrate(20)
      } catch (e) {
        console.error("Haptic feedback failed:", e)
      }
    }
  },

  /**
   * Heavy impact haptic feedback
   */
  heavy: () => {
    if ("vibrate" in navigator) {
      try {
        navigator.vibrate([30, 10, 30])
      } catch (e) {
        console.error("Haptic feedback failed:", e)
      }
    }
  },

  /**
   * Success haptic feedback pattern
   */
  success: () => {
    if ("vibrate" in navigator) {
      try {
        navigator.vibrate([10, 30, 10, 30])
      } catch (e) {
        console.error("Haptic feedback failed:", e)
      }
    }
  },

  /**
   * Error haptic feedback pattern
   */
  error: () => {
    if ("vibrate" in navigator) {
      try {
        navigator.vibrate([50, 20, 100])
      } catch (e) {
        console.error("Haptic feedback failed:", e)
      }
    }
  },

  /**
   * Warning haptic feedback pattern
   */
  warning: () => {
    if ("vibrate" in navigator) {
      try {
        navigator.vibrate([30, 20, 30])
      } catch (e) {
        console.error("Haptic feedback failed:", e)
      }
    }
  },
}

