import { PawPrint, Syringe, Wheat, Users, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { SpeciesDistributionCard } from "./components/cards/species-distribution-card";
import { AgeDistributionCard } from "./components/cards/age-distribution-card";
import { VaccinationStatusCard } from "./components/cards/vaccination-status-card";
import { TopVaccinesCard } from "./components/cards/top-vaccines-card";
import { HealthAlertsCard } from "./components/cards/health-alerts-card";
import { FeedStockLevelsCard } from "./components/cards/feed-stock-levels-card";
import { FeedUsageCard } from "./components/cards/feed-usage-card";
import { DietPlansCard } from "./components/cards/diet-plans-card";
import { UserRolesCard } from "./components/cards/user-roles-card";
import { VerificationCard } from "./components/cards/verification-card";
import { ActivityCard } from "./components/cards/activity.card";

export default function Dashboard() {
  return (
    <div className="bg-gray-50/50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Analytics Dashboard
          </h1>
          <p className="text-gray-600 mt-1">
            Comprehensive insights into your animal management system
          </p>
          <div className="mt-4 flex items-center gap-4">
            <Badge
              variant="outline"
              className="py-1 px-3 text-sm font-medium bg-blue-100 text-blue-800 border-blue-200"
            >
              Total Animals: 128
            </Badge>
            <Badge
              variant="outline"
              className="py-1 px-3 text-sm font-medium bg-green-100 text-green-800 border-green-200"
            >
              Active Users: 24
            </Badge>
          </div>
        </header>

        <div className="space-y-12">
          {/* Animal Overview Section */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-blue-100 p-2 rounded-lg">
                <PawPrint className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-gray-900">
                  Animal Overview
                </h2>
                <p className="text-gray-500">
                  Species distribution, age groups, and population insights
                </p>
              </div>
              <Badge
                variant="outline"
                className="ml-auto py-1 px-3 text-xs bg-gray-100"
              >
                <User className="h-3 w-3 mr-1.5" />
                Admin, Veterinarian
              </Badge>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <SpeciesDistributionCard />
              <AgeDistributionCard />
            </div>
          </section>

          {/* Vaccination & Health Analytics Section */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-green-100 p-2 rounded-lg">
                <Syringe className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-gray-900">
                  Vaccination & Health Analytics
                </h2>
                <p className="text-gray-500">
                  Vaccination schedules, health alerts, and medical tracking
                </p>
              </div>
              <Badge
                variant="outline"
                className="ml-auto py-1 px-3 text-xs bg-gray-100"
              >
                <User className="h-3 w-3 mr-1.5" />
                Veterinarian, Admin
              </Badge>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <VaccinationStatusCard />
              <TopVaccinesCard />
              <HealthAlertsCard />
            </div>
          </section>

          {/* Feed & Diet Analytics Section */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-orange-100 p-2 rounded-lg">
                <Wheat className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-gray-900">
                  Feed & Diet Analytics
                </h2>
                <p className="text-gray-500">
                  Stock levels, consumption patterns, and diet plan compliance
                </p>
              </div>
              <Badge
                variant="outline"
                className="ml-auto py-1 px-3 text-xs bg-gray-100"
              >
                <User className="h-3 w-3 mr-1.5" />
                Caretaker, Admin
              </Badge>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <FeedStockLevelsCard />
              <FeedUsageCard />
              <DietPlansCard />
            </div>
          </section>

          {/* User Analytics Section */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-purple-100 p-2 rounded-lg">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-gray-900">
                  User Analytics
                </h2>
                <p className="text-gray-500">
                  User roles, verification status, and system activity
                </p>
              </div>
              <Badge
                variant="outline"
                className="ml-auto py-1 px-3 text-xs bg-gray-100"
              >
                <User className="h-3 w-3 mr-1.5" />
                Admin
              </Badge>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <UserRolesCard />
              <VerificationCard />
              <ActivityCard />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
