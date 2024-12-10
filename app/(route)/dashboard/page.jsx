import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";
import UserListing from "./_components/UserListing";
import PurchaseList from "./_components/PurchaseList";
import Analytics from "./_components/Analytics";

const Dashboard = () => {
  return (
    <div className="mt-16">
      <h2 className="text-2xl font-bold mt-5">Dashboard</h2>
      <Tabs defaultValue="listing" className="">
        <TabsList>
          <TabsTrigger value="listing">Listing</TabsTrigger>
          <TabsTrigger value="purchase">Purchase</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>
        <TabsContent value="listing">
         <UserListing/>
        </TabsContent>
        <TabsContent value="purchase">
          <PurchaseList/>
        </TabsContent>
        <TabsContent value="analytics">
          <Analytics/>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
