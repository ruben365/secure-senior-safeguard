import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus } from "lucide-react";

interface ClientServicesTabProps {
  clientId: number;
}

export function ClientServicesTab({ clientId }: ClientServicesTabProps) {
  const services = [
    {
      id: 1,
      icon: "🤖",
      name: "AI Receptionist",
      status: "active",
      plan: "Standard",
      price: 149,
      startDate: "Jan 15, 2025",
      nextBilling: "Feb 15, 2025",
      stats: {
        calls: 1234,
        appointments: 45,
        uptime: "99.8%",
      },
    },
    {
      id: 2,
      icon: "🌐",
      name: "Website Design",
      status: "active",
      website: "example.com",
      hosting: "Premium",
      ssl: "Valid until Feb 2026",
      lastUpdated: "2 days ago",
      stats: {
        visitors: "2,456",
        uptime: "100%",
        pageSpeed: "92/100",
      },
    },
    {
      id: 3,
      icon: "🛡️",
      name: "AI Insurance",
      status: "active",
      coverage: "Premium",
      price: 799,
      aiSystem: "ChatBot v2.1",
      lastCheck: "Today",
      features: [
        "24/7 monitoring",
        "Instant updates",
        "Security patches",
        "Priority support",
      ],
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <Card key={service.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-3xl">{service.icon}</span>
                <div>
                  <CardTitle className="text-lg">{service.name}</CardTitle>
                  <Badge variant="success" className="mt-1">● Active</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {service.name === "AI Receptionist" && (
                <>
                  <div>
                    <p className="text-sm text-muted-foreground">Plan</p>
                    <p className="font-semibold">{service.plan} (${service.price}/month)</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Started</p>
                    <p>{service.startDate}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Next Billing</p>
                    <p>{service.nextBilling}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold mb-2">Quick Stats</p>
                    <ul className="text-sm space-y-1">
                      <li>• Calls handled: {service.stats?.calls}</li>
                      <li>• Appointments booked: {service.stats?.appointments}</li>
                      <li>• Uptime: {service.stats?.uptime}</li>
                    </ul>
                  </div>
                  <div className="flex gap-2 pt-2">
                    <Button variant="outline" size="sm" className="flex-1">Upgrade</Button>
                    <Button variant="outline" size="sm" className="flex-1">Settings</Button>
                  </div>
                  <Button variant="link" className="w-full p-0">View Portal →</Button>
                </>
              )}

              {service.name === "Website Design" && (
                <>
                  <div>
                    <p className="text-sm text-muted-foreground">Website</p>
                    <a href={`https://${service.website}`} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                      {service.website} 🔗
                    </a>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Hosting</p>
                    <p>{service.hosting}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">SSL</p>
                    <p>{service.ssl}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Last Updated</p>
                    <p>{service.lastUpdated}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold mb-2">Quick Stats</p>
                    <ul className="text-sm space-y-1">
                      <li>• Visitors this month: {service.stats?.visitors}</li>
                      <li>• Uptime: {service.stats?.uptime}</li>
                      <li>• Page speed: {service.stats?.pageSpeed}</li>
                    </ul>
                  </div>
                  <div className="flex gap-2 pt-2">
                    <Button variant="outline" size="sm" className="flex-1">Edit Site</Button>
                    <Button variant="outline" size="sm" className="flex-1">Analytics</Button>
                  </div>
                  <Button variant="link" className="w-full p-0">View Live Site →</Button>
                </>
              )}

              {service.name === "AI Insurance" && (
                <>
                  <div>
                    <p className="text-sm text-muted-foreground">Coverage</p>
                    <p className="font-semibold">{service.coverage} (${service.price}/month)</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">AI System</p>
                    <p>{service.aiSystem}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Last Health Check</p>
                    <p>{service.lastCheck}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold mb-2">Coverage Includes</p>
                    <ul className="text-sm space-y-1">
                      {service.features?.map((feature, idx) => (
                        <li key={idx}>• {feature}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex gap-2 pt-2">
                    <Button variant="outline" size="sm" className="flex-1">View Reports</Button>
                    <Button variant="outline" size="sm" className="flex-1">Run Check</Button>
                  </div>
                  <Button variant="link" className="w-full p-0">Support Tickets →</Button>
                </>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex justify-center">
        <Button size="lg" variant="outline">
          <Plus className="mr-2 h-4 w-4" />
          Add Another Service
        </Button>
      </div>
    </div>
  );
}
