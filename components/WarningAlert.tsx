"use client"

import { useState, useEffect } from "react"
import { X, AlertCircle, AlertTriangle, Info, CheckCircle } from "lucide-react"
import { motion, AnimatePresence, type PanInfo } from "framer-motion"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type WarningType = "error" | "warning" | "info" | "success"

interface WarningAlertProps {
  type?: WarningType
  title: string
  message?: string
  show: boolean
  onDismiss: () => void
  autoClose?: boolean
  action?: {
    label: string
    onClick: () => void
  }
}

export function WarningAlert({
  type = "warning",
  title,
  message,
  show,
  onDismiss,
  autoClose = true,
  action,
}: WarningAlertProps) {
  const [isVisible, setIsVisible] = useState(show)

  // Styles based on type
  const styles = {
    error: {
      bg: "from-red-500/90 to-red-600/90",
      icon: <AlertCircle className="h-6 w-6 text-white" />,
      border: "border-red-400/30",
    },
    warning: {
      bg: "from-primary/90 to-blue-600/90",
      icon: <AlertTriangle className="h-6 w-6 text-white" />,
      border: "border-blue-400/30",
    },
    info: {
      bg: "from-primary/90 to-blue-600/90",
      icon: <Info className="h-6 w-6 text-white" />,
      border: "border-blue-400/30",
    },
    success: {
      bg: "from-green-500/90 to-green-600/90",
      icon: <CheckCircle className="h-6 w-6 text-white" />,
      border: "border-green-400/30",
    },
  }

  useEffect(() => {
    setIsVisible(show)

    // Auto close after 5 seconds if autoClose is true
    let timer: NodeJS.Timeout
    if (show && autoClose) {
      timer = setTimeout(() => {
        setIsVisible(false)
        onDismiss()
      }, 5000)
    }

    return () => {
      if (timer) clearTimeout(timer)
    }
  }, [show, autoClose, onDismiss])

  const handleDrag = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (Math.abs(info.offset.x) > 50 || info.offset.y < -30) {
      setIsVisible(false)
      onDismiss()
    }
  }

  if (!show) return null

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-x-0 top-0 z-50 flex justify-center items-start pt-4 px-4 pointer-events-none"
          initial={{ y: -100, opacity: 0, scale: 0.95 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: -100, opacity: 0, scale: 0.95 }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 25,
            mass: 0.5,
            duration: 0.5,
          }}
        >
          <motion.div
            className="w-full max-w-lg mx-4 mt-4 pointer-events-auto"
            drag
            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
            dragElastic={0.1}
            onDragEnd={handleDrag}
          >
            <div
              className={cn(
                "w-full rounded-xl shadow-lg backdrop-blur-md border",
                `bg-gradient-to-r ${styles[type].bg} ${styles[type].border}`,
              )}
            >
              <div className="p-4">
                <div className="flex flex-col">
                  <div className="flex items-center w-full justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className="p-1.5 bg-white/10 rounded-full">{styles[type].icon}</div>
                      <h3 className="text-lg font-semibold text-white">{title}</h3>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        setIsVisible(false)
                        onDismiss()
                      }}
                      className="h-8 w-8 rounded-full text-white/80 hover:text-white hover:bg-white/10"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  {message && <p className="text-white/90 ml-12 mb-3">{message}</p>}

                  {(action || !autoClose) && (
                    <div className="mt-1 w-full flex justify-end">
                      {action ? (
                        <div className="flex gap-3">
                          <Button
                            onClick={() => {
                              setIsVisible(false)
                              onDismiss()
                            }}
                            variant="ghost"
                            className="bg-transparent text-white hover:bg-white/10 hover:text-white"
                          >
                            Dismiss
                          </Button>
                          <Button
                            onClick={action.onClick}
                            className="bg-white text-primary hover:bg-white/90 transition-colors"
                          >
                            {action.label}
                          </Button>
                        </div>
                      ) : (
                        <Button
                          onClick={() => {
                            setIsVisible(false)
                            onDismiss()
                          }}
                          className="bg-white/10 text-white hover:bg-white/20 transition-colors"
                        >
                          Dismiss
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

