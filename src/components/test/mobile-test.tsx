"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { MobileContainer, ResponsiveGrid, MobileStack } from "@/components/layout";

export function MobileTest() {
  return (
    <MobileContainer maxWidth="lg" className="py-8">
      <MobileStack spacing="lg">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Mobile Component Test</h2>
          <Badge variant="secondary">44px Touch Target Test</Badge>
        </div>

        {/* Button Touch Target Test */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Touch Target Validation</CardTitle>
          </CardHeader>
          <CardContent>
            <MobileStack spacing="md" direction="column">
              <Button className="min-h-touch w-full">Primary Button (44px)</Button>
              <Button variant="secondary" className="min-h-touch w-full">Secondary Button (44px)</Button>
              <Button variant="outline" className="min-h-touch w-full">Outline Button (44px)</Button>
            </MobileStack>
          </CardContent>
        </Card>

        {/* Input Touch Target Test */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Input Responsiveness</CardTitle>
          </CardHeader>
          <CardContent>
            <MobileStack spacing="md" direction="column">
              <Input 
                placeholder="Email address" 
                className="min-h-touch"
                type="email"
              />
              <Input 
                placeholder="Password" 
                className="min-h-touch"
                type="password"
              />
            </MobileStack>
          </CardContent>
        </Card>

        {/* Responsive Grid Test */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Responsive Grid System</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveGrid cols={{ xs: 1, sm: 2, md: 3 }} gap="md">
              <div className="bg-secondary p-4 rounded text-center text-sm">
                Grid Item 1
              </div>
              <div className="bg-secondary p-4 rounded text-center text-sm">
                Grid Item 2
              </div>
              <div className="bg-secondary p-4 rounded text-center text-sm">
                Grid Item 3
              </div>
            </ResponsiveGrid>
          </CardContent>
        </Card>
      </MobileStack>
    </MobileContainer>
  );
}