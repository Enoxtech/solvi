"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { User, Mail, Phone, MapPin, Building, Calendar, Edit, Save, Camera } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function AdminProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    name: "Admin User",
    email: "admin@solvi.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    company: "SOLVI Inc.",
    role: "System Administrator",
    bio: "Experienced system administrator with over 10 years of experience in fintech and payment systems. Responsible for managing the SOLVI platform and ensuring optimal performance.",
    joinDate: "January 2020",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setProfileData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSave = () => {
    setIsEditing(false)
    // Here you would typically save the data to your backend
  }

  return (
    <div className="flex h-screen bg-primary-950">
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto p-6 bg-primary-900">
          <div className="max-w-5xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <h1 className="text-2xl font-bold text-white mb-6">Admin Profile</h1>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="col-span-1 bg-primary-800/50 border-white/10">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-white">Profile Picture</CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col items-center justify-center py-6">
                    <div className="relative group">
                      <Avatar className="h-32 w-32 border-2 border-white/20">
                        <AvatarImage src="/avatars/01.png" alt="Admin" />
                        <AvatarFallback className="bg-primary-700 text-white text-2xl">AD</AvatarFallback>
                      </Avatar>
                      <div className="absolute inset-0 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                        <Button variant="ghost" size="icon" className="text-white">
                          <Camera className="h-6 w-6" />
                        </Button>
                      </div>
                    </div>
                    <h3 className="mt-4 text-lg font-medium text-white">{profileData.name}</h3>
                    <p className="text-sm text-white/70">{profileData.role}</p>
                    <div className="mt-4 flex items-center text-sm text-white/50">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>Joined {profileData.joinDate}</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="col-span-1 lg:col-span-2 bg-primary-800/50 border-white/10">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <div>
                      <CardTitle className="text-white">Personal Information</CardTitle>
                      <CardDescription className="text-white/70">Manage your personal details</CardDescription>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
                      className="border-white/20 text-white hover:bg-white/10"
                    >
                      {isEditing ? (
                        <>
                          <Save className="h-4 w-4 mr-2" />
                          Save
                        </>
                      ) : (
                        <>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </>
                      )}
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <Tabs defaultValue="details" className="w-full">
                      <TabsList className="bg-primary-700/50 text-white">
                        <TabsTrigger
                          value="details"
                          className="data-[state=active]:bg-primary data-[state=active]:text-white"
                        >
                          Details
                        </TabsTrigger>
                        <TabsTrigger
                          value="security"
                          className="data-[state=active]:bg-primary data-[state=active]:text-white"
                        >
                          Security
                        </TabsTrigger>
                        <TabsTrigger
                          value="preferences"
                          className="data-[state=active]:bg-primary data-[state=active]:text-white"
                        >
                          Preferences
                        </TabsTrigger>
                      </TabsList>

                      <TabsContent value="details" className="mt-4 space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-white/70">Full Name</label>
                            <div className="relative">
                              <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/50" />
                              <Input
                                name="name"
                                value={profileData.name}
                                onChange={handleInputChange}
                                disabled={!isEditing}
                                className="pl-10 bg-primary-700/30 border-white/10 text-white"
                              />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <label className="text-sm font-medium text-white/70">Email</label>
                            <div className="relative">
                              <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/50" />
                              <Input
                                name="email"
                                value={profileData.email}
                                onChange={handleInputChange}
                                disabled={!isEditing}
                                className="pl-10 bg-primary-700/30 border-white/10 text-white"
                              />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <label className="text-sm font-medium text-white/70">Phone</label>
                            <div className="relative">
                              <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/50" />
                              <Input
                                name="phone"
                                value={profileData.phone}
                                onChange={handleInputChange}
                                disabled={!isEditing}
                                className="pl-10 bg-primary-700/30 border-white/10 text-white"
                              />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <label className="text-sm font-medium text-white/70">Location</label>
                            <div className="relative">
                              <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/50" />
                              <Input
                                name="location"
                                value={profileData.location}
                                onChange={handleInputChange}
                                disabled={!isEditing}
                                className="pl-10 bg-primary-700/30 border-white/10 text-white"
                              />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <label className="text-sm font-medium text-white/70">Company</label>
                            <div className="relative">
                              <Building className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/50" />
                              <Input
                                name="company"
                                value={profileData.company}
                                onChange={handleInputChange}
                                disabled={!isEditing}
                                className="pl-10 bg-primary-700/30 border-white/10 text-white"
                              />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <label className="text-sm font-medium text-white/70">Role</label>
                            <div className="relative">
                              <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/50" />
                              <Input
                                name="role"
                                value={profileData.role}
                                onChange={handleInputChange}
                                disabled={!isEditing}
                                className="pl-10 bg-primary-700/30 border-white/10 text-white"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="text-sm font-medium text-white/70">Bio</label>
                          <Textarea
                            name="bio"
                            value={profileData.bio}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            className="min-h-[100px] bg-primary-700/30 border-white/10 text-white"
                          />
                        </div>
                      </TabsContent>

                      <TabsContent value="security" className="mt-4">
                        <Card className="bg-primary-700/30 border-white/10">
                          <CardHeader>
                            <CardTitle className="text-white">Security Settings</CardTitle>
                            <CardDescription className="text-white/70">
                              Manage your account security settings
                            </CardDescription>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            <div className="space-y-2">
                              <label className="text-sm font-medium text-white/70">Change Password</label>
                              <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                                Update Password
                              </Button>
                            </div>
                            <div className="space-y-2">
                              <label className="text-sm font-medium text-white/70">Two-Factor Authentication</label>
                              <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                                Enable 2FA
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      </TabsContent>

                      <TabsContent value="preferences" className="mt-4">
                        <Card className="bg-primary-700/30 border-white/10">
                          <CardHeader>
                            <CardTitle className="text-white">User Preferences</CardTitle>
                            <CardDescription className="text-white/70">Customize your admin experience</CardDescription>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            <div className="space-y-2">
                              <label className="text-sm font-medium text-white/70">Email Notifications</label>
                              <div className="flex items-center space-x-2">
                                <input
                                  type="checkbox"
                                  id="emailNotifications"
                                  className="rounded border-white/20 bg-primary-700/30 text-primary"
                                  defaultChecked
                                />
                                <label htmlFor="emailNotifications" className="text-sm text-white">
                                  Receive email notifications
                                </label>
                              </div>
                            </div>
                            <div className="space-y-2">
                              <label className="text-sm font-medium text-white/70">Dashboard Theme</label>
                              <div className="flex items-center space-x-4">
                                <div className="flex items-center space-x-2">
                                  <input
                                    type="radio"
                                    id="darkTheme"
                                    name="theme"
                                    className="border-white/20 bg-primary-700/30 text-primary"
                                    defaultChecked
                                  />
                                  <label htmlFor="darkTheme" className="text-sm text-white">
                                    Dark
                                  </label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <input
                                    type="radio"
                                    id="lightTheme"
                                    name="theme"
                                    className="border-white/20 bg-primary-700/30 text-primary"
                                  />
                                  <label htmlFor="lightTheme" className="text-sm text-white">
                                    Light
                                  </label>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

