"use client"

import { Fragment } from "react"
import { Dialog, Transition } from "@headlessui/react"
import { X, Copy, CheckCircle2 } from "lucide-react"
import { useState } from "react"
import { useNotifications as useNotification } from "@/contexts/NotificationContext"

interface AccountDetailsDialogProps {
  isOpen: boolean
  onClose: () => void
}

export default function AccountDetailsDialog({ isOpen, onClose }: AccountDetailsDialogProps) {
  const { addNotification } = useNotification()
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard
      .writeText("0x7a4e02033d4CbA73B0C845f5b2A71Fe5c4C7E1B3")
      .then(() => {
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
        addNotification({
          type: "success",
          title: "Address copied",
          message: "Wallet address copied to clipboard",
        })
      })
      .catch(() => {
        addNotification({
          type: "urgent",
          title: "Copy failed",
          message: "Failed to copy address to clipboard",
        })
      })
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/80" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-gradient-to-b from-[#1A1A1A] to-[#262626] p-6 shadow-xl transition-all">
                <div className="flex justify-between items-center mb-4">
                  <Dialog.Title as="h3" className="text-xl font-semibold text-white">
                    Account Details
                  </Dialog.Title>
                  <button type="button" className="rounded-full bg-[#2D2D2D] p-2" onClick={onClose}>
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="bg-[#2D2D2D] rounded-xl p-4">
                    <p className="text-gray-400 text-sm mb-1">Account Name</p>
                    <p className="font-medium text-white">Main Wallet</p>
                  </div>

                  <div className="bg-[#2D2D2D] rounded-xl p-4">
                    <p className="text-gray-400 text-sm mb-1">Wallet Address</p>
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-white truncate pr-2">0x7a4e02033d4CbA73B0C845f5b2A71Fe5c4C7E1B3</p>
                      <button
                        onClick={handleCopy}
                        className="h-8 w-8 rounded-full bg-[#3A3A3A] flex items-center justify-center flex-shrink-0"
                      >
                        {copied ? (
                          <CheckCircle2 className="h-4 w-4 text-green-500" />
                        ) : (
                          <Copy className="h-4 w-4 text-white" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="bg-[#2D2D2D] rounded-xl p-4">
                    <p className="text-gray-400 text-sm mb-1">Balance</p>
                    <p className="font-medium text-white">2.45 ETH</p>
                    <p className="text-gray-400 text-sm">≈ $6,125.00</p>
                  </div>

                  <div className="bg-[#2D2D2D] rounded-xl p-4">
                    <p className="text-gray-400 text-sm mb-1">Network</p>
                    <p className="font-medium text-white">Ethereum Mainnet</p>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

